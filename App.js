import Items from './routes/Items';
import "./style.css";
import { useState } from "react";
import { Helmet } from "react-helmet";



function App() {
    const [query,setQuery] = useState("");

  return (
    <div className="App">
      <Helmet>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
            />
      </Helmet>
      <Items/>
    </div>
  );
}

export default App;