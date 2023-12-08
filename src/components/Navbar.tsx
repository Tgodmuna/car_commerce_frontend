import { NavigateFunction, useNavigate } from "react-router-dom";
import { IoMenuSharp } from "react-icons/io5";
import { FiShoppingCart } from "react-icons/fi";
import { IoIosLogIn } from "react-icons/io";
import { FaPlaneArrival } from "react-icons/fa";
import { IoLogoModelS } from "react-icons/io";
import { RiLoginCircleLine } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import { useState } from "react";
const Navbar = () => {
  let navigate: NavigateFunction = useNavigate();
  const [isVisible, setIsvisible] = useState<boolean>(false);

  //mobile view activator
  const activateMobileview = (): void => {
    setIsvisible(!isVisible);
  };
  return (
    <nav className='flex gap-2 md:gap-0 bg-gray-900 md:space-x-4 justify-between py-2'>
      <span className='flex gap-[1rem] items-center  md:justify-normal md:gap-[4rem] py-2 md:w-[25%] w-[85vw]'>
        <img
          onClick={() => navigate("/")}
          src='https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg'
          alt='logo_'
          className='w-12 h-12 ms-1 md:ms-8 shadow-lg hover:cursor-pointer hover:animate-bounce animateTime rounded-md object-contain'
        />
        <input
          className='h-[2rem] md:h-[2.5rem] md:w-[20rem] w-[10rem] rounded-lg focus:ring focus:ring-green-300 placeholder:text-center md:text-2xl '
          type='text'
          placeholder='search car'
          name='search'
          id='search'
        />
        <button
          type='submit'
          className='md:block hidden text-white text-[22px] md:text-xl bg-red-500  md:w-[10rem] md:px-6 md:py-2 md:relative right-[3.5rem] p-1 rounded-lg  '>
          send
        </button>
        <span className='absolute md:hidden top-[24px] w-8 h-[32px]  left-[12.3rem] bg-slate-900 z-10'>
          <CiSearch className='text-cyan-300 text-3xl font-bold' />
        </span>
        <span className='flex md:hidden items-center justify-center'>
          <FiShoppingCart className='bg-transparent text-2xl text-cyan-400' />
          <span className='counter w-4 h-4 text-center text-cyan-300 m-auto justify-center  relative -left-1 top-[-1rem] '>
            2
          </span>
        </span>
      </span>

      {/*large screen menue links */}
      <ul className=' hidden md:flex justify-center gap-[13rem] items-center w-full p-5 '>
        <li
          className='uppercase text-xl text-slate-200 font-serif hover:underline hover:cursor-pointer hover:text-gray-600 '
          onClick={() => {
            navigate("/new_arrival");
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
      <ul className='md:flex hidden w-[35rem] gap-[6rem] items-center '>
        <li className='text-[3rem] text-red-500 '>
          <FiShoppingCart
            className='hover:scale-75 hover:text-white hover:cursor-pointer'
            onClick={() => navigate("cart")}
          />
        </li>
        <li>
          <IoIosLogIn
            className='text-[3rem] text-red-500 hover:scale-75 hover:text-white hover:cursor-pointer'
            title='login'
            onClick={() => navigate("/log-in")}
          />
        </li>
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
const MobileNavLink = ({ isVisible }: isVisiblePropType) => {
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
};
