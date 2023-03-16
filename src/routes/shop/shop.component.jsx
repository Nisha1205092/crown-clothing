import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';
import { useDispatch } from 'react-redux';
import { fetchCategoriesAsync } from '../../store/categories/category.action';
const Shop = () => {
    const dispatch = useDispatch();
    console.log('inside shop');
    useEffect(() => {
        dispatch(fetchCategoriesAsync());
    }, [dispatch]) // to avoid warning, that fails Netlify build
    return (
        <Routes>
            <Route index element={<CategoriesPreview />} />
            <Route path=':category' element={<Category />} />            
        </Routes>
    );
};

export default Shop;