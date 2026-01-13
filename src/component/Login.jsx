import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || "Credenziali non valide");
      }

      const data = await response.json();
      console.log("LOGIN OK:", data);

      navigate("/climate");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 sm:px-6 lg:px-8">
      <img
        src="/climate22.png"
        alt="Climate22 Logo"
        className="w-32 sm:w-40 md:w-48 object-contain -mb-2"
      />

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-6 rounded-xl bg-sky-100 p-6 sm:p-8 shadow-lg border border-sky-200"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-sky-900 text-center">
          Login
        </h2>

        {/* ERRORE */}
        {error && (
          <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-2 rounded-md text-sm">
            {error}
          </div>
        )}

        {/* EMAIL */}
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

        {/* PASSWORD */}
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

        {/* AZIONI */}
        <div className="flex flex-col sm:flex-row sm:justify-between gap-4 pt-4">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="text-sm font-semibold text-sky-700 hover:underline text-center"
          >
            Annulla
          </button>

          <button
            type="submit"
            disabled={loading}
            className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-2 rounded-md
                       font-semibold disabled:opacity-50 transition"
          >
            {loading ? "Accesso..." : "Accedi"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
