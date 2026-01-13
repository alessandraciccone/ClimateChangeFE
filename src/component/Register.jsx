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
    <div className="flex justify-center items-center min-h-[80vh] mb-1">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-6 rounded-xl bg-sky-100 p-8 shadow-lg border border-sky-200"
      >
        <h2 className="text-2xl font-bold text-sky-900 text-center">
          Registrazione
        </h2>

        {error && (
          <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-2 rounded-md text-sm">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-sky-900">Nome</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-2 w-full rounded-md bg-white px-3 py-2 border border-sky-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-sky-900">
            Cognome
          </label>
          <input
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            required
            className="mt-2 w-full rounded-md bg-white px-3 py-2 border border-sky-400"
          />
        </div>

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
            className="mt-2 w-full rounded-md bg-white px-3 py-2 border border-sky-400"
          />
        </div>

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
            className="mt-2 w-full rounded-md bg-white px-3 py-2 border border-sky-400"
          />
        </div>

        <div className="flex justify-between pt-4">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="text-sm font-semibold text-sky-700"
          >
            Annulla
          </button>

          <button
            type="submit"
            disabled={loading}
            className="bg-sky-600 text-white px-6 py-2 rounded-md"
          >
            {loading ? "Registrazione..." : "Salva"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
