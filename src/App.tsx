import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import SignUp from "./components/Authentication/SignUp";
import NewProduct from "./components/NewProduct";
import { ProductsType, cartContextType } from "./components/TypeStore";
import React, { useState } from "react";
import CheckOut from "./components/User/CheckOut";
import DashBoard from "./components/User/DashBoard";
import ErrorBoundary from "./components/ErroBundry";
import AllProducts from "./components/AllProducts";

//cart context
export const CartContext = React.createContext<undefined | cartContextType>(
  undefined,
);

function App() {
  //cart store
  const [cartStore, setcartStore] = useState<ProductsType[]>([]);

  const CartStoreAndModification = {
    cart: cartStore,
    cartModifier: setcartStore,
  };

  return (
    <ErrorBoundary>
      <div className='App'>
        <CartContext.Provider value={CartStoreAndModification}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/sign-up' element={<SignUp />} />
            <Route
              path='/new_arrival'
              element={
                <NewProduct cart={cartStore} setcartStore={setcartStore} />
              }
            />
            <Route path='/dashboard' element={<DashBoard />}>
              <Route path='checkout' index={true} element={<CheckOut />} />
              <Route
                index={true}
                path='new_arrival'
                element={
                  <NewProduct cart={cartStore} setcartStore={setcartStore} />
                }
              />
            </Route>
          </Routes>
        </CartContext.Provider>
      </div>
    </ErrorBoundary>
  );
}

export default App;
