export interface ProductProp {
    id: number;
    name: string;
    image: string;
    price: number;
}

const ProductCard = ( {name, image, price }: ProductProp) => {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-sm">
        <img src={image} alt={name} className="w-full h-48 object-cover" />
        <div className="p-4">
          <h2 className="text-lg font-semibold">{name}</h2>
          <p className="mt-2 text-gray-500">${price}</p>
        </div>
      </div>
    );
  };

export default ProductCard;