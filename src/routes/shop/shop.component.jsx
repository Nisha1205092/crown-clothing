import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';
import { getCatagoriesAndDocuments } from '../../utils/firebase/firebase.utils';
import { setCategories } from '../../store/categories/category.action';
import { useDispatch } from 'react-redux';

const Shop = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        // inside useEffect, create another 
        //function for calling async functions
        
        const getCategoriesMap = async () => {
            const categories = await getCatagoriesAndDocuments();
            dispatch(setCategories(categories));
        }
        getCategoriesMap();
    }, [dispatch]) // to avoid warning, netlify deploy fails due to this
    return (
        <Routes>
            <Route index element={<CategoriesPreview />} />
            <Route path=':category' element={<Category />} />            
        </Routes>
    );
};

export default Shop;