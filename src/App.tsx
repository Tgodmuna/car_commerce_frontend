import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import SignUp from "./components/Authentication/SignUp";

function App() {
  return (
    <div className='App max-w-[100vw]'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/log-in' element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
