import MyListings from "../components/MyListings";

function MyAds() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Deine Anzeigen</h1>
      <MyListings />
    </div>
  );
}

export default MyAds;
