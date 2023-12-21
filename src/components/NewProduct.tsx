import React, { memo, useCallback, useMemo, useState } from "react";
import { new_productStoreType, viewCardPropType } from "./TypeStore";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { GiCheckMark } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";

type NewproductProps = {
  cart: new_productStoreType[];
  setcartStore: React.Dispatch<React.SetStateAction<new_productStoreType[]>>;
};

const NewProduct = ({ cart, setcartStore }: NewproductProps) => {
  //id generator
  const idGEn = () => {
    return Math.floor(Math.random() * 900) + 100;
  };
  //API store
  const Store: new_productStoreType[] = useMemo(
    () => [
      {
        model: "Toyota Camry",
        id: idGEn(),
        qty: 1,
        year: 2022,
        price: 35000,
        image: "/NewArrivalCarImage/car2.jpg",
        description:
          "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt reprehender" +
          "it voluptates itaque perferendis placeat nisi quia odio rem recusandae perspic" +
          "iatis velit sint, dolorum illo excepturi commodi quod eius laboriosam aperiam.",
        rating: "⭐⭐⭐⭐🌟",
        percentage_rating: "3.7%",
      },
      {
        model: "Honda Accord",
        id: idGEn(),
        qty: 1,
        year: 2023,
        price: 38000,
        image: "/NewArrivalCarImage/car3.jpg",
        description:
          "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt reprehender" +
          "it voluptates itaque perferendis placeat nisi quia odio rem recusandae perspic" +
          "iatis velit sint, dolorum illo excepturi commodi quod eius laboriosam aperiam",
        rating: "⭐⭐⭐⭐🌟",
        percentage_rating: "3.7%",
      },
      {
        model: "Ford Mustang",
        id: idGEn(),
        qty: 1,
        year: 2022,
        price: 45000,
        image: "/NewArrivalCarImage/car4.jpg",
        description:
          "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt reprehender" +
          "it voluptates itaque perferendis placeat nisi quia odio rem recusandae perspic" +
          "iatis velit sint, dolorum illo excepturi commodi quod eius laboriosam aperiam.",
        rating: "⭐⭐⭐⭐🌟",
        percentage_rating: "3.7%",
      },
      {
        model: "Chevrolet Malibu",
        id: idGEn(),
        qty: 1,
        year: 2021,
        price: 32000,
        image: "/NewArrivalCarImage/car5.jpg",
        description:
          "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt reprehender" +
          "it voluptates itaque perferendis placeat nisi quia odio rem recusandae perspic" +
          "iatis velit sint, dolorum illo excepturi commodi quod eius laboriosam aperiam.",
        rating: "⭐⭐⭐⭐🌟",
        percentage_rating: "3.8%",
      },
      {
        model: "Nissan Altima",
        id: idGEn(),
        qty: 1,
        year: 2022,
        price: 36000,
        image: "/NewArrivalCarImage/car6.jpg",
        description:
          "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt reprehender" +
          "it voluptates itaque perferendis placeat nisi quia odio rem recusandae perspic" +
          "iatis velit sint, dolorum illo excepturi commodi quod eius laboriosam aperiam.",
        rating: "⭐⭐⭐⭐🌟",
        percentage_rating: "3.7%",
      },
      {
        model: "bugatti Veron",
        id: idGEn(),
        qty: 1,
        year: 2022,
        price: 36000,
        image: "/NewArrivalCarImage/car10.jpg",
        description:
          "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt reprehender" +
          "it voluptates itaque perferendis placeat nisi quia odio rem recusandae perspic" +
          "iatis velit sint, dolorum illo excepturi commodi quod eius laboriosam aperiam.",
        rating: "⭐⭐⭐⭐🌟",
        percentage_rating: "5.7%",
      },
      {
        model: "bugatti Veron",
        id: idGEn(),
        qty: 1,
        year: 2022,
        price: 36000,
        image: "/NewArrivalCarImage/car9.jpg",
        description:
          "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt reprehender" +
          "it voluptates itaque perferendis placeat nisi quia odio rem recusandae perspic" +
          "iatis velit sint, dolorum illo excepturi commodi quod eius laboriosam aperiam.",
        rating: "⭐⭐⭐🌟",
        percentage_rating: "3.7%",
      },
      {
        model: "bugatti Veron",
        id: idGEn(),
        qty: 1,
        year: 2022,
        price: 36000,
        image: "/NewArrivalCarImage/car8.jpg",
        description:
          "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt reprehender" +
          "it voluptates itaque perferendis placeat nisi quia odio rem recusandae perspic" +
          "iatis velit sint, dolorum illo excepturi commodi quod eius laboriosam aperiam.",
        rating: "⭐⭐⭐⭐🌟",
        percentage_rating: "4.7%",
      },
    ],
    [],
  );

  const [isBuy, setIsBuy] = useState<boolean[]>(
    Array(Store.length).fill(false),
  );
  const [ShowSelected, setShowSelected] = useState<boolean>(false);
  const [Selected, setSelected] = useState<undefined | new_productStoreType>(
    undefined,
  );

  //buy icon handler
  const handleBuy: (index: number) => void = (index) => {
    //spin the icon
    const icon: NodeListOf<Element> = document.querySelectorAll(".plus");
    const selectedItem = Store.find((_item, itemindex) => itemindex === index);
    if (selectedItem) {
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
  //  handler to manage viewing cards
  const Choose = useCallback(
    (index: number) => (index: number) => {
      if (Store.length > 0) {
        const select = Store.find((item, i) => index === i);
        if (select) setSelected(select);
      }
    },
    [Store],
  );

  const cards = useMemo(
    () =>
      Store.map((item, index) => {
        return (
          <li
            key={index}
            className=' cards group p-2 m-3 h-auto md:w-[20rem] rounded flex flex-col hover:transition-all duration-500 hover:scale-95 hover:shadow-slate-700 shadow-md '>
            <button
              type='button'
              onClick={() => {
                Choose(index);
                setShowSelected(true);
              }}
              className='hidden text-xl font-bold  p-3 w-[6rem] m-auto group-hover:ring-1 ring-sky-400 uppercase group-hover:block rounded-lg relative '>
              about
            </button>
            <img
              src={item.image}
              alt={`car ${index}`}
              className=' md:w-[20rem] shadow-md shadow-gray-600 md:h-[20rem] object-contain rounded-md m-auto my-2 p-1 '
            />
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
                <p className='text-black font-bold font-sans text-3xl'>
                  ${item.price}
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
                    onClick={() => handleBuy(index)}
                    className={` plus text-[2.3rem] hover:cursor-pointer text-yellow-600 -ml-9 `}
                  />
                )}
              </div>
            </div>
          </li>
        );
      }),
    [Choose, Store, isBuy],
  );
  //toggle Off view component
  const Toggle = useCallback(() => {
    setShowSelected(false);
  }, []);
  return (
    <>
      {ShowSelected ? (
        <ViewCard Selected={Selected} close={Toggle} />
      ) : (
        <div className='flex flex-col '>
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
          <div className='flex flex-wrap gap-2'>{cards}</div>
        </div>
      )}
    </>
  );
};

