import Navigation from './routes/Navigation';
import Items from './routes/Items';
import Filters from './routes/Filters';

function App() {
  return (
    <div className="App">
      <Navigation/>
      <Filters/>
      <Items/>
    </div>
  );
}

export default App;