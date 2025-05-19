import { Schools } from '@prisma/client'
export interface User {
  name: string
  email: string
  role: string
  school: Schools
  token: string
  rememberMe: boolean
}
