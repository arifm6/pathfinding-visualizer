import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Header from "./components/Header";
import Board from "./components/Board";
import {
  selectCurrentDropdown,
  updateCurrentDropdown,
} from "./slices/headerSlice";
function App() {
  const dispatch = useDispatch();

  const currentDropdown = useSelector(selectCurrentDropdown);
  const handleClick = (e) => {
    e.target.innerHTML === currentDropdown
      ? dispatch(updateCurrentDropdown("none"))
      : dispatch(updateCurrentDropdown(e.target.innerHTML));
  };

  return (
    <div className="App min-h-screen w-screen" onClick={(e) => handleClick(e)}>
      <Header />
      <Board />
    </div>
  );
}

export default App;
