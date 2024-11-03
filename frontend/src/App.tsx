import './App.css'
import {Route, Routes} from "react-router";
import {Root} from "./Pages/Root";

function App() {
  return (
    <Routes>
      <Route path="/*" element={<Root/>}/>
    </Routes>
  );
}

export default App
