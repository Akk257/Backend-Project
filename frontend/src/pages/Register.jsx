import { useState } from "react";

function Register() {
  const [formData, setFormData] = useState({
    profileName: "", // ✅ Name wird jetzt gespeichert
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("⚠️ Die Passwörter stimmen nicht überein!");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.profileName, // ✅ Name wird mitgesendet
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(`❌ Fehler: ${data.message}`);
        return;
      }

      // ✅ Falls erfolgreich, Token speichern und einloggen
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      alert(`✅ Willkommen, ${data.user.name}! Du bist jetzt eingeloggt.`);
      window.location.href = "/";
    } catch (error) {
      console.error("Registrierungsfehler:", error);
      alert("❌ Fehler beim Registrieren. Sieh in die Konsole für Details.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Registrieren in 30 Sekunden
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Name:</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              name="profileName"
              value={formData.profileName}
              onChange={handleChange}
              placeholder="Dein Name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email:</label>
            <input
              type="email"
              className="w-full p-2 border rounded"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Deine E-Mail"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Passwort:</label>
            <input
              type="password"
              className="w-full p-2 border rounded"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Dein Passwort"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Passwort bestätigen:</label>
            <input
              type="password"
              className="w-full p-2 border rounded"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Passwort wiederholen"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Registrieren
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
