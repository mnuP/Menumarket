import Items from './routes/Items';
import "./style.css";
import { useState } from "react";



function App() {
    const [query,setQuery] = useState("");

  return (
    <div className="App">
      <Items/>
    </div>
  );
}

export default App;