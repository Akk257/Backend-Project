function ProductItem({ product }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="font-semibold">{product.title}</h3>
      <p className="text-gray-600">{product.description}</p>
      <p className="text-blue-500 font-bold mt-2">{product.price} €</p>
    </div>
  );
}

export default ProductItem;
