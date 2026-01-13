import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || "Errore di registrazione");
      }

      navigate("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 sm:px-6 lg:px-8">
        {/* Immagine sopra il form, centrata */}
        <img
          src="/climate23.png"
          alt="Climate23 Logo"
          className="w-32 sm:w-40 md:w-48 object-contain -mb-2"
        />

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md sm:max-w-lg space-y-6 rounded-xl bg-sky-100 p-6 sm:p-8 shadow-lg border border-sky-200"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-sky-900 text-center">
            Registrazione
          </h2>

          {/* Errore */}
          {error && (
            <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-2 rounded-md text-sm">
              {error}
            </div>
          )}

          {/* Nome */}
          <div>
            <label className="block text-sm font-medium text-sky-900">
              Nome
            </label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-md bg-white px-3 py-2 border border-sky-400
                 focus:border-sky-600 focus:ring-2 focus:ring-sky-300 focus:outline-none"
            />
          </div>

          {/* Cognome */}
          <div>
            <label className="block text-sm font-medium text-sky-900">
              Cognome
            </label>
            <input
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-md bg-white px-3 py-2 border border-sky-400
                 focus:border-sky-600 focus:ring-2 focus:ring-sky-300 focus:outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-sky-900">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-md bg-white px-3 py-2 border border-sky-400
                 focus:border-sky-600 focus:ring-2 focus:ring-sky-300 focus:outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-sky-900">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-md bg-white px-3 py-2 border border-sky-400
                 focus:border-sky-600 focus:ring-2 focus:ring-sky-300 focus:outline-none"
            />
          </div>

          {/* Azioni */}
          <div className="flex flex-col sm:flex-row sm:justify-between gap-4 pt-4">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="w-full sm:w-auto text-sm font-semibold text-sky-700 hover:underline"
            >
              Annulla
            </button>

            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto bg-sky-600 hover:bg-sky-700 text-white px-6 py-2 rounded-md font-semibold disabled:opacity-50 transition"
            >
              {loading ? "Registrazione..." : "Salva"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
