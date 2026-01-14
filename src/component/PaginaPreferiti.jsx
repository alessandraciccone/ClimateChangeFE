import React, { useEffect, useState } from "react";

const PaginaPreferiti = () => {
  const [preferiti, setPreferiti] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchPreferiti();
  }, []);

  const fetchPreferiti = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/preferiti", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Errore caricamento");

      const data = await response.json();
      setPreferiti(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleElimina = async (id) => {
    if (!window.confirm("Eliminare il preferito?")) return;

    try {
      const response = await fetch(
        `http://localhost:8080/api/preferiti/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Errore eliminazione");

      setPreferiti((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <p className="text-center">Caricamento...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">I miei Preferiti</h1>

      {preferiti.length === 0 ? (
        <p className="text-center text-gray-500">Nessun preferito salvato</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-4">
          {preferiti.map((p) => (
            <div
              key={p.id}
              className="bg-gradient-to-br  bg-sky-100 border border-sky-800 shadow-lg rounded-2xl flex flex-col justify-between min-h-[180px] p-4 transition-transform duration-200 hover:scale-105 hover:shadow-2xl"
            >
              <div className="p-3 flex-1 flex flex-col justify-between">
                <h3 className="font-semibold text-base mb-1">{p.titolo}</h3>
                <p className="text-gray-700 text-sm mb-2">{p.descrizione}</p>
              </div>
              <div className="flex justify-center pb-3 w-full">
                <button
                  onClick={() => handleElimina(p.id)}
                  className="bg-sky-500 hover:bg-sky-600 text-white py-2 px-6 rounded-full shadow-md transition-all duration-200 mx-auto"
                >
                  Elimina
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PaginaPreferiti;
