import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ProductsType } from "./TypeStore";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { GiCheckMark } from "react-icons/gi";

import axios from "axios";
import ProductCard from "./ProductCard";

type NewproductProps = {
  cart: ProductsType[];
  setcartStore: React.Dispatch<React.SetStateAction<ProductsType[]>>;
};

const NewProduct = ({ cart, setcartStore }: NewproductProps) => {
  //API store
  const [Store, setStore] = useState<ProductsType[] | []>([]);
  const [IsLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setisError] = useState<boolean>(false);
  const [errorMessage, seterrorMessage] = useState("");
  const [isBuy, setIsBuy] = useState<boolean[]>(
    Array(Store.length).fill(false),
  );
  const [ShowSelected, setShowSelected] = useState<boolean>(false);
  const [Selected, setSelected] = useState<undefined | ProductsType>(undefined);

  //on componentMount, request for API
  useEffect(() => {
    // set loading TRUE
    setIsLoading(true);
    setisError(false);

    axios
      .get("https://car-backend-23tq.onrender.com/newcars")
      .then((ReturnedData) => {
        if (ReturnedData.data) setIsLoading(false);
        setStore(ReturnedData.data);
        return ReturnedData;
      })
      .catch((err) => {
        seterrorMessage(err.meassage);
        setIsLoading(false);
        setisError(true);
      });
  }, []);

  //buy handler
  const memoizedHandleBuy = useMemo(() => {
    const handleBuy: (index: number) => void = (index) => {
      //spin the icon
      const icon: NodeListOf<Element> = document.querySelectorAll(".plus");

      //return an element where indices are same
      const selectedItem = Store.find(
        (_item, itemindex) => itemindex === index,
      );
      if (selectedItem) {
        // add BuyBtn_Animation class if the selected item is not in the cart
        if (!cart.includes(selectedItem)) {
          icon[index].classList.add("BuyBtn_Animation");
          setTimeout(() => {
            icon[index].classList.remove("BuyBtn_Animation");
            // show marked in some seconds
            setIsBuy((prev) => {
              prev[index] = true;
              return [...prev];
            });
          }, 1000);

          //show back the plus icon
          setTimeout(() => {
            setIsBuy((prev) => {
              prev[index] = false;
              return [...prev];
            });
          }, 3000);
          setcartStore((prevSTate) => [...prevSTate, selectedItem]);
        } else {
          alert("already in the cart");
          setIsBuy(Array(Store.length).fill(false));
        }
      }
    };
    return handleBuy;
  }, [Store, cart, setcartStore]);

  //  handler to manage viewing eachItem
  const Choose = useCallback(
    (index: number) => {
      if (Store.length > 0) {
        const select = Store.find((item, i) => index === i);
        if (select) setSelected(select);
      }
    },
    [Store],
  );

  const eachItem = useMemo(
    () =>
      Store.map((item, index) => {
        return (
          <li
            key={index}
            className=' card group p-2 m-3 h-auto md:w-[19.9rem] rounded flex flex-col hover:transition-all duration-500 hover:scale-95 hover:shadow-slate-700 shadow-md '>
            {/* detail button */}
            <button
              type='button'
              onClick={() => {
                Choose(index);
                setShowSelected(true);
              }}
              className='hidden text-xl font-bold  p-3 w-[6rem] m-auto group-hover:ring-1 ring-sky-400 uppercase group-hover:block rounded-lg relative '>
              Details
            </button>
            {/* product image */}
            <img
              src={`https://car-backend-23tq.onrender.com/allcars${item.Image}`}
              alt={`car ${index}`}
              className=' md:w-[20rem] shadow-md shadow-gray-600 md:h-[20rem] object-contain rounded-md m-auto my-2 p-1 '
            />

            {/* model,description,rating,percentage rating and buy button container */}
            <div className='Details flex flex-col w-full h-[auto] gap-1 bg-white'>
              <p className='font-semibold text-2xl text-neutral-800'>
                {item.model}
              </p>
              <h4 className='description w-[15rem] text-xl font-semibold overflow-hidden whitespace-nowrap overflow-ellipsis  text-neutral-900'>
                {item.description}
              </h4>
              <span className='rating flex '>
                {item.rating}
                {item.percentage_rating}
              </span>

              <div className='price flex justify-between items-center w-full'>
                <p className='text-neutral-600 font-bold font-sans text-xl'>
                  ${item.price.toLocaleString()}
                </p>
                <p
                  id={`btn${index}`}
                  className='text-black uppercase md:text-2xl text-xl relative left-[2rem] md:left-0 '>
                  buy now
                </p>
                {isBuy[index] ? (
                  <GiCheckMark
                    color='green'
                    className='transition-all text-[25px] md:text-[42px]'
                    // size={42}
                  />
                ) : (
                  <BsFillPlusCircleFill
                    onClick={() => memoizedHandleBuy(index)}
                    className={` plus text-[2.3rem] hover:cursor-pointer text-yellow-600 -ml-9 `}
                  />
                )}
              </div>
            </div>
          </li>
        );
      }),
    [Choose, Store, isBuy, memoizedHandleBuy],
  );
  //toggle Off view component
  const Toggle = useCallback(() => {
    setShowSelected(false);
  }, []);
  return (
    <>
      {ShowSelected ? (
        <ProductCard Selected={Selected} close={Toggle} />
      ) : (
        <div className='flex flex-col  justify-center items-center'>
          <div className='flex justify-between items-center w-full md:bg-inherit bg-slate-950 px-6 my-2 p-4 md:p-0 md:my-5 '>
            <h1 className='uppercase md:text-neutral-900 font-bold text-xl text-white md:text-5xl'>
              new arrival
            </h1>
            <button
              type='button'
              className='md:h-[65px] md:w-[10rem] w-[7rem] h-[40px] bg-slate-100 md:text-xl text-xs uppercase text-black  border-1b border-black border-[2px] rounded-lg hover:bg-slate-50 hover:cursor-pointer'>
              View all
            </button>
          </div>
          <div className='flex flex-wrap gap-2 items-center justify-center'>
            {IsLoading ? (
              <div className='bg-yellow  w-[10rem], h-[10rem],  animate-spin m-0 rounded-full bg-red-400 border-[10px] border-dotted'></div>
            ) : (
              <ul className='flex flex-wrap  max-w-[100vw] w m-auto justify-center items-center'>
                {isError ? (
                  <h1 className='text-red-600 text-3xl'>{errorMessage}</h1>
                ) : (
                  eachItem
                )}
              </ul>
            )}
          </div>
        </div>
      )}
    </>
  );
};
export default React.memo(NewProduct);
