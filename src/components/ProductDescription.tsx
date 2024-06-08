import { useParams } from 'react-router-dom';
import { useShoppingCart } from '../context/ShoppingCartContext';

export const ProductDescription = () => {
    const { name } = useParams();
    const { filteredItems } = useShoppingCart();


    const product = filteredItems.find(item =>
        item.name.toLowerCase().replace(/\s/g, '-') === name);

    if (!product) {
        return <div>Товар не найден</div>;
    }

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ marginRight: '20px' }}>
                    <h2>{product.name}</h2>
                    <p>{product.description}</p>
                </div>
                <img style={{ width: '200px' }} src={product.imgUrl} alt={product.name} />
            </div>
        </div>
    );
};
