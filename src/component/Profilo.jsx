import React, { useEffect, useState } from "react";

const Profilo = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      setError("");

      try {
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");

        console.log("===== DEBUG PROFILO =====");
        console.log("UserID dal localStorage:", userId);
        console.log("Token presente:", token ? "SI" : "NO");

        // Verifica che userId sia un numero
        if (!userId || isNaN(userId)) {
          console.error("UserID non valido:", userId);
          console.error(
            "PROBLEMA: Devi salvare l'ID numerico al login, non un UUID!"
          );
          throw new Error(
            "ID utente non valido. Effettua nuovamente il login e assicurati di salvare data.id"
          );
        }

        if (!token) {
          console.error("Token mancante");
          throw new Error("Token mancante. Effettua il login.");
        }

        console.log(`Chiamata a: http://localhost:8080/users/${userId}`);

        const response = await fetch(`http://localhost:8080/users/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Response status:", response.status);

        if (!response.ok) {
          if (response.status === 403) {
            localStorage.clear();
            throw new Error("Sessione scaduta. Effettua nuovamente il login.");
          }
          if (response.status === 401) {
            localStorage.clear();
            throw new Error("Non autorizzato. Effettua il login.");
          }
          throw new Error(`Errore nel recupero dati: ${response.status}`);
        }

        const data = await response.json();
        console.log("Dati utente ricevuti:", data);
        setUser(data);
      } catch (err) {
        console.error("Errore completo:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const handleRetryLogin = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="text-sky-600 text-lg font-medium">Caricamento...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-md rounded-xl shadow-lg border border-sky-200 p-6">
          <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-md mb-4">
            <p className="font-medium mb-2">Errore</p>
            <p className="text-sm">{error}</p>
          </div>

          {error.includes("ID utente non valido") && (
            <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-md mb-4 text-sm">
              <p className="font-medium mb-1">Come risolvere:</p>
              <ol className="list-decimal list-inside space-y-1">
                <li>
                  Nel componente Login, dopo la risposta salva:
                  localStorage.setItem userId, data.id.toString
                </li>
                <li>NON salvare UUID o altri valori</li>
                <li>L ID deve essere un numero es: 152</li>
              </ol>
            </div>
          )}

          <button
            onClick={handleRetryLogin}
            className="w-full bg-sky-500 hover:bg-sky-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
          >
            Torna al Login
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="text-sky-600 text-center">Nessun utente trovato.</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="mb-4 flex justify-center">
          <img
            src="/bear.png"
            alt="Bear"
            className="h-28 sm:h-36 md:h-48 w-auto object-contain drop-shadow-lg"
          />
      </div>
      <div className="w-full max-w-md rounded-xl shadow-lg border border-sky-200 p-8 bg-sky-100">
        <h2 className="text-2xl font-bold text-sky-900 mb-6 text-center">
          Profilo Utente
        </h2>

        <div className="flex flex-col items-center gap-4 from-sky-400 to-sky-600 ">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center text-3xl font-bold text-white mb-2 shadow-md">
            {user.name ? user.name[0].toUpperCase() : "?"}
          </div>

          <div className="text-center">
            <div className="text-xl font-semibold text-sky-800 mb-1 from-sky-400 to-sky-600 ">
              {user.name} {user.lastname}
            </div>
            <div className="text-sm text-sky-600">{user.email}</div>
          </div>

          <button
            onClick={handleLogout}
            className="mt-6 w-30 bg-green-500 hover:bg-green-800 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
          >
            Logoout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profilo;
