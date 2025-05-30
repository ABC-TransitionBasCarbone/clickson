import { TextField } from '@mui/material'
import { EmissionCategories, EmissionSubCategories } from '@prisma/client'
import React, { useEffect, useRef, useState } from 'react'

interface CategoryInputProps {
  category: EmissionCategories | EmissionSubCategories
  modifyCategory: (category: EmissionCategories | EmissionSubCategories) => void
}

const useDebounce = (callback: (...args: any[]) => void, delay: number) => {
  const timeoutRef = useRef<number | undefined>(undefined)

  return (...args: any[]) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = window.setTimeout(() => {
      callback(...args)
    }, delay)
  }
}

export const CategoryInput: React.FC<CategoryInputProps> = ({ category, modifyCategory }) => {
  const [categoryData, setCategoryData] = useState(category)

  useEffect(() => {
    setCategoryData(category)
  }, [category])

  const debouncedModifyCategory = useDebounce((updatedCategory: EmissionCategories | EmissionSubCategories) => {
    modifyCategory(updatedCategory)
  }, 300)

  const handleChange = (
    field: keyof EmissionCategories | keyof EmissionSubCategories,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    event.preventDefault()
    setCategoryData((prevState) => {
      return { ...prevState, [field]: event.target.value }
    })
  }

  const handleBlur = (
    field: keyof EmissionCategories | keyof EmissionSubCategories,
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>,
  ) => {
    event.preventDefault()
    if (event.target.value.length === 0 || event.target.value === '') return
    setCategoryData((prevState) => {
      const updatedCategory = { ...prevState, [field]: event.target.value }
      debouncedModifyCategory(updatedCategory)
      return updatedCategory
    })
  }

  return (
    <>
      <TextField
        sx={{ mt: 2 }}
        label={categoryData.id > 0 ? categoryData.id : 'Label'}
        type="text"
        onChange={(event) => handleChange('label', event)}
        onBlur={(event) => handleBlur('label', event)}
        value={categoryData.label || ''}
      />
      {categoryData.id > 0 && (
        <TextField
          sx={{ mt: 2 }}
          label={'Details'}
          type="text"
          onChange={(event) => handleChange('detail', event)}
          onBlur={(event) => handleBlur('detail', event)}
          value={categoryData.detail || ''}
        />
      )}
    </>
  )
}
