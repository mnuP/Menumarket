import Navigation from './routes/Navigation';
import Items from './routes/Items';
import Footer from './routes/Footer';
import "./style.css";


function App() {

  return (
    <div className="App">
      <Navigation/>
      <Items/>
      <Footer/>
    </div>
  );
}

export default App;