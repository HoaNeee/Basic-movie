import "./App.css";
import LayoutDefault from "./layout/LayoutDefault";
import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3";
axios.defaults.headers.common["Authorization"] = `Bearer ${
  import.meta.env.VITE_API_KEY
}`;

function App() {
  return (
    <>
      <LayoutDefault />
    </>
  );
}

export default App;
