import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function MyListings() {
  const [listings, setListings] = useState([]);
  const user = JSON.parse(localStorage.getItem("user")); // Benutzerdaten holen

  useEffect(() => {
    async function fetchListings() {
      if (!user) return;

      try {
        const response = await fetch(`http://localhost:4000/api/listings?userId=${user._id}`);
        if (!response.ok) throw new Error("Fehler beim Abrufen der Anzeigen");

        const data = await response.json();
        setListings(data);
      } catch (error) {
        console.error("Fehler:", error);
      }
    }

    fetchListings();
  }, [user]);

  if (!user) {
    return (
      <div className="container mx-auto p-4 text-center">
        <p className="text-gray-500">Bitte melde dich an, um deine Anzeigen zu sehen.</p>
        <Link to="/login" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
          Zum Login
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Meine Anzeigen</h2>

      {listings.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-500 mb-4">Du hast keine Anzeige erstellt.</p>
          <Link to="/create-ad" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
            Anzeige erstellen
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {listings.map((listing) => (
            <div key={listing._id} className="border p-4 rounded shadow">
              <h3 className="text-lg font-bold">{listing.title}</h3>
              <p className="text-gray-500">{listing.description}</p>
              <p className="font-semibold mt-2">{listing.price} €</p>
              <Link to={`/listing/${listing._id}`} className="text-blue-500 hover:underline">
                Details ansehen
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyListings;
