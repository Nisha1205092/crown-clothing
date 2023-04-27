import {
    CategoryPreviewContainer,
    Preview,
    Title
} from './category-preview.styles';
import ProductCard from '../product-card/product-card.component';
import { FC } from 'react';
import { CategoryItem } from '../../store/categories/category.types';

type CategoryPreviewProps = {
    title: string;
    products: CategoryItem[];
}

const CategoryPreview: FC<CategoryPreviewProps> = ({ title, products }) => {
    return (
        <CategoryPreviewContainer>
            <h2>
                <Title to={title}>{title.toUpperCase()}</Title>
            </h2>
            <Preview>
                {
                    products
                        .filter((_, idx) => idx < 4)
                        .map((product) =>
                            <ProductCard key={product.id} product={product} />
                        )
                }
            </Preview>
        </CategoryPreviewContainer>
    );
};

export default CategoryPreview;