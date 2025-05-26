'use server'

import { prismaClient } from '@/db/client'
import { User } from '@/types/User'
import { cookies } from 'next/headers'
import { getSchoolByAdminEmail } from './serverFunctions/school'

const wordpressApiUrl = process.env.WORDPRESS_API_URL || ''
const usernameWordpress = process.env.WORDPRESS_APPLICATION_USERNAME
const passwordWordpress = process.env.WORDPRESS_APPLICATION_PASSWORD

const myHeaders = new Headers()
myHeaders.append('Content-Type', 'application/json')
myHeaders.set('Authorization', 'Basic ' + Buffer.from(usernameWordpress + ':' + passwordWordpress).toString('base64'))

export async function login(email: string, password: string, rememberMe?: boolean) {
  if (!email || !password) {
    throw new Error('Impossible to login with this user')
  }

  const wordpressUser = await getWordpressUser(email, password)
  const school = await getSchoolByAdminEmail(email)

  if (!school) {
    throw new Error('Impossible to find the school for this user')
  }

  const maxAge = rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24 // 30 days or 1 day
  const user = { ...wordpressUser, role: 'teacher', school }
  ;(await cookies()).set('user', JSON.stringify(user), { maxAge })
  return user
}

export const getWordpressUser = async (email: string, password: string) => {
  const userCookies = (await cookies()).get('user')?.value
  if (userCookies) {
    const user = JSON.parse(userCookies) as User
    if (user.email === email) {
      return user
    }
  }

  try {
    const url = wordpressApiUrl + '/wp-json/jwt-auth/v1/token'
    const requestInit = {
      headers: myHeaders,
      method: 'POST',
      body: JSON.stringify({
        username: email,
        password: password,
      }),
    } as RequestInit
    const wordpressUserResponse = await fetch(url, requestInit)
    if (wordpressUserResponse.ok) {
      const wordpressUser = await wordpressUserResponse.json()
      const user = {
        token: wordpressUser.token,
        name: wordpressUser.user_display_name,
        email: wordpressUser.user_email,
      }

      return user
    }
    console.error('No user found:', wordpressUserResponse.statusText)
  } catch (error) {
    console.error('Error in login:', error)
  }
}

export const logout = async () => (await cookies()).delete('user')

export const getUserCookies = async () => {
  const userCookies = (await cookies()).get('user')?.value
  if (!userCookies) return {} as User
  return JSON.parse(userCookies) as User
}

export const signUp = async (formData: FormData) => {
  // Extract form data
  const email = formData.get('email')?.toString().toLowerCase() || ''
  const firstName = formData.get('firstName')?.toString() || ''
  const lastName = formData.get('lastName')?.toString() || ''
  const password = formData.get('password')?.toString() || ''
  const role = 'teacher'
  const state = formData.get('state')?.toString() || ''
  const schoolName = formData.get('schoolName')?.toString() || ''
  const townName = formData.get('townName')?.toString() || ''
  const postalCode = formData.get('postalCode')?.toString() || ''

  if (!schoolName) {
    throw new Error('Can you enter the name of the school?')
  }

  return await prismaClient.$transaction(async (tx) => {
    // Check if user is already admin of a school
    const schoolAdmin = await tx.schoolAdmins.findFirst({
      where: { adminUsername: email },
    })

    let user = {
      first_name: firstName,
      last_name: lastName,
      display_name: `${firstName} ${lastName}`,
      email,
      username: email,
      password,
      roles: role,
    }

    let schoolFromBdd
    if (!schoolAdmin) {
      // Check if school already exists
      schoolFromBdd = await tx.schools.findFirst({
        where: { postalCode, name: schoolName },
      })

      // Create school if it doesn't exist
      if (!schoolFromBdd) {
        schoolFromBdd = await tx.schools.create({
          data: { state, name: schoolName, townName, postalCode },
        })
      }

      // Add user as admin to the school
      await tx.schoolAdmins.create({
        data: { schoolId: schoolFromBdd.id, adminUsername: email },
      })
    }

    if (!schoolAdmin && !schoolFromBdd) {
      throw new Error('Impossible to create the school or find one')
    }

    // Create user in Wordpress (outside transaction, as it's an external API)
    const requestInit = {
      headers: myHeaders,
      method: 'POST',
      body: JSON.stringify(user),
    } as RequestInit

    const url = wordpressApiUrl + '/wp-json/wp/v2/users'
    const response = await fetch(url, requestInit)

    if (!response.ok) {
      const error = await response.text()
      console.error('Error creating user in WordPress:', error)
      return user
    }

    const json = await response.json()
    return json
  })
}
