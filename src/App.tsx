import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import SignUp from "./components/Authentication/SignUp";
import NewProduct from "./components/NewProduct";
import { cartContextType, new_productStoreType } from "./components/TypeStore";
import React, { useCallback, useState } from "react";
import Cart from "./components/User/CheckOut";
import CheckOut from "./components/User/CheckOut";
import DashBoard, { Main } from "./components/User/DashBoard";

//cart context
export const CartContext = React.createContext<undefined | cartContextType>(
  undefined,
);

function App() {
  //cart store
  const [cartStore, setcartStore] = useState<new_productStoreType[]>([]);

  const CartStoreAndModification = {
    cart: cartStore,
    cartModifier: setcartStore,
  };

  return (
    <div className='App'>
      <CartContext.Provider value={CartStoreAndModification}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/log-in' element={<SignUp />} />
          <Route path='/checkOut' element={<CheckOut />} />
          <Route
            path='/new_arrival'
            element={
              <NewProduct cart={cartStore} setcartStore={setcartStore} />
            }
          />
          <Route path='/dashboard' element={<DashBoard />} />
        </Routes>
      </CartContext.Provider>
    </div>
  );
}

export default App;
