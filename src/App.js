import Navigation from './routes/Navigation';
import Items from './routes/Items';
import Filters from './routes/Filters';
import Footer from './routes/Footer';

function App() {
  return (
    <div className="App">
      <Navigation/>
      <Filters/>
      <Items/>
      <Footer/>
    </div>
  );
}

export default App;