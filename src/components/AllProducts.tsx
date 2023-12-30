import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ProductsType } from "./TypeStore";
import axios from "axios";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { GiCheckMark } from "react-icons/gi";
import { CartContext } from "../App";
import ProductCard from "./ProductCard";

type Props = {};

const AllProducts = (props: Props) => {
  const [Allproducts, setAllproducts] = useState<ProductsType[] | []>([]);
  const [isBuy, setIsBuy] = useState<boolean[]>([]);
  const [ShowSelected, setShowSelected] = useState<boolean>(false);
  const [IsLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setisError] = useState<boolean>(false);
  const [errorMessage, seterrorMessage] = useState("");
  const [Selected, setSelected] = useState<undefined | ProductsType>(undefined);
  const CART = useContext(CartContext);

  //on compountMount initialize isbuy state with boolean respective of allproduct length
  useEffect(() => {
    setIsBuy((prev) => {
      const newIsbuy = Allproducts.map((item) => false);
      return newIsbuy;
    });
  }, [Allproducts]);

  //on componentMount, request for API
  useEffect(() => {
    // set loading TRUE
    setIsLoading(true);
    axios
      .get("https://car-backend-23tq.onrender.com/allcars")
      .then((ReturnData) => {
        setIsLoading(false);
        setAllproducts(ReturnData.data);
      })
      .catch((err) => {
        seterrorMessage(err.message);
        setIsLoading(false);
        setisError(true);
      });
  }, []);

  //  handler to manage viewing cards
  const Choose = useCallback(
    (index: number) => {
      if (Allproducts.length > 0) {
        const select = Allproducts.find((item, i) => index === i);
        if (select) setSelected(select);
      }
    },
    [Allproducts],
  );

  //toggle Off view component
  const Toggle = useCallback(() => {
    setShowSelected(false);
  }, []);

  //buy handler
  const memoizedBuy = useMemo(() => {
    const handleBuy: (index: number) => void = (index) => {
      //spin the icon
      const icon: NodeListOf<Element> = document.querySelectorAll(".plus");
      const selectedItem = Allproducts.find(
        (_item, itemindex) => itemindex === index,
      );
      if (selectedItem) {
        if (!CART?.cart.includes(selectedItem)) {
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
          CART?.cartModifier((prevSTate) => [...prevSTate, selectedItem]);
        } else {
          alert("item already in the cart");
          setIsBuy(Array(Allproducts.length).fill(false));
        }
      }
    };
    return handleBuy;
  }, [Allproducts, CART]);

  //each product
  const EachProduct = useMemo(() => {
    if (AllProducts.length !== 0) {
      return Allproducts.map((item: ProductsType, itemIndex: number) => {
        return (
          <li
            key={itemIndex}
            className=' cards group p-2 m-3 h-auto md:w-[19rem] rounded flex flex-col hover:transition-all duration-500 hover:scale-95 hover:shadow-slate-700 shadow-md '>
            <button
              type='button'
              onClick={() => {
                Choose(itemIndex);
                setShowSelected(true);
              }}
              className='hidden text-xl font-bold  p-3 w-[6rem] m-auto group-hover:ring-1 ring-sky-400 uppercase group-hover:block rounded-lg relative '>
              about
            </button>
            <img
              src={`https://car-backend-23tq.onrender.com${item.Image}`}
              alt={`car ${itemIndex}`}
              className=' md:w-[20rem] shadow-md shadow-gray-600 md:h-[20rem] object-contain rounded-md m-auto my-2 p-1 '
            />
            <div className='Details flex flex-col w-full h-[auto] gap-1 bg-white'>
              <p className='font-semibold text-2xl text-neutral-800'>
                {item.name}
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
                <p className='text-black font-bold font-sans text-xl'>
                  ${item.price.toLocaleString()}
                </p>
                <p
                  id={`btn${itemIndex}`}
                  className='text-black uppercase md:text-2xl text-xl relative left-[2rem] md:left-0 '>
                  buy now
                </p>
                {isBuy[itemIndex] ? (
                  <GiCheckMark
                    color='green'
                    className='transition-all text-[25px] md:text-[42px]'
                  />
                ) : (
                  <BsFillPlusCircleFill
                    onClick={() => memoizedBuy(itemIndex)}
                    className={` plus text-[2.3rem] hover:cursor-pointer text-yellow-600 -ml-9 `}
                  />
                )}
              </div>
            </div>
          </li>
        );
      });
    }
  }, [Allproducts, Choose, isBuy, memoizedBuy]);

  return (
    <>
      {ShowSelected ? (
        <ProductCard Selected={Selected} close={Toggle} />
      ) : (
        <div className='flex flex-col  gap-3 w-full '>
          <ul className='w-full gap-x-[3rem] gap-y-[3rem] flex flex-wrap justify-center items-center'>
            {IsLoading ? (
              <div className='bg-yellow  w-[5rem] h-[5rem], p-4 animate-spin m-0 rounded-full bg-red-400 border-[10px] border-dotted'></div>
            ) : (
              EachProduct
            )}
          </ul>
          {/* render if error */}
          <p className='text-[50px] text-red-500 text-center'>
            {isError &&
              `${errorMessage}, failed to load products
            please check your network connections`}
          </p>
        </div>
      )}
    </>
  );
};

export default AllProducts;
