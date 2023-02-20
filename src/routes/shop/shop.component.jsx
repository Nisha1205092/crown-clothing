import './shop.styles.scss';
import { useContext } from 'react';
import { CategoriesContext } from '../../contexts/categories.context';
import CategoryPreview from '../../components/category-preview/category-preview.component';

const Shop = () => {
    const { categoriesMap } = useContext(CategoriesContext);
    // console.log(categoriesMap);
    return (
        <div className='shop-container'>
            {Object.keys(categoriesMap).map(title => {
                const products = categoriesMap[title];
                console.log(products);
                return <CategoryPreview key={title} title={title} products={products} />
            })}
        </div>
    );
};

export default Shop;