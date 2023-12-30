import React, { useState, useContext, useEffect, useRef } from "react";
import { productCardPropType } from "./TypeStore";
import { Link } from "react-router-dom";
import { CartContext } from "../App";
import { GrDeliver, GrHome } from "react-icons/gr";
import { FaCartArrowDown, FaTimes } from "react-icons/fa";

const ProductCard = ({ Selected, close }: productCardPropType) => {
  const [image, setimage] = useState<string | undefined>("");
  const Cart = useContext(CartContext);
  const buttonRef = useRef<HTMLButtonElement>(null);

  //image selection handler
  const handleSelection = (index: number) => {
    if (Selected) {
      let { images } = Selected;
      const selectedimg = images.find((_Src, SrcIndex) => SrcIndex === index);
      selectedimg && setimage(selectedimg);
    }
  };
  useEffect(() => {
    if (Selected && Cart?.cart.includes(Selected)) {
      buttonRef.current!.disabled = true;
      buttonRef.current!.style.cursor = "not-allowed";
      buttonRef.current!.textContent = "added";
      buttonRef.current!.style.opacity = "0.2";
    }
  }, [Cart?.cart, Selected]);
  return (
    <section
      className={`productCard bg-gray-100 h-full z-20 flex flex-col  justify-between items-center gap-3 absolute w-full`}>
      <FaTimes
        className='text-[40px] text-black relative left-[60rem] top-[2rem] hover:text-red-500'
        onClick={close}
      />
      {/* first child */}
      <div className=' firstChild flex gap-3 p-3 w-full bg-transparent my-2'>
        {/* product sample images */}
        <div className=' product_sample_Image w-[6rem] p-2 h-auto bg-slate-400 bg-opacity-40 flex flex-col gap-3 justify-center items-center border-2 border-gray-300'>
          {Selected?.images.map((img, imgIndex) => {
            return (
              <img
                className='w-[6rem] cursor-pointer h-[6rem] object-contain rounded-xl m-auto '
                src={`https://car-backend-23tq.onrender.com${img}`}
                alt={`img${imgIndex}`}
                onClick={() => {
                  handleSelection(imgIndex);
                }}
              />
            );
          })}
        </div>

        {/* full image and details */}
        <div className='mainProduct_details bg-transparent  flex justify-between w-[75vw] max-w-[100vw]'>
          {/* image */}
          <a
            href={
              image
                ? `https://car-backend-23tq.onrender.com${image}`
                : `https://car-backend-23tq.onrender.com${Selected?.images[0]}`
            }>
            <img
              src={
                image
                  ? `https://car-backend-23tq.onrender.com${image}`
                  : `https://car-backend-23tq.onrender.com${Selected?.images[0]}`
              }
              alt={`img${Selected?.images[0]}`}
              className={`w-[40rem] rounded-xl hover:shadow-lg  hover:shadow-slate-100  max-h-[40rem] object-cover m-2 max-w-[100%]`}
            />
          </a>

          {/* details */}
          <div className='details bg-transparent w-[40vw] h-fit  flex justify-center items-start flex-col gap-2 m-2  p-2 '>
            <h1 className=' productName text-2xl text-neutral-600 font-bold capitalize  my-1 w-auto max-w-[20rem] '>
              {Selected?.name}
              {Selected?.model}
            </h1>
            <p className='Rating w-auto'>
              <span className='text-blue-600'>
                ({Selected?.percentage_rating} customers reviewed)
              </span>
            </p>
            <h3 className=' price text-neutral-600 text-xl font-semibold w-auto'>
              {Selected?.price.toLocaleString("en-US", {
                style: "currency",
                currency: "NGN",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </h3>
            <Link
              to={"jknsjknskjn"}
              className='text-sm underline text-blue-800 w-auto'>
              {" "}
              limited life time warranty
            </Link>
            <p className='w-[18rem] whites whitespace-pre-wrap text-start text-neutral-700 bg-yellow p-2'>
              {Selected?.details}
            </p>
            <p
              className={` max-w-[10rem] uppercase font-bold ${
                Selected?.availability ? "bg-green-700 before" : "bg-red-700"
              }] rounded-md p-2 text-white text-center`}>
              {Selected?.availability ? "2 available" : "out of stock"}
            </p>
            <input
              placeholder='quantity'
              type='number'
              name='quantity'
              onChange={(e) => {
                const value = parseInt(e.target.value, 10);
                Selected!.quantity = value;
              }}
              className={`w-[8rem] text-center p-3 rounded-md border-2 border-cyan-500`}
            />
            <p className='text-xl text-neutral-600 font-bold uppercase mb-[-1.4rem]'>
              select delivery option:
            </p>

            <div className='flex flex-col  justify-between items-center w-[40rem] p-2 '>
              <div className='flex w-full justify-between gap-3  items-center p-2 m-2'>
                <div className='flex gap-2 justify-center items-center cursor-pointer group hover:scale-105 duration-500 h-[3rem] w-[50%] rounded-md bg-black'>
                  <GrDeliver className='bg-inherit text-cyan-400 text-[30px]  group-hover:text-white' />

                  <p className='text-cyan-400  font-semibold bg-inherit uppercase group-hover:text-white'>
                    free stop pickup
                  </p>
                </div>
                <div className='flex gap-2 justify-center items-center cursor-pointer  group hover:scale-105 duration-500 h-[3rem] w-[50%] rounded-md bg-black'>
                  <GrHome className='bg-inherit text-cyan-400 text-[30px]  group-hover:text-white' />

                  <p className='text-cyan-400  font-semibold bg-inherit uppercase group-hover:text-white'>
                    Home delivery
                  </p>
                </div>
              </div>

              <button
                onClick={(e) => {
                  if (Cart && Selected) {
                    if (Cart.cart.includes(Selected)) {
                      e.currentTarget.disabled = true;
                      e.currentTarget.textContent = "Added";
                      e.currentTarget.style.cursor = "not-allowed";
                      e.currentTarget.style.opacity = "0.2";
                      alert("in the cart already");
                    } else {
                      Cart.cartModifier((prev) => {
                        const newCarr = [...prev, Selected];
                        e.currentTarget.textContent = "Added";
                        e.currentTarget.disabled = true;
                        return newCarr;
                      });
                    }
                  }
                }}
                ref={buttonRef}
                type='button'
                className='w-full p-3 group bg-black hover:text-white hover:scale-105 duration-500 uppercase rounded-md cursor-pointer text-cyan-400 text-2xl font-extrabold  flex justify-center items-center gap-2'>
                <span className='w-fit '> Add to cart</span>
                <FaCartArrowDown className='text-[30px]' />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* second child */}
      <div className='flex gap-3 items-center'>
        <div className="product_spec "></div>
        <div></div>
      </div>
      <div className=' flex gap-[2rem]'></div>
    </section>
  );
};

export default ProductCard;
