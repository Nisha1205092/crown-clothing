import { createContext, useState, useEffect } from "react";
// import SHOP_DATA from '../shop-data.js';
import { getCatagoriesAndDocuments } from "../utils/firebase/firebase.utils.js";

export const CategoriesContext = createContext({
    categoriesMap: {}
});

export const CategoriesProvider = ({ children }) => {
    // useEffect(() => {
    //     addCollectionAndDocuments('categories', SHOP_DATA)
    // }, []);
    const [categoriesMap, setCategoriesMap] = useState({});
    
    useEffect(() => {
        // inside useEffect, create another 
        //function for calling async functions
        
        const getCategoriesMap = async () => {
            const categoryMap = await getCatagoriesAndDocuments();
            setCategoriesMap(categoryMap);
        }
        getCategoriesMap();
    }, [])

    const value = { categoriesMap };

    return (
        <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
    );
}