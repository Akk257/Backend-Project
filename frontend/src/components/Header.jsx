import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Nutzer setzen
    }

    // Event-Listener für Klick außerhalb des Menüs
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null); // Sofort den Nutzer aus dem State entfernen
    window.location.reload(); // Seite neu laden
  };

  return (
    <header className="bg-blue-500 p-4 text-white flex justify-between items-center">
      <h1 className="text-xl font-bold cursor-pointer">
        <Link to="/">Vintage & New</Link>
      </h1>
      <nav>
        {user ? (
          <div className="relative" ref={menuRef}>
            {/* Benutzer-Button */}
            <button
              className="px-4 py-2 bg-green-700 rounded"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {`Hallo, ${user.name}`}
            </button>

            {/* Dropdown-Menü */}
            {menuOpen && (
              <div className="absolute right-0 mt-2 bg-white text-black rounded shadow-md w-48 z-50">
                <ul>
                  <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                    <Link to="/meins">Meine Anzeigen</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                    <Link to="/favorites">Favoriten</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                    <Link to="/settings">Einstellungen</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                    <Link to="/messages">Nachrichten</Link>
                  </li>
                  <li
                    className="px-4 py-2 text-red-500 cursor-pointer hover:bg-red-600"
                    onClick={handleLogout}
                  >
                    Ausloggen
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <div>
            <Link to="/login" className="px-4 py-2 bg-blue-500 rounded">
              Login
            </Link>
            <Link to="/register" className="ml-2 px-4 py-2 bg-blue-500 rounded">
              Registrieren
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;
