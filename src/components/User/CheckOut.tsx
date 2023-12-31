import { memo, useCallback, useContext, useMemo, useState } from "react";
import { CartContext } from "../../App";
import { FaMinus, FaPlus } from "react-icons/fa";
import { cartContextType } from "../TypeStore";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";

type Props = {};

const CheckOut = (props: Props) => {
  const CART = useContext(CartContext);
  const { cart, cartModifier } = CART as cartContextType;

  //this is a counter that tracks each item's quantity
  const [QuantityCounter, setQuantityCounter] = useState<number[]>(
    cart.map((item): number => item.quantity) || [],
  );
  //holds the total item's quantity price after calculation
  const [TotalQtyPrice, setTotalQtyPrice] = useState<number[]>(
    cart.map((item): number => item.price) || [],
  );

  const checkAllTotalPrice = (): number => {
    return TotalQtyPrice.reduce((total, item) => total + item, 0);
  };
  //a function that calculates the total price for each item based on its quantity:
  const calculateTotalPrice: (quantity: number, price: number) => number = (
    quantity: number,
    price: number,
  ): number => {
    return quantity * price;
  };

  // Quantity change handler
  const handleQuantityChange = useCallback(
    (index: number, newQuantity: number) => {
      // Update the quantity counter
      setQuantityCounter((prev) => {
        const newQty = [...prev];
        newQty[index] = newQuantity;
        return newQty;
      });

      // Calculate the new total price
      setTotalQtyPrice((prev) => {
        const newTotal = [...prev];
        newTotal[index] = calculateTotalPrice(newQuantity, cart[index].price);
        return newTotal;
      });
    },
    [cart],
  );

  const removeItem = useCallback(
    (index: number) => {
      let newCart = cart.filter((_item, itemIndex) => itemIndex !== index);
      cartModifier(newCart);
    },
    [cart, cartModifier],
  );

  let eachItem;
  eachItem = useMemo(() => {
    return cart.map((item, itemIndex) => {
      return (
        <li
          className='flexcol flex md:flex-row  w-full  even:bg-slate-100 odd:bg-slate-200  p-3 md:mb-[1rem] m-2 justify-between items-center rounded-lg '
          key={itemIndex}>
          {/* item_image and item_name  */}

          <div className='w-[14vw] justify-between h-[10rem]  flex flex-row p-2 '>
            <img
              src={`https://car-backend-23tq.onrender.com/allcars${item.Image}`}
              alt={`item${itemIndex}_image`}
              className=' w-full object-contain '
            />
            <span className='flex flex-col justify-between capitalize bg-inherit'>
              <p className='item_name text-[16px] text-neutral-800 font-semibold m-2'>
                {item.model}
              </p>
              <p
                className='text-red-900 m-2 hover:scale-95 transition-all hover:cursor-pointer '
                onClick={() => removeItem(itemIndex)}>
                remove
              </p>
            </span>
          </div>

          {/* item quantity,price, itemprice */}
          <div className='flex justify-center items-center flex-wrap md:flex-nowrap md:justify-between w-[40vw] max-w-[40vw]'>
            {/* quantity */}
            <div className='flex flex-col h-[10rem] w-[7rem] gap-[2rem]'>
              <p className='text-[13px] font-bold text-gray-400 uppercase'>
                quantity
              </p>
              <div className='flex justify-between items-center'>
                <FaPlus
                  onClick={() => {
                    handleQuantityChange(
                      itemIndex,
                      QuantityCounter[itemIndex] + 1,
                    );
                  }}
                  size={20}
                  className='hover:text-cyan-400 hover:scale-95 '
                />
                <input
                  readOnly
                  name='quantity'
                  id='qty'
                  value={QuantityCounter && QuantityCounter[itemIndex]}
                  className='w-[3rem] bg-slate-100 focus:ring-[5px]  border-cyan-600  p-1 hover:cursor-pointer'
                />
                <FaMinus
                  onClick={() => {
                    handleQuantityChange(
                      itemIndex,
                      QuantityCounter[itemIndex] - 1,
                    );
                  }}
                  size={20}
                  className='hover:text-cyan-400 hover:scale-95 hover:cursor-pointer'
                />
              </div>
            </div>
            {/* price */}
            <div className='flex flex-col h-[10rem] w-[7rem] gap-[2rem]'>
              <p className='text-[13px] font-bold text-gray-400 uppercase'>
                price
              </p>
              <div className='text-neutral-800 text-xl font-semibold'>
                {item.price.toLocaleString()}
              </div>
            </div>
            {/* total */}
            <div className='flex flex-col h-[10rem] w-[7rem] gap-[2rem]'>
              <p className='text-[13px] font-bold text-gray-400 uppercase'>
                total
              </p>
              <div className='text-neutral-800 text-xl font-semibold'>
                {`$${TotalQtyPrice[itemIndex].toLocaleString()}`}
              </div>
            </div>
          </div>
        </li>
      );
    });
  }, [QuantityCounter, TotalQtyPrice, cart, handleQuantityChange, removeItem]);

  return (
    <div className='flex w-full mt-[1rem] gap-2 '>
      <ul className=' gap-2 md:flex flex-col w-full p-4 max-h-[53rem] rounded-xl overflow-auto overflow-x-hidden'>
        <div className='flex justify-between items-center w-full'>
          <h1 className='uppercase font-bold text-4xl text-neutral-600 '>
            shopping cart
          </h1>
          <h3 className='text-3xl text-neutral-600 font-semibold'>
            {cart.length}items
          </h3>
        </div>
        <hr className='border-[2px] border-slate-500 mt-2 w-auto' />
        {cart.length !== 0 ? (
          eachItem
        ) : (
          <div className='  uppercase m-auto text-[50px] animate-bounce text-red-950'>
            <p className='flex items-center gap-2'>
              {" "}
              no item in cart
              <MdOutlineRemoveShoppingCart className='animate-ping' size={70} />
            </p>
            <p>add item and come back</p>
          </div>
        )}
      </ul>
      {/* order summary */}
      {cart.length !== 0 && (
        <div className=' flex flex-col gap-[3rem] w-[40rem] h-[53rem] bg-slate-100 p-5  rounded-xl'>
          <h1 className='text-center capitalize text-4xl font-bold'>
            order summary
          </h1>
          <hr className='border-gray-600 border' />
          <div className='flex justify-between items-center w-full '>
            <p className='uppercase text-xl'>
              total price $ <span>{checkAllTotalPrice().toLocaleString()}</span>
            </p>
            <p className='uppercase text-xl'>
              total items:{" "}
              <span className='font-bold text-xl'>{cart.length}</span>
            </p>
          </div>
          {/* location */}
          <div className=' flex flex-col justify-center items-center h-auto w-full'>
            <p className=' mr-[31rem] p-2 text-[20px] uppercase font-bold text-neutral-600'>
              shipping:
            </p>
            <select
              title='shipping location'
              name='shipping_type'
              id='shipType'
              className='w-full p-3 rounded-xl uppercase bg-gray-100'>
              <option
                className=' bg-cyan-100 text-xl hover:cursor-pointer'
                value='location 1'>
                location 1
              </option>
              <option
                className='appearance-none bg-cyan-100 text-xl hover:cursor-pointer'
                value='location 1'>
                location 2
              </option>
              <option
                className='appearance-none bg-cyan-100 text-xl hover:cursor-pointer'
                value='location 1'>
                location 3
              </option>
            </select>
          </div>
          {/* promo code */}
          <div className=' flex flex-col justify-center items-center h-auto w-full gap-2'>
            <label
              htmlFor='promo'
              className='font-bold text-xl text-neutral-600 uppercase mr-[31rem]'>
              promo
            </label>
            <input
              type='text'
              name='promo-code'
              placeholder=' enter promo code e.g:cx-45jk'
              className='p-4 w-full rounded-xl placeholder:text-center placeholder:uppercase'
            />
            <button
              type='submit'
              className='mr-[31rem] text-white w-[7rem] h-[3rem]  uppercase font-semibold rounded-lg hover:bg-red-600 bg-red-800 text-2xl'>
              apply
            </button>
          </div>
          {/* total cost */}
          <hr className='border-gray-600 border' />
          <div className='flex justify-between items-center w-full '>
            <p className='uppercase text-3xl font-extrabold text-neutral-600'>
              total cost
            </p>
            <p className='uppercase text-xl font-semibold'>$</p>
          </div>
          <button
            type='submit'
            className='w-full h-[4rem] bg-blue-700 rounded-md uppercase text-white  text-2xl hover:bg-blue-500'>
            checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default memo(CheckOut);
