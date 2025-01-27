'use client'

import { useState, useEffect, useCallback, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { CircularProgress, Container, Snackbar, Alert } from '@mui/material';
import { getUserCookies } from '@/api/auth';
import { createEmissionFactor, deleteEmissionFactor, getEmissionFactors, updateEmissionFactor } from '@/api/emissions';
import { Category } from '@/src/types/Category';
import { EmissionFactor } from '@/src/types/EmissionFactor';
import { CategoryList } from '@/src/components/admin/CategoryList';
import { Header } from '@/src/components/login/header';
import { deleteSC, updateCategory, updateSubCategory } from '@/api/categories';
import { SubCategory } from '@/src/types/SubCategory';

const keys = ['label', 'type', 'value', 'unit', 'uncertainty', 'depreciationPeriod'];

const isAuthenticated = async () => {
    const user = await getUserCookies();
    return !!user;
};

const categoriesReducer = (state: Category[], action: any) => {
    switch (action.type) {
        case 'SET_CATEGORIES':
            return action.payload;
        case 'UPDATE_FACTOR':
            return state.map(category => ({
                ...category,
                emissionSubCategories: category.emissionSubCategories?.map(subCategory => ({
                    ...subCategory,
                    emissionFactors: subCategory.emissionFactors.map(factor => {
                        if (factor.id === action.payload.id) {
                            return { ...factor, [action.payload.key]: action.payload.value };
                        }
                        return factor;
                    })
                }))
            }));
        case 'DELETE_FACTOR':
            return state.map(category => ({
                ...category,
                emissionSubCategories: category.emissionSubCategories?.map(subCategory => ({
                    ...subCategory,
                    emissionFactors: subCategory.emissionFactors.filter(factor => factor.id !== action.payload)
                }))
            }));
        case 'ADD_FACTOR':
            return state.map(category => ({
                ...category,
                emissionSubCategories: category.emissionSubCategories?.map(subCategory => {
                    if (subCategory.id === action.payload.idEmissionSubCategory) {
                        return {
                            ...subCategory,
                            emissionFactors: subCategory.emissionFactors.concat(action.payload.newFactor)
                        };
                    }
                    return subCategory;
                })
            }));
        default:
            return state;
    }
};

export default function Admin() {
    const [categories, dispatch] = useReducer(categoriesReducer, []);
    const [loading, setLoading] = useState(true);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const router = useRouter();

    useEffect(() => {
        const checkAuthAndFetchData = async () => {
            if (!await isAuthenticated()) {
                router.push('/login');
                return;
            }
            const fetchedCategories = await getEmissionFactors();
            dispatch({ type: 'SET_CATEGORIES', payload: fetchedCategories });
            setLoading(false);
        };
        checkAuthAndFetchData();
    }, [router]);

    const handleInputChange = useCallback((id: string, key: string, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, toUpdate?: boolean) => {
        if (key === 'delete') {
            deleteEmissionFactor({ id: Number(id) } as unknown as EmissionFactor);
            dispatch({ type: 'DELETE_FACTOR', payload: id });
            setSnackbarMessage(`Deleted emission factor with id: ${id}`);
            setSnackbarOpen(true);
            return;
        }

        const value = formatInput(key, event);
        dispatch({ type: 'UPDATE_FACTOR', payload: { id, key, value } });
        toUpdate && updateEmissionFactor({ id, [key]: value } as unknown as EmissionFactor);
        setSnackbarMessage(`Updated emission factor with id: ${id}, key: ${key}, value: ${value}`);
        setSnackbarOpen(true);
    }, []);

    const createFE = useCallback((idEmissionCategory: number, idLanguage: number, key: string, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        event.preventDefault();
        const value = formatInput(key, event);
        if (value === '' || value === 0) return;
        const newFactor = {
            label: '',
            type: '',
            unit: '',
            value: 0,
            uncertainty: 0,
            depreciationPeriod: 0,
            [key]: value,
            idEmissionSubCategory: idEmissionCategory,
            idLanguage: idLanguage
        } as unknown as EmissionFactor;
        createEmissionFactor(newFactor).then((factor) => {
            dispatch({ type: 'ADD_FACTOR', payload: { idEmissionSubCategory: idEmissionCategory, newFactor: factor } });
            setSnackbarMessage(`Created new emission factor: ${JSON.stringify(factor)}`);
            setSnackbarOpen(true);
        });
    }, [categories]);

    function modifyCategory(category: Category | SubCategory): void {
        updateCategory(category);
        setSnackbarMessage(`Modified category: ${JSON.stringify(category)}`);
        setSnackbarOpen(true);
    }

    function modifySubCategory(subCategory: Category | SubCategory): void {
        updateSubCategory(subCategory);
        setSnackbarMessage(`Modified sub-category: ${JSON.stringify(subCategory)}`);
        setSnackbarOpen(true);
    }

    function deleteSubCategory(subCategory: SubCategory): void {
        deleteSC(subCategory);
        setSnackbarMessage(`Deleted sub-category: ${JSON.stringify(subCategory)}`);
        setSnackbarOpen(true);
    }

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return <>
        <Header />
        <Container maxWidth="xl" sx={{ mt: 10 }}>
            {loading ? <CircularProgress /> : <CategoryList
                categories={categories}
                keys={keys}
                handleInputChange={handleInputChange}
                modifyCategory={modifyCategory}
                modifySubCategory={modifySubCategory}
                deleteSubCategory={deleteSubCategory}
                createFE={createFE} />}
        </Container>
        <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
            <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                {snackbarMessage}
            </Alert>
        </Snackbar>
    </>

    function formatInput(key: string, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        return key === 'label' || key === 'type' || key === 'unit' ? event.target.value : Number(event.target.value);
    }
}
