import { useState, useEffect } from "react";
import { getProducts } from "../services/api";
import ProductItem from "./ProductItem";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState("newest"); // Standardwert

  useEffect(() => {
    async function fetchData() {
      const data = await getProducts("", "", "", "", sortOrder);
      setProducts(data);
      setFilteredProducts(data);
    }
    fetchData();
  }, [sortOrder]); // Sortierung erneut anwenden, wenn sich der Wert ändert

  return (
    <div>
      <div className="flex justify-end mb-4">
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="newest">Neueste</option>
          <option value="price-asc">Preis aufsteigend</option>
          <option value="price-desc">Preis absteigend</option>
          <option value="random">Zufällig</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductItem key={product._id} product={product} />
          ))
        ) : (
          <p className="text-center text-gray-500">Keine Produkte gefunden.</p>
        )}
      </div>
    </div>
  );
}

export default ProductList;
