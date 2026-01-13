const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center py-10 px-4">
      <img src="/climate.png" alt="Clima" className="w-40 h-40 mb-6" />
      <p className="max-w-xl text-center text-lg text-gray-800 bg-white/60 rounded-lg p-4 border border-green-600 shadow-md">
        Il cambiamento climatico rappresenta una delle sfide più grandi del
        nostro tempo. L'aumento delle temperature globali, lo scioglimento dei
        ghiacci e l'innalzamento del livello del mare sono solo alcune delle
        conseguenze visibili. È fondamentale agire ora per ridurre le emissioni
        di gas serra, proteggere l'ambiente e garantire un futuro sostenibile
        per le prossime generazioni.
      </p>
    </div>
  );
};
export default Home;
