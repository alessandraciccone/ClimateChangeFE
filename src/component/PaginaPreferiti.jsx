import React, { useState, useEffect } from "react";

const PaginaPreferiti = () => {
  const [preferiti, setPreferiti] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPreferiti();
  }, []);

  const fetchPreferiti = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/preferiti");
      if (response.ok) {
        const data = await response.json();
        setPreferiti(data);
      } else {
        setError("Errore nel caricamento dei preferiti");
      }
    } catch (err) {
      setError("Errore di connessione: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleElimina = async (id) => {
    if (!window.confirm("Sei sicuro di voler eliminare questo preferito?")) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/preferiti/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setPreferiti(preferiti.filter((p) => p.id !== id));
      } else {
        alert("Errore durante l'eliminazione");
      }
    } catch (err) {
      alert("Errore di rete: " + err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <svg
            className="animate-spin h-12 w-12 text-blue-500 mx-auto mb-4"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <p className="text-gray-600 text-lg">Caricamento preferiti...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg">
          <p className="font-semibold">⚠️ {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
        I Miei Preferiti
      </h1>

      {preferiti.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">📌</div>
          <p className="text-xl text-gray-600">
            Non hai ancora salvato nessun preferito.
          </p>
          <p className="text-gray-500 mt-2">
            Inizia ad esplorare e salva i tuoi contenuti preferiti!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {preferiti.map((preferito) => (
            <div
              key={preferito.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 hover:-translate-y-1 transform"
            >
              {preferito.imglink && (
                <img
                  src={preferito.imglink}
                  alt={preferito.titolo}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {preferito.titolo}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {preferito.descrizione}
                </p>
              </div>
              <button
                onClick={() => handleElimina(preferito.id)}
                className="w-full bg-red-500 hover:bg-red-600 text-white py-3 px-4 transition-colors duration-200 font-medium flex items-center justify-center gap-2"
              >
                <span>🗑️</span>
                Elimina
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PaginaPreferiti;
