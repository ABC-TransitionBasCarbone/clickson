'use client'

import { getUserCookies } from '@/services/auth'
import { Alert, CircularProgress, Container, Snackbar } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useReducer, useState } from 'react'
import { CategoryList } from '../../../../src/components/admin/CategoryList'
import { Header } from '../../../../src/components/login/header'
import { EmissionFactors, SessionEmissionCategories } from '@prisma/client'
import { createEmissionFactor, deleteEmissionFactor, getEmissionFactors } from '@/services/serverFunctions/emission'
import { Decimal } from '@prisma/client/runtime/library'

const keys = ['label', 'type', 'value', 'unit', 'uncertainty', 'depreciationPeriod']

const isAuthenticated = async () => {
  const user = await getUserCookies()
  return !!user
}

const categoriesReducer = (state: SessionEmissionCategories[], action: any) => {
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
    (id: string, key: string, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, toUpdate?: boolean) => {
      if (key === 'delete') {
        deleteEmissionFactor(Number(id))
        dispatch({ type: 'DELETE_FACTOR', payload: id })
        setSnackbarMessage(`Deleted emission factor with id: ${id}`)
        setSnackbarOpen(true)
        return
      }

      const value = formatInput(key, event)
      dispatch({ type: 'UPDATE_FACTOR', payload: { id, key, value } })
      toUpdate && updateEmissionFactor({ id, [key]: value } as unknown as EmissionFactors)
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
        label: '',
        type: '',
        unit: '',
        value: 0,
        uncertainty: 0,
        depreciationPeriod: 0,
        [key]: value,
        idEmissionSubCategory: idEmissionCategory,
        idLanguage: idLanguage,
      }
      createEmissionFactor(newFactor).then((factor) => {
        dispatch({ type: 'ADD_FACTOR', payload: { idEmissionSubCategory: idEmissionCategory, newFactor: factor } })
        setSnackbarMessage(`Created new emission factor: ${JSON.stringify(factor)}`)
        setSnackbarOpen(true)
      })
    },
    [categories],
  )

  function modifyCategory(category: Category | SubCategory): void {
    const error = updateCategory(category)
    setSnackbarMessage(`Modified category: ${JSON.stringify(category)} + ${error}`)
    setSnackbarOpen(true)
  }

  function modifySubCategory(subCategory: Category | SubCategory): void {
    const error = updateSubCategory(subCategory)
    setSnackbarMessage(`Modified sub-category: ${JSON.stringify(subCategory)} + ${error}`)
    setSnackbarOpen(true)
  }

  function deleteSubCategory(subCategory: SubCategory): void {
    const error = deleteSC(subCategory)
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
function updateEmissionFactor(arg0: { label: string; type: string; value: Decimal; unit: string; uncertainty: Decimal; depreciationPeriod: Decimal | null; id: number; idEmissionSubCategory: number; idLanguage: number }) {
  throw new Error('Function not implemented.')
}

