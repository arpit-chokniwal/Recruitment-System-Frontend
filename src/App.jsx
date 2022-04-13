import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import AllRoutes from "./components/Routes";

function App() {
  return (
    <div className="App">
      <Header />
      <AllRoutes />
      {/* <Footer /> */}
    </div>
  );
}

export default App;
