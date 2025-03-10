import { useState, useEffect } from "react";

function Favorites() {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      window.location.href = "/login"; // Weiterleitung zum Login
    }
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Favoriten</h2>
      {user ? (
        <div>
          {favorites.length > 0 ? (
            <ul>
              {favorites.map((item) => (
                <li key={item.id}>{item.name}</li>
              ))}
            </ul>
          ) : (
            <p>Keine Favoriten gespeichert.</p>
          )}
        </div>
      ) : (
        <p>Bitte logge dich ein, um Favoriten zu sehen.</p>
      )}
    </div>
  );
}

export default Favorites;
