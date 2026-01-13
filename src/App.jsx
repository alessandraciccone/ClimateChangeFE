import "./App.css";
import NavBar from "./component/NavBar";
import Footer from "./component/Footer";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      {/* Main content would go here */}
      <main className="flex-1">{/* Il tuo contenuto principale va qui */}</main>
      <Footer />
    </div>
  );
}

export default App;
