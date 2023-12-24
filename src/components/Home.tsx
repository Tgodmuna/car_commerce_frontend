import React, { useContext } from "react";
import Navbar from "./Navbar";
import { CartContext } from "../App";

type Props = {};

const Home = (props: Props) => {
  const Cart = useContext(CartContext);
  const checkLen: () => number | undefined = () => {
    return Cart?.cart.length;
  };

  return (
    <div>
      <Navbar
        cartQuantity={checkLen}
        paths={{
          newProducts: "/new_arrival",
          newModels: "",
          latestModel: "",
          cart: "/checkout",
        }}
        IsLoggedIn={false}
      />
    </div>
  );
};

export default Home;
