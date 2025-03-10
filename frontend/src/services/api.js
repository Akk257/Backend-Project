const API_URL = "http://localhost:4000/api/products"; // Dein Backend

export async function getProducts(query = "", category = "", minPrice = "", maxPrice = "", sort = "newest") {
  let url = `${API_URL}?q=${encodeURIComponent(query)}&sort=${sort}`;

  if (category) url += `&category=${encodeURIComponent(category)}`;
  if (minPrice) url += `&minPrice=${encodeURIComponent(minPrice)}`;
  if (maxPrice) url += `&maxPrice=${encodeURIComponent(maxPrice)}`;

  const response = await fetch(url);
  return response.json();
}
