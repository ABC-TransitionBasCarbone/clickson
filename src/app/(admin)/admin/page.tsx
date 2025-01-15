'use client'

import { useState, useEffect, useCallback, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { CircularProgress, Container } from '@mui/material';
import { getUserCookies } from '@/api/auth';
import { createEmissionFactor, getEmissionFactors, updateEmissionFactor } from '@/api/emissions';
import { Category } from '@/src/types/Category';
import { EmissionFactor } from '@/src/types/EmissionFactor';
import { CategoryList } from '@/src/components/admin/CategoryList';
import { Header } from '@/src/components/login/header';

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

    const handleInputChange = useCallback((id: string, key: keyof EmissionFactor | string, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, toUpdate?: boolean) => {
        const value = formatInput(key, event);
        dispatch({ type: 'UPDATE_FACTOR', payload: { id, key, value } });
        toUpdate && updateEmissionFactor({ id, [key]: value } as unknown as EmissionFactor);
    }, []);

    const createFE = useCallback((idEmissionCategorie: number, idLanguage: number, key: keyof EmissionFactor | string, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
            idEmissionSubCategory: idEmissionCategorie,
            idLanguage: idLanguage
        } as unknown as EmissionFactor;
        createEmissionFactor(newFactor).then((factor) =>
            dispatch({ type: 'ADD_FACTOR', payload: { idEmissionSubCategory: idEmissionCategorie, newFactor: factor } })
        );
    }, [categories]);

    return (
        <>
            <Header />
            <Container maxWidth="xl" sx={{ mt: 10 }}>
                {loading ? <CircularProgress /> : <CategoryList categories={categories} keys={keys} handleInputChange={handleInputChange} createFE={createFE} />}
            </Container>
        </>
    );

    function formatInput(key: string, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        return key === 'label' || key === 'type' || key === 'unit' ? event.target.value : Number(event.target.value);
    }
}
