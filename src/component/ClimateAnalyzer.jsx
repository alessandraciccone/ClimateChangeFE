import React, { useState } from "react";
import mondo from "/mondo.png";
import SalvaPreferiti from "./SalvaPreferiti";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Search, TrendingUp, TrendingDown, Activity } from "lucide-react";

const ClimateAnalyzer = () => {
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  // Database esteso con capitali mondiali e città principali
  const cities = {
    // Italia
    roma: { lat: 41.9028, lon: 12.4964 },
    milano: { lat: 45.4642, lon: 9.19 },
    napoli: { lat: 40.8518, lon: 14.2681 },
    torino: { lat: 45.0703, lon: 7.6869 },
    palermo: { lat: 38.1157, lon: 13.3615 },
    genova: { lat: 44.4056, lon: 8.9463 },
    bologna: { lat: 44.4949, lon: 11.3426 },
    firenze: { lat: 43.7696, lon: 11.2558 },
    bari: { lat: 41.1171, lon: 16.8719 },
    catania: { lat: 37.5079, lon: 15.083 },
    venezia: { lat: 45.4408, lon: 12.3155 },
    verona: { lat: 45.4384, lon: 10.9916 },
    pescara: { lat: 42.4618, lon: 14.2104 },

    // Europa
    parigi: { lat: 48.8566, lon: 2.3522 },
    londra: { lat: 51.5074, lon: -0.1278 },
    berlino: { lat: 52.52, lon: 13.405 },
    madrid: { lat: 40.4168, lon: -3.7038 },
    amsterdam: { lat: 52.3676, lon: 4.9041 },
    bruxelles: { lat: 50.8503, lon: 4.3517 },
    vienna: { lat: 48.2082, lon: 16.3738 },
    praga: { lat: 50.0755, lon: 14.4378 },
    varsavia: { lat: 52.2297, lon: 21.0122 },
    budapest: { lat: 47.4979, lon: 19.0402 },
    lisbona: { lat: 38.7223, lon: -9.1393 },
    atene: { lat: 37.9838, lon: 23.7275 },
    dublino: { lat: 53.3498, lon: -6.2603 },
    copenaghen: { lat: 55.6761, lon: 12.5683 },
    stoccolma: { lat: 59.3293, lon: 18.0686 },
    oslo: { lat: 59.9139, lon: 10.7522 },
    helsinki: { lat: 60.1699, lon: 24.9384 },
    mosca: { lat: 55.7558, lon: 37.6173 },

    // Americhe
    washington: { lat: 38.9072, lon: -77.0369 },
    "new york": { lat: 40.7128, lon: -74.006 },
    "los angeles": { lat: 34.0522, lon: -118.2437 },
    chicago: { lat: 41.8781, lon: -87.6298 },
    "san francisco": { lat: 37.7749, lon: -122.4194 },
    toronto: { lat: 43.6532, lon: -79.3832 },
    vancouver: { lat: 49.2827, lon: -123.1207 },
    montreal: { lat: 45.5017, lon: -73.5673 },
    "città del messico": { lat: 19.4326, lon: -99.1332 },
    "buenos aires": { lat: -34.6037, lon: -58.3816 },
    "rio de janeiro": { lat: -22.9068, lon: -43.1729 },
    "san paolo": { lat: -23.5505, lon: -46.6333 },
    santiago: { lat: -33.4489, lon: -70.6693 },
    lima: { lat: -12.0464, lon: -77.0428 },
    bogotà: { lat: 4.711, lon: -74.0721 },

    // Asia
    tokyo: { lat: 35.6762, lon: 139.6503 },
    pechino: { lat: 39.9042, lon: 116.4074 },
    shanghai: { lat: 31.2304, lon: 121.4737 },
    "hong kong": { lat: 22.3193, lon: 114.1694 },
    seoul: { lat: 37.5665, lon: 126.978 },
    bangkok: { lat: 13.7563, lon: 100.5018 },
    singapore: { lat: 1.3521, lon: 103.8198 },
    "kuala lumpur": { lat: 3.139, lon: 101.6869 },
    jakarta: { lat: -6.2088, lon: 106.8456 },
    manila: { lat: 14.5995, lon: 120.9842 },
    delhi: { lat: 28.7041, lon: 77.1025 },
    mumbai: { lat: 19.076, lon: 72.8777 },
    dubai: { lat: 25.2048, lon: 55.2708 },
    istanbul: { lat: 41.0082, lon: 28.9784 },
    teheran: { lat: 35.6892, lon: 51.389 },

    // Oceania
    sydney: { lat: -33.8688, lon: 151.2093 },
    melbourne: { lat: -37.8136, lon: 144.9631 },
    auckland: { lat: -36.8485, lon: 174.7633 },
    wellington: { lat: -41.2865, lon: 174.7762 },

    // Africa
    cairo: { lat: 30.0444, lon: 31.2357 },
    "città del capo": { lat: -33.9249, lon: 18.4241 },
    johannesburg: { lat: -26.2041, lon: 28.0473 },
    nairobi: { lat: -1.2864, lon: 36.8172 },
    lagos: { lat: 6.5244, lon: 3.3792 },
    casablanca: { lat: 33.5731, lon: -7.5898 },
  };

  const fetchClimateData = async (coords, year) => {
    const { lat, lon } = coords;
    const startDate = `${year}0101`;
    const endDate = `${year}1231`;

    const url = `https://power.larc.nasa.gov/api/temporal/daily/point?parameters=T2M&community=RE&longitude=${lon}&latitude=${lat}&start=${startDate}&end=${endDate}&format=JSON`;

    const response = await fetch(url);
    if (!response.ok) throw new Error("Errore nel recupero dati");
    return await response.json();
  };

  const calculateStats = (tempData) => {
    const temps = Object.values(tempData);
    const sum = temps.reduce((a, b) => a + b, 0);
    const avg = sum / temps.length;
    const max = Math.max(...temps);
    const min = Math.min(...temps);

    return {
      media: avg.toFixed(2),
      massima: max.toFixed(2),
      minima: min.toFixed(2),
      anomalie: temps.filter((t) => Math.abs(t - avg) > 10).length,
    };
  };

  const analyzeTrend = (data2023, data2024) => {
    const avg2023 =
      Object.values(data2023).reduce((a, b) => a + b, 0) /
      Object.values(data2023).length;
    const avg2024 =
      Object.values(data2024).reduce((a, b) => a + b, 0) /
      Object.values(data2024).length;
    const change = avg2024 - avg2023;

    return {
      avg2023: avg2023.toFixed(2),
      avg2024: avg2024.toFixed(2),
      change: change.toFixed(2),
      percentChange: ((change / avg2023) * 100).toFixed(2),
    };
  };

  const handleSearch = async () => {
    const cityLower = city.toLowerCase().trim();

    if (!cities[cityLower]) {
      setError(
        "Città non trovata. Prova ad esempio: Roma, Parigi, Londra, New York, Tokyo, Sydney, Cairo. Supportate oltre 70 città nel mondo!"
      );
      return;
    }

    setError("");
    setLoading(true);

    try {
      // Fetch dati 2023 e 2024
      const [response2023, response2024] = await Promise.all([
        fetchClimateData(cities[cityLower], 2023),
        fetchClimateData(cities[cityLower], 2024),
      ]);

      const tempData2023 = response2023.properties.parameter.T2M;
      const tempData2024 = response2024.properties.parameter.T2M;

      // Calcola statistiche
      const stats2023 = calculateStats(tempData2023);
      const stats2024 = calculateStats(tempData2024);
      const trend = analyzeTrend(tempData2023, tempData2024);

      // Prepara dati per il grafico (ultimi 90 giorni di ogni anno)
      const chartData = [];
      const entries2023 = Object.entries(tempData2023).slice(-90);
      const entries2024 = Object.entries(tempData2024).slice(-90);

      for (
        let i = 0;
        i < Math.min(entries2023.length, entries2024.length);
        i++
      ) {
        chartData.push({
          giorno: i + 1,
          2023: parseFloat(entries2023[i][1]),
          2024: parseFloat(entries2024[i][1]),
        });
      }

      setData({
        chartData,
        stats2023,
        stats2024,
        trend,
        cityName: cityLower.charAt(0).toUpperCase() + cityLower.slice(1),
      });
    } catch (err) {
      setError("Errore nel recupero dei dati. Riprova.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        <div className=" rounded-2xl shadow-xl p-4 sm:p-6 md:p-8  bg-sky-100">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2 flex items-center gap-2 sm:gap-3">
            <Activity className="text-blue-600" size={32} />
            <span>Analizzatore Climatico NASA</span>
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
            Analisi del cambiamento climatico con dati NASA POWER
          </p>

          {/* Search Bar */}
          <div className="flex gap-3 mb-8">
            <div className="flex-1 relative">
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Inserisci una città (es. Roma, Parigi, Tokyo, New York...)"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none bg-white"
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 disabled:bg-gray-400 transition-colors"
            >
              <Search size={20} />
              {loading ? "Caricamento..." : "Analizza"}
            </button>
          </div>

          {/* Show mondo.png only before any search (when data is null and not loading) */}
          {data === null && !loading && (
            <div className="flex justify-center mb-8">
              <img
                src={mondo}
                alt="Mondo"
                className="max-w-xs w-full h-auto rounded-xl"
              />
            </div>
          )}

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-3 sm:p-4 mb-4 sm:mb-6 rounded">
              <p className="text-red-700 text-sm sm:text-base">{error}</p>
            </div>
          )}

          {data && (
            <div className="space-y-8">
              {/* Trend del Cambiamento Climatico */}
              <div className="bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-200 rounded-xl p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    {parseFloat(data.trend.change) > 0 ? (
                      <TrendingUp className="text-red-600" size={28} />
                    ) : (
                      <TrendingDown className="text-blue-600" size={28} />
                    )}
                    Trend Climatico: {data.cityName}
                  </h2>

                  {/* BOTTONE SALVA PREFERITI */}
                  <SalvaPreferiti
                    titolo={`Analisi Climatica - ${data.cityName}`}
                    descrizione={`Trend climatico: ${
                      parseFloat(data.trend.change) > 0 ? "+" : ""
                    }${data.trend.change}°C tra 2023-2024 (${
                      data.trend.percentChange
                    }%)`}
                    imglink={`https://via.placeholder.com/400x300?text=Climate+${data.cityName}`}
                  />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-sm text-gray-600">Media 2023</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {data.trend.avg2023}°C
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-sm text-gray-600">Media 2024</p>
                    <p className="text-2xl font-bold text-orange-600">
                      {data.trend.avg2024}°C
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-sm text-gray-600">Variazione</p>
                    <p
                      className={`text-2xl font-bold ${
                        parseFloat(data.trend.change) > 0
                          ? "text-red-600"
                          : "text-blue-600"
                      }`}
                    >
                      {parseFloat(data.trend.change) > 0 ? "+" : ""}
                      {data.trend.change}°C
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-sm text-gray-600">Variazione %</p>
                    <p
                      className={`text-2xl font-bold ${
                        parseFloat(data.trend.percentChange) > 0
                          ? "text-red-600"
                          : "text-blue-600"
                      }`}
                    >
                      {parseFloat(data.trend.percentChange) > 0 ? "+" : ""}
                      {data.trend.percentChange}%
                    </p>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-white rounded-lg">
                  <p className="text-gray-700">
                    <strong>Interpretazione:</strong> La temperatura media
                    annuale è{" "}
                    {parseFloat(data.trend.change) > 0
                      ? "aumentata"
                      : "diminuita"}{" "}
                    di{" "}
                    <span
                      className={
                        parseFloat(data.trend.change) > 0
                          ? "text-red-600 font-bold"
                          : "text-blue-600 font-bold"
                      }
                    >
                      {Math.abs(parseFloat(data.trend.change))}°C
                    </span>{" "}
                    tra il 2023 e il 2024, corrispondente a un{" "}
                    {parseFloat(data.trend.change) > 0
                      ? "riscaldamento"
                      : "raffreddamento"}{" "}
                    del{" "}
                    <span className="font-bold">
                      {Math.abs(parseFloat(data.trend.percentChange))}%
                    </span>
                    .
                  </p>
                </div>
              </div>

              {/* Grafico Comparativo */}
              <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Confronto Temperature 2023 vs 2024 (ultimi 90 giorni)
                </h2>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={data.chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="giorno"
                      label={{
                        value: "Giorni",
                        position: "insideBottom",
                        offset: -5,
                      }}
                    />
                    <YAxis
                      label={{
                        value: "Temperatura (°C)",
                        angle: -90,
                        position: "insideLeft",
                      }}
                    />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="2023"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      dot={false}
                    />
                    <Line
                      type="monotone"
                      dataKey="2024"
                      stroke="#f97316"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Statistiche Dettagliate */}
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">
                    📊 Statistiche 2023
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 text-sm sm:text-base">
                        Temperatura Media:
                      </span>
                      <span className="font-bold text-blue-600 text-base sm:text-lg">
                        {data.stats2023.media}°C
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 text-sm sm:text-base">
                        Temperatura Massima:
                      </span>
                      <span className="font-bold text-red-600 text-base sm:text-lg">
                        {data.stats2023.massima}°C
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 text-sm sm:text-base">
                        Temperatura Minima:
                      </span>
                      <span className="font-bold text-blue-800 text-base sm:text-lg">
                        {data.stats2023.minima}°C
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 text-sm sm:text-base">
                        Anomalie Termiche:
                      </span>
                      <span className="font-bold text-orange-600 text-base sm:text-lg">
                        {data.stats2023.anomalie} giorni
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">
                    📊 Statistiche 2024
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 text-sm sm:text-base">
                        Temperatura Media:
                      </span>
                      <span className="font-bold text-orange-600 text-base sm:text-lg">
                        {data.stats2024.media}°C
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 text-sm sm:text-base">
                        Temperatura Massima:
                      </span>
                      <span className="font-bold text-red-600 text-base sm:text-lg">
                        {data.stats2024.massima}°C
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 text-sm sm:text-base">
                        Temperatura Minima:
                      </span>
                      <span className="font-bold text-blue-800 text-base sm:text-lg">
                        {data.stats2024.minima}°C
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 text-sm sm:text-base">
                        Anomalie Termiche:
                      </span>
                      <span className="font-bold text-orange-600 text-base sm:text-lg">
                        {data.stats2024.anomalie} giorni
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 sm:p-4 text-xs sm:text-sm text-gray-600">
                <strong>Nota:</strong> Le anomalie termiche sono giorni con
                temperatura che differisce di oltre 10°C dalla media annuale.
                Dati forniti da NASA POWER (MERRA2).
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClimateAnalyzer;
