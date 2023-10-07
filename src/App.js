import Items from './routes/Items';
import Footer from './routes/Footer';
import "./style.css";
import { useState } from "react";



function App() {
    const [query,setQuery] = useState("");

  return (
    <div className="App">
      <Items/>
      <Footer/>
    </div>
  );
}

export default App;