import "./App.css";
import Header from "./components/Header";
import Login from "./components/Login";
import Navigation from "./components/Navigation";
// import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <div className="App">
      {!isLoggedIn && <Header />}
      <main>
        {!isLoggedIn && <Login />}
        {isLoggedIn && <Navigation />}
      </main>
    </div>
  );
}

export default App;
