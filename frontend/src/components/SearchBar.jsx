import { useState } from "react";
import CategoryDropdown from "./CategoryDropdown";
import LocationSearch from "./LocationSearch";

function SearchBar({ onSearch }) {
  const [category, setCategory] = useState("Alle Kategorien");
  const [location, setLocation] = useState("");
  const [distance, setDistance] = useState("Gesamte Stadt");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async () => {
    try {
      // Falls keine Kategorie gewählt wurde, schicke "Alle Kategorien"
      const selectedCategory = category ? category : "Alle Kategorien";
      
      // Falls das Suchfeld leer ist, lade alle Produkte
      const queryParam = searchQuery ? `query=${searchQuery}&` : "";
      const categoryParam = selectedCategory !== "Alle Kategorien" ? `category=${selectedCategory}` : "";

      const url = `http://localhost:4000/api/products/search?${queryParam}${categoryParam}`;
      console.log("🔎 Sende Suchanfrage an:", url); // Debugging

      const response = await fetch(url);
      
      if (!response.ok) throw new Error(`Server-Fehler: ${response.status}`);
  
      const data = await response.json();
      console.log("🔍 Suchergebnisse:", data); // Debugging

      onSearch(data);
    } catch (error) {
      console.error(" Fehler bei der Suche:", error);
    }
  };

  return (
    <div className="flex gap-2 bg-gray-100 p-3 rounded-lg">
      {/* Kategorie Dropdown */}
      <CategoryDropdown onSelectCategory={setCategory} />

      {/* PLZ oder Ort Suche */}
      <LocationSearch onLocationSelect={setLocation} />

      {/* Entfernungsauswahl */}
      <select
        value={distance}
        onChange={(e) => setDistance(e.target.value)}
        className="border p-2"
      >
        <option>Gesamte Stadt</option>
        <option>10 km</option>
        <option>30 km</option>
        <option>50 km</option>
        <option>100 km</option>
        <option>200 km</option>
      </select>

      {/* Suchfeld */}
      <input
        type="text"
        placeholder="Was suchst du?"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border p-2 w-full"
      />

      {/* Suchbutton */}
      <button
        onClick={handleSearch}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Finden
      </button>
    </div>
  );
}

export default SearchBar;
