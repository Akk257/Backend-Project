import { useState } from "react";
import { FiChevronRight } from "react-icons/fi";     
import { FaCar, FaTools, FaLaptop, FaHome, FaTshirt, FaLeaf, FaPaw, FaGamepad, FaBriefcase, FaMusic } from "react-icons/fa";

const categories = [
  { name: "Auto, Rad & Boot", icon: <FaCar />, subcategories: ["Autos", "Autoteile & Reifen", "Boote & Bootszubehör", "Fahrräder & Zubehör", "Motorräder & Motorroller", "Motorradteile & Zubehör", "Nutzfahrzeuge & Anhänger", "Reparaturen & Dienstleistungen", "Wohnwagen & -mobile", "Weiteres Auto, Rad & Boot"] },
  { name: "Dienstleistungen", icon: <FaTools />, subcategories: ["Altenpflege", "Babysitter/-in & Kinderbetreuung", "Elektronik", "Haus & Garten", "Künstler/-in & Musiker/-in", "Reise & Event", "Tierbetreuung & Training", "Umzug & Transport", "Weitere Dienstleistungen"] },
  { name: "Elektronik", icon: <FaLaptop />, subcategories: ["Handys", "Laptops", "TV & Video", "Haushaltsgeräte", "Kameras", "Weitere Elektronik"] },
  { name: "Immobilien", icon: <FaHome />, subcategories: ["Wohnungen", "Häuser", "Gewerbeimmobilien", "Weitere Immobilien"] },
  { name: "Mode & Beauty", icon: <FaTshirt />, subcategories: ["Damenmode", "Herrenmode", "Schuhe", "Schmuck", "Kosmetik", "Weitere Mode & Beauty"] },
  { name: "Haus & Garten", icon: <FaLeaf />, subcategories: ["Möbel", "Dekoration", "Werkzeuge", "Gartenbedarf", "Küchengeräte", "Weitere Haus & Garten"] },
  { name: "Haustiere", icon: <FaPaw />, subcategories: ["Hunde", "Katzen", "Vögel", "Fische", "Kleintiere", "Weitere Haustiere"] },
  { name: "Freizeit & Hobby", icon: <FaGamepad />, subcategories: ["Sport", "Camping", "Musikinstrumente", "Bücher", "Kunst & Sammlerstücke", "Weitere Freizeit & Hobby"] },
  { name: "Jobs", icon: <FaBriefcase />, subcategories: ["Vollzeit", "Teilzeit", "Freelancer", "Praktika", "Aushilfsjobs", "Weitere Jobs"] },
  { name: "Musik, Filme & Bücher", icon: <FaMusic />, subcategories: ["CDs", "Vinyl", "DVDs", "Blu-rays", "Bücher", "Weitere Musik, Filme & Bücher"] }
];

export default function CategoryDropdown({ onSelectCategory }) {
  const [open, setOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("Alle Kategorien");

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setOpen(false);
    onSelectCategory(category);
  };

  const handleSubcategoryClick = (subcategory) => {
    setSelectedCategory(subcategory);
    setOpen(false);
    onSelectCategory(subcategory);
  };

  const handleReset = () => {
    setSelectedCategory("Alle Kategorien");
    onSelectCategory("Alle Kategorien");
  };

  return (
    <div className="relative">
      {/* Eingabefeld */}
      <button
        className="bg-white border px-4 py-2 w-48 text-left flex items-center"
        onClick={() => setOpen(!open)}
      >
        {selectedCategory}
      </button>

      {/* Hauptmenü */}
      {open && (
        <div className="absolute bg-white border mt-1 w-64 shadow-md z-50">
          {categories.map((category) => (
            <div
              key={category.name}
              className="flex justify-between px-4 py-2 hover:bg-gray-200 cursor-pointer relative"
              onMouseEnter={() => setHoveredCategory(category)}
              onMouseLeave={() => setHoveredCategory(null)}
              onClick={() => handleCategoryClick(category.name)}
            >
              <span className="flex items-center">{category.icon} <span className="ml-2">{category.name}</span></span>
              <FiChevronRight />

              {/* Unterkategorien erscheinen als separates Fenster */}
              {hoveredCategory === category && (
                <div className="absolute left-full top-0 bg-white border shadow-lg w-48 z-50">
                  {category.subcategories.map((sub) => (
                    <button
                      key={sub}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                      onClick={() => handleSubcategoryClick(sub)}
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Such-Reset */}
      <button onClick={handleReset} className="ml-2 text-sm text-gray-500 underline">
        Suche zurücksetzen
      </button>
    </div>
  );
}
