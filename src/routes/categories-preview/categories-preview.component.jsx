import CategoryPreview from '../../components/category-preview/category-preview.component';
import { useSelector } from 'react-redux';
import { selectCategoriesMap } from '../../store/categories/category.selector';

const CategoriesPreview = () => {
    const categoriesMap = useSelector(selectCategoriesMap);
    console.log('inside CategoriesPreview');
    
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
