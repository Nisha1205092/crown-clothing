import { useContext } from 'react';
import { CategoriesContext } from '../../contexts/categories.context';
import CategoryPreview from '../../components/category-preview/category-preview.component';

const CategoriesPreview = () => {
    const { categoriesMap } = useContext(CategoriesContext);
    // console.log(categoriesMap);
    return (
        <div className='category-preview-container'>
            {Object.keys(categoriesMap).map(title => {
                const products = categoriesMap[title];
                return <CategoryPreview key={title} title={title} products={products} />
            })}
        </div>
    );
};

export default CategoriesPreview;
