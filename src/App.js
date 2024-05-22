import logo from './logo.svg';
import './App.css';
import Meteo from "./components/Meteo"
import Navbar from "./components/Navbar"
// const Header = () => {
//   return(
//       <nav className="header-links">
//           <Link to="/" className="link">Home</Link>
//           <Link to="/about" className="link">About</Link>
//           <Link to="/contact" className="link">Contact Us</Link>
//       </nav>
//   );
// }

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Meteo/>
    </div>
  );
}

export default App;
