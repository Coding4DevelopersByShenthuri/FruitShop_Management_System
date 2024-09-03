import ProductCard, { ProductProp } from './ProductCard';

const products = [
  {
    id: 1,
    name: 'Apple iPhone 14',
    price: 799,
    image: '/path/to/iphone.png',
  },
  {
    id: 2,
    name: 'Samsung Galaxy S22',
    price: 999,
    image: '/path/to/galaxy.png',
  },
  {
    id: 3,
    name: 'Google Pixel 7',
    price: 599,
    image: '/path/to/pixel.png',
  },
];

const ProductList = () => {
    return (
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product: ProductProp) => (
                    <ProductCard key={product.id} id={product.id} name={product.name} image={product.image} price={product.price} />
                ))}
            </div>
        </div>
    );
};

export default ProductList;