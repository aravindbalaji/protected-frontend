import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import HomePage from './pages/Home';
import PostPage from './pages/Post'
import Wrapper from "./pages/Wrapper";

function App() {
  return (
    <div className="App">
      <Wrapper />
    </div>
  );
}

export default App;