// view card component
export const ViewCard = memo(({ Selected, close }: viewCardPropType) => {
  return (
    <div className='flex flex-col bg-gray-600 w-full'>
      {/* close button */}
      <div className='absolute left-[120rem] top-[6rem]'>
        <IoMdClose
          className='hover:cursor-pointer bg'
          color='white'
          size={50}
          onClick={() => {
            close();
          }}
        />
      </div>

      {/* product image */}
      <a className=' mt-4' href={Selected?.image}>
        <img
          src={Selected?.image}
          alt='img'
          className=' w-[50%] h-[50rem] object-cover shadow-md m-auto hover:cursor-pointer'
        />
        <FaAngleRight className='arrow right-[25rem] ' />
        <FaAngleLeft className='arrow left-[25rem]' />
      </a>
      {/* details */}
      <div className='flex flex-col w-[50%] m-auto mb-4'>
        <h1 className='font-bold text-4xl text-neutral-500 uppercase text-center'>
          Description and Rating
        </h1>
        <p className='ViewCard_P'>
          model: id:idGEn(), qty:0,
          <span className='text-slate-400 text-xl '>
            {Selected?.model}
          </span>{" "}
        </p>
        <p className='ViewCard_P'>
          engine type:
          <span className='text-slate-400 text-xl '>{"TBA"}</span>
        </p>
        <p className='ViewCard_P'>
          year:<span className='text-slate-400 text-xl '>{Selected?.year}</span>
        </p>
        <p className='ViewCard_P'>
          Brand:<span className='text-slate-400 text-xl '>{"TBA"}</span>
        </p>
        <p className='ViewCard_P flex'>
          rating:
          <span className='text-slate-400 text-xl flex '>
            {Selected?.rating}
            {Selected?.percentage_rating}
          </span>
        </p>
        <p className='ViewCard_P flex flex-col text-center'>
          Description:
          <span className='text-slate-400 text-xl  w-[30rem] capitalize '>
            {Selected?.description}
          </span>
        </p>
      </div>
    </div>
  );
});

export default React.memo(NewProduct);
