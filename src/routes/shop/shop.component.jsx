import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';
import { useDispatch } from 'react-redux';
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
import { setCategories } from '../../store/categories/category.action';

const Shop = () => {
    const dispatch = useDispatch();
    console.log('inside shop');
    useEffect(() => {
        // inside useEffect, create another 
        //function for calling async functions
        
        const getCategoriesMap = async () => {
            const categories = await getCategoriesAndDocuments();
            dispatch(setCategories(categories));
        }
        getCategoriesMap();
    }, [])
    return (
        <Routes>
            <Route index element={<CategoriesPreview />} />
            <Route path=':category' element={<Category />} />            
        </Routes>
    );
};

export default Shop;