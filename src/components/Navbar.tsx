import { NavigateFunction, useNavigate } from "react-router-dom";
import { IoMenuSharp } from "react-icons/io5";
import { FiShoppingCart } from "react-icons/fi";
import { IoIosLogIn } from "react-icons/io";
import { FaPlaneArrival } from "react-icons/fa";
import { IoLogoModelS } from "react-icons/io";
import { RiLoginCircleLine } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import React, { memo, useEffect, useState } from "react";

const Navbar: React.FC<{
  cartQuantity: () => number | undefined;
  paths: {
    newProducts: "/new_arrival" | "/dashboard/new_arrival";
    newModels: "";
    latestModel: "";
    cart: "/checkout" | "/dashboard/checkout";
    home: "/" | "/dashboard";
  };
  IsLoggedIn: boolean;
  width?: number;
  handleOutlet?: () => void;
}> = ({ cartQuantity, paths, IsLoggedIn, width, handleOutlet }) => {
  const [cartTotalLen, SetcartTotalLen] = useState<number | undefined>(0);

  let navigate: NavigateFunction = useNavigate();
  const [isVisible, setIsvisible] = useState<boolean>(false);
  useEffect(() => SetcartTotalLen(cartQuantity), [cartQuantity]);

  //mobile view handler
  const activateMobileview = (): void => {
    setIsvisible(!isVisible);
  };
  return (
    <nav
      className={` z-20 top-0  flex gap-2 md:gap-0 bg-gray-900 items-center justify-between py-2 md:px-2 mt-0 w-auto md:w-[${width}vw]`}>
      {/* logo and search bar */}
      <span className='flex gap-[1rem] items-center  md:items-center md:justify-between  md:gap-[0.5rem] py-2 md:w-auto md:max-w-[20%] w-[85vw]'>
        <img
          onClick={() => navigate(paths.home)}
          src='https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg'
          alt='logo_'
          className='max-w-12 w-auto  h-12 ms-1  shadow-lg hover:cursor-pointer hover:animate-bounce animateTime rounded-md object-contain'
        />
        <input
          className='h-[2rem] md:h-[2.5rem]  md:max-w-[15rem] w-auto rounded-lg focus:ring focus:ring-green-300 placeholder:text-center md:text-xl '
          type='text'
          placeholder='search car'
          name='search'
          id='search'
        />
        <button
          type='submit'
          className='md:block hidden text-white text-[22px] md:text-[15px] bg-red-500  md:w-[5rem] md:px-4 md:py-2 md:relative right-[3.5rem] p-1 rounded-lg  '>
          send
        </button>
        <span className='absolute md:hidden top-[24px] w-8 h-[32px]  left-[12.3rem] bg-slate-900 z-10'>
          <CiSearch className='text-cyan-300 text-3xl font-bold' />
        </span>

        <span
          className='flex md:hidden items-center justify-center'
          onClick={() => navigate("/CheckOut")}>
          <FiShoppingCart className='bg-transparent text-2xl text-cyan-400' />
          <span className='counter w-4 h-4 text-center text-cyan-300 m-auto justify-center  relative -left-1 top-[-1rem] '>
            {cartTotalLen}
          </span>
        </span>
      </span>

      {/*large screen menue links */}
      <ul className=' hidden md:flex justify-between flex-nowrap  w-[60rem] max-w-[60rem] items-center p-5'>
        <li
          className='uppercase text-xl text-slate-200 font-serif hover:underline hover:cursor-pointer hover:text-gray-600 '
          onClick={() => {
            navigate(paths.newProducts);
          }}>
          new arrival
        </li>
        <li className='uppercase text-xl text-slate-200 font-serif hover:underline hover:cursor-pointer hover:text-gray-600'>
          new Models
        </li>
        <li className='uppercase text-xl text-slate-200 font-serif hover:underline hover:cursor-pointer hover:text-gray-600 '>
          Latest Model
        </li>
      </ul>
      {/* mobile menu activate icon */}
      <span className='md:hidden '>
        <IoMenuSharp
          className='text-[4rem] text-cyan-300'
          onClick={() => activateMobileview()}
        />
      </span>

      {/* larger screen navbar icons */}
      <ul className='md:flex hidden w-[10rem] max-w-[15rem]  p-2  justify-between items-center  '>
        <li className='text-[3rem] text-red-500 flex '>
          <FiShoppingCart
            className='hover:scale-75 hover:text-white hover:cursor-pointer'
            onClick={() => {
              if (handleOutlet) handleOutlet();
              navigate(paths.cart);
            }}
          />
          <span className='counter w-4 h-4 text-center text-[20px] text-red-300 m-auto justify-center  relative -left-2 top-[-30px] '>
            {cartTotalLen}
          </span>
        </li>
        {/* if the user is loggedIn show not the loggin button or else */}
        {!IsLoggedIn && (
          <li>
            <IoIosLogIn
              className='text-[3rem] text-red-500 hover:scale-75 hover:text-white hover:cursor-pointer'
              title='login'
              onClick={() => navigate("/sign-in")}
            />
          </li>
        )}
      </ul>
      <MobileNavLink isVisible={isVisible} />
    </nav>
  );
};
export default Navbar;

type isVisiblePropType = {
  isVisible: boolean;
};

//mobile navMenu
const MobileNavLink = memo(({ isVisible }: isVisiblePropType) => {
  let navigate: NavigateFunction = useNavigate();

  return (
    <div
      className={`md:hidden bg-gray-900 w-[17rem] h-full top-[80px] z-50  absolute ${
        isVisible
          ? "translate-x-[5.5rem] block transform transition-transform bg-opacity-95 ease-in-out opacity-100 duration-1000"
          : "translate-x-[29rem] transform transition-all opacity-10  duration-1000 hidden"
      } h-[30rem] top-[6rem]`}>
      <ul className='flex flex-col justify-center gap-[3rem] items-center w-full p-5'>
        <li
          className='mobileNavlinkStyle'
          onClick={() => {
            navigate("/new_arrival");
          }}>
          <FaPlaneArrival size={30} className='text-cyan-300' />
          new arrival
        </li>
        <li className='mobileNavlinkStyle'>
          <IoLogoModelS size={30} className='text-cyan-300' />
          new Models
        </li>
        <li className='mobileNavlinkStyle' onClick={() => navigate("log-in")}>
          <RiLoginCircleLine size={30} className='text-cyan-300' />
          Log in
        </li>
      </ul>
    </div>
  );
});
