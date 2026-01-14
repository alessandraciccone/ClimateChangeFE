import React, { useState } from "react";

const SalvaPreferiti = ({ titolo, descrizione, imglink, onSaved }) => {
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSalva = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Devi effettuare il login per salvare i preferiti");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/preferiti", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ titolo, descrizione, imglink }),
      });

      if (!response.ok) {
        if (response.status === 403) {
          alert("Sessione scaduta. Effettua di nuovo il login.");
        } else {
          const text = await response.text();
          throw new Error(text);
        }
        return;
      }

      setSaved(true);
      onSaved && onSaved();
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      console.error("Errore salvataggio preferito:", err);
      alert("Errore durante il salvataggio");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleSalva}
      disabled={loading || saved}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition
        ${saved ? "bg-blue-500" : "bg-green-500 hover:bg-green-600"}
        text-white disabled:opacity-60`}
    >
      {loading ? "Salvataggio..." : saved ? "Salvato ✓" : "Salva nei preferiti"}
    </button>
  );
};

export default SalvaPreferiti;
