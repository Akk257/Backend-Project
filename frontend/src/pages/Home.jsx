import { useState, useEffect } from "react";
import CategorySidebar from "../components/CategorySidebar";
import SearchBar from "../components/SearchBar";
import Footer from "../components/Footer";
import ProductItem from "../components/ProductItem";
import { getProducts } from "../services/api";

function Home() {
  const [products, setProducts] = useState([]); // Alle Produkte
  const [searchResults, setSearchResults] = useState([]); // Gefilterte Produkte
  const [isSearching, setIsSearching] = useState(false); // Suchstatus

  // 🔥 Produkte beim ersten Laden holen
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getProducts();
        setProducts(data);
        setSearchResults(data); // Initial setzen
      } catch (error) {
        console.error("❌ Fehler beim Laden der Produkte:", error);
      }
    }
    fetchData();
  }, []);

  // 🔎 Wenn eine Suche durchgeführt wird
  const handleSearch = (searchResults) => {
    setSearchResults(searchResults);
    setIsSearching(true); // Zeigt an, dass die Suche aktiv ist
  };

  // 🔄 Suche zurücksetzen
  const resetSearch = () => {
    setSearchResults(products); // Zurück auf die Originalprodukte setzen
    setIsSearching(false);
  };

  return (
    <div className="container mx-auto p-4">
      {/* Suchfeld */}
      <SearchBar onSearch={handleSearch} />

      {/* Falls eine Suche aktiv ist, zeige "Suche zurücksetzen" */}
      {isSearching && (
        <button
          onClick={resetSearch}
          className="text-blue-500 underline mt-2"
        >
          Suche zurücksetzen
        </button>
      )}

      <div className="flex mt-4">
        {/* Kategorie-Leiste */}
        <CategorySidebar />

        {/* Produkte */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-grow">
          {searchResults.length > 0 ? (
            searchResults.map((product) => (
              <ProductItem key={product._id} product={product} />
            ))
          ) : (
            <p className="text-center text-gray-500">Keine Produkte gefunden.</p>
          )}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;
