import React, { useState } from "react";

const SalvaPreferiti = ({ titolo, descrizione, imglink, onSaved }) => {
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSalva = async () => {
    setLoading(true);

    console.log("🔵 Inizio salvataggio preferito");
    console.log("📦 Dati da inviare:", { titolo, descrizione, imglink });

    // Recupera il token JWT dal localStorage
    const token = localStorage.getItem("token");
    console.log("🔑 Token trovato:", token ? "Sì" : "No");
    console.log("🔑 Token completo:", token);

    if (!token) {
      console.error("❌ Nessun token trovato! Utente non autenticato.");
      alert("Devi effettuare il login per salvare i preferiti!");
      setLoading(false);
      return;
    }

    try {
      const payload = {
        titolo,
        descrizione,
        imglink,
      };

      console.log("📤 Invio richiesta a: http://localhost:8080/preferiti");
      console.log("📤 Payload:", JSON.stringify(payload, null, 2));

      const response = await fetch("http://localhost:8080/preferiti", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Aggiungi il token JWT
        },
        body: JSON.stringify(payload),
      });

      console.log("📥 Risposta ricevuta:", {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("✅ Preferito salvato con successo!", data);
        setSaved(true);
        if (onSaved) onSaved();

        setTimeout(() => setSaved(false), 2000);
      } else {
        const errorText = await response.text();
        console.error("❌ Errore nel salvare il preferito");
        console.error("Status:", response.status);
        console.error("Response:", errorText);

        if (response.status === 403) {
          alert("Token non valido o scaduto. Effettua nuovamente il login.");
        }
      }
    } catch (error) {
      console.error("💥 Errore di rete:", error);
      console.error("Dettagli errore:", error.message);
    } finally {
      setLoading(false);
      console.log("🔵 Fine salvataggio preferito");
    }
  };

  return (
    <button
      onClick={handleSalva}
      disabled={loading || saved}
      className={`
        inline-flex items-center justify-center gap-2
        px-4 py-2 rounded-lg font-medium text-sm
        transition-all duration-300 ease-in-out
        disabled:opacity-70 disabled:cursor-not-allowed
        focus:outline-none focus:ring-2 focus:ring-offset-2
        ${
          saved
            ? "bg-blue-500 text-white focus:ring-blue-400"
            : "bg-green-500 text-white hover:bg-green-600 focus:ring-green-400 shadow-md hover:shadow-lg hover:-translate-y-0.5"
        }
      `}
    >
      {loading && (
        <>
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
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
          <span>Salvataggio...</span>
        </>
      )}

      {saved && !loading && (
        <>
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          <span>Salvato!</span>
        </>
      )}

      {!loading && !saved && (
        <>
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span>Salva nei preferiti</span>
        </>
      )}
    </button>
  );
};

export default SalvaPreferiti;
