import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import SignUp from "./components/Authentication/SignUp";
import NewProduct from "./components/NewProduct";
import { cartContextType, new_productStoreType } from "./components/TypeStore";
import React, {  useState } from "react";
import CheckOut from "./components/User/CheckOut";
import DashBoard from "./components/User/DashBoard";

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
          <Route
            path='/new_arrival'
            element={
              <NewProduct cart={cartStore} setcartStore={setcartStore} />
            }
          />
          <Route path='/dashboard' element={<DashBoard />}>
            <Route path='checkout' element={<CheckOut />} />
            <Route
              path='new_arrival'
              element={
                <NewProduct cart={cartStore} setcartStore={setcartStore} />
              }
            />
          </Route>
        </Routes>
      </CartContext.Provider>
    </div>
  );
}

export default App;
