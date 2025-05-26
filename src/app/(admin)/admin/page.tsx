'use client'

import { getUserCookies } from '@/services/auth'
import {
  createEmissionFactor,
  deleteEmissionFactor,
  deleteEmissionSubCategory,
  getEmissionFactors,
  updateEmissionCategory,
  updateEmissionFactor,
  updateEmissionSubCategory,
} from '@/services/serverFunctions/emission'
import { NestedEmissionCategory } from '@/types/NestedEmissionCategory'
import { Alert, CircularProgress, Container, Snackbar } from '@mui/material'
import { EmissionCategories, EmissionSubCategories } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useReducer, useState } from 'react'
import { CategoryList } from '../../../../src/components/admin/CategoryList'
import { Header } from '../../../../src/components/login/header'

const keys = ['label', 'type', 'value', 'unit', 'uncertainty', 'depreciationPeriod']

const isAuthenticated = async () => {
  const user = await getUserCookies()
  return !!user
}

const categoriesReducer = (state: NestedEmissionCategory[], action: any) => {
  switch (action.type) {
    case 'SET_CATEGORIES':
      return action.payload
    case 'UPDATE_FACTOR':
      return state.map((category) => ({
        ...category,
        emissionSubCategories: category.emissionSubCategories?.map((subCategory) => ({
          ...subCategory,
          emissionFactors: subCategory.emissionFactors.map((factor) => {
            if (factor.id === action.payload.id) {
              return { ...factor, [action.payload.key]: action.payload.value }
            }
            return factor
          }),
        })),
      }))
    case 'DELETE_FACTOR':
      return state.map((category) => ({
        ...category,
        emissionSubCategories: category.emissionSubCategories?.map((subCategory) => ({
          ...subCategory,
          emissionFactors: subCategory.emissionFactors.filter((factor) => factor.id !== action.payload),
        })),
      }))
    case 'ADD_FACTOR':
      return state.map((category) => ({
        ...category,
        emissionSubCategories: category.emissionSubCategories?.map((subCategory) => {
          if (subCategory.id === action.payload.idEmissionSubCategory) {
            return {
              ...subCategory,
              emissionFactors: subCategory.emissionFactors.concat(action.payload.newFactor),
            }
          }
          return subCategory
        }),
      }))
    default:
      return state
  }
}

export default function Admin() {
  const [categories, dispatch] = useReducer(categoriesReducer, [])
  const [loading, setLoading] = useState(true)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const router = useRouter()

  useEffect(() => {
    const checkAuthAndFetchData = async () => {
      if (!(await isAuthenticated())) {
        router.push('/login')
        return
      }
      // TODO: Replace '1' with the actual idEmissionSubCategory you want to fetch
      const fetchedCategories = await getEmissionFactors(1)
      dispatch({ type: 'SET_CATEGORIES', payload: fetchedCategories })
      setLoading(false)
    }
    checkAuthAndFetchData()
  }, [router])

  const handleInputChange = useCallback(
    (id: number, key: string, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, toUpdate?: boolean) => {
      if (key === 'delete') {
        deleteEmissionFactor(id)
        dispatch({ type: 'DELETE_FACTOR', payload: id })
        setSnackbarMessage(`Deleted emission factor with id: ${id}`)
        setSnackbarOpen(true)
        return
      }

      const value = formatInput(key, event)
      dispatch({ type: 'UPDATE_FACTOR', payload: { id, key, value } })
      toUpdate &&
        updateEmissionFactor({
          id,
          [key]: value,
          idLanguage: 0,
          label: '',
          idEmissionSubCategory: 0,
          type: '',
          unit: '',
          value: 0,
          depreciationPeriod: null,
          uncertainty: null,
        })
      setSnackbarMessage(`Updated emission factor with id: ${id}, key: ${key}, value: ${value}`)
      setSnackbarOpen(true)
    },
    [],
  )

  const createFE = useCallback(
    (
      idEmissionCategory: number,
      idLanguage: number,
      key: string,
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      event.preventDefault()
      const value = formatInput(key, event)
      if (value === '' || value === 0) return
      const newFactor = {
        id: 0, // or generate a unique id if required by your DB (e.g., use Date.now() or a uuid)
        label: '',
        type: '',
        unit: '',
        value: 0,
        uncertainty: 0,
        depreciationPeriod: 0,
        [key]: value,
        emissionSubCategory: { connect: { id: idEmissionCategory } },
        language: { connect: { id: idLanguage } },
      }
      createEmissionFactor(newFactor).then((factor) => {
        dispatch({ type: 'ADD_FACTOR', payload: { idEmissionSubCategory: idEmissionCategory, newFactor: factor } })
        setSnackbarMessage(`Created new emission factor: ${JSON.stringify(factor)}`)
        setSnackbarOpen(true)
      })
    },
    [categories],
  )

  function modifyCategory(category: EmissionCategories | EmissionSubCategories) {
    const error = updateEmissionCategory(category)
    setSnackbarMessage(`Modified category: ${JSON.stringify(category)} + ${error}`)
    setSnackbarOpen(true)
  }

  function modifySubCategory(subCategory: EmissionCategories | EmissionSubCategories) {
    const error = updateEmissionSubCategory(subCategory)
    setSnackbarMessage(`Modified sub-category: ${JSON.stringify(subCategory)} + ${error}`)
    setSnackbarOpen(true)
  }

  function deleteSubCategory(subCategory: EmissionCategories | EmissionSubCategories) {
    const error = deleteEmissionSubCategory(subCategory.id)
    setSnackbarMessage(`Deleted sub-category: ${JSON.stringify(subCategory)} +  ${error}`)
    setSnackbarOpen(true)
  }

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false)
  }

  return (
    <>
      <Header />
      <Container maxWidth="xl" sx={{ mt: 10 }}>
        {loading ? (
          <CircularProgress />
        ) : (
          <CategoryList
            categories={categories}
            keys={keys}
            handleInputChange={handleInputChange}
            modifyCategory={modifyCategory}
            modifySubCategory={modifySubCategory}
            deleteSubCategory={deleteSubCategory}
            createFE={createFE}
          />
        )}
      </Container>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  )

  function formatInput(key: string, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    return key === 'label' || key === 'type' || key === 'unit' ? event.target.value : Number(event.target.value)
  }
}
