import { IoMdArrowBack } from "react-icons/io";
import { HiBars2, HiMiniShoppingCart } from "react-icons/hi2";
import { FaChevronUp } from "react-icons/fa";
import { CgDetailsMore, CgProfile } from "react-icons/cg";
import { RiAiGenerate, RiLogoutCircleRLine } from "react-icons/ri";
import { PiKeyReturnThin } from "react-icons/pi";
import { useState } from "react";
import {
  MdFormatListNumbered,
  MdManageHistory,
  MdOutlineAddCircleOutline,
} from "react-icons/md";
import { GrStatusUnknown } from "react-icons/gr";
import { IoAnalytics } from "react-icons/io5";

type Props = {};

const DashBoard = (props: Props) => {
  return <section className="w-full  " >DashBoard</section>;
};

export default DashBoard;

//sidebar component
export const Sidebar = () => {
  const [Isexpanded, setIsexpanded] = useState(true);
  //handle sidebar
  const handleExpansion: () => void = () => {
    setIsexpanded(!Isexpanded);
  };
  return (
    <section
      className={`flex flex-col ex rounded-e-2xl pt-2 text-neutral-300 justify-between bg-gray-900 items-center  ${
        Isexpanded
          ? "w-[23rem] transition-all "
          : "w-[5rem] transition-all "
      } h-screen  border border-slate-100`}>
      {Isexpanded ? (
        <div className='flex items-center justify-between w-full h-[4rem] '>
          <img
            // onClick={() => navigate("/")}
            src='https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg'
            alt='logo_'
            className='w-12 h-12 ml-1 shadow-lg hover:cursor-pointer hover:animate-bounce animateTime rounded-md object-contain'
          />
          <span className='text-2xl text-cyan-400'>Dashboard</span>
          <span>
            <IoMdArrowBack
              size={40}
              className='hover:text-cyan-400 cursor-pointer'
              onClick={handleExpansion}
            />
          </span>
        </div>
      ) : (
        <div className='flex flex-col items-center gap-3 w-full h-[4rem] transition-all duration-500'>
          <img
            // onClick={() => navigate("/")}
            src='https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg'
            alt='logo_'
            className='w-12 h-12 ml shadow-lg hover:cursor-pointer hover:animate-bounce animateTime rounded-md object-contain'
          />
          <span>
            <HiBars2
              size={40}
              className='hover:text-cyan-400'
              onClick={handleExpansion}
            />
          </span>
        </div>
      )}

      {/* menus */}
      {Isexpanded ? (
        <ul className='flex flex-col w-full gap-[2rem] justify-center items-center h-[35rem] p-2'>
          <li className='sidebarMenue group z-10'>
            <div>
              <HiMiniShoppingCart size={40} className='text-cyan-400' />{" "}
              <span className='font-extralight'>orders</span>{" "}
              <FaChevronUp
                className={`ml-[7rem] group-hover:rotate-180 transition-all duration-500 text-cyan-400`}
                size={30}
              />
            </div>
            <ul className='order_content group-hover:h-[30rem]'>
              <li>order-list</li>
              <li>order-details</li>
              <li>order-status</li>
              <li>add-new order</li>
              <li>edit and mng order</li>
              <li>order-analytics</li>
            </ul>
          </li>
          {/* profile */}
          <li className='sidebarMenue group z-10'>
            <div>
              <CgProfile size={40} className='text-cyan-400' />{" "}
              <span className='font-extralight'>profile</span>
              <FaChevronUp
                className={`ml-[7rem] group-hover:rotate-180 transition-all duration-500 text-cyan-400`}
                size={30}
              />
            </div>
            <ul className='order_content'>
              <li>transaction settings</li>
              <li>profile settings</li>
              <li>view profile details</li>
              <li>profile status</li>
            </ul>
          </li>
          {/* receipt generation */}
          <li className='sidebarMenue group z-10 -ms-4'>
            <div>
              <RiAiGenerate size={40} className='text-cyan-400 -ms-[1.5rem]' />{" "}
              <span className='font-extralight'>receipt generation</span>
            </div>
          </li>
          {/* Return and Refund Handling: */}
          <li className='sidebarMenue group z-10 '>
            <div>
              <PiKeyReturnThin
                size={40}
                className='text-cyan-400 -ms-[1.5rem]'
              />
              <span className='font-extralight'>Return and Refund</span>{" "}
            </div>
          </li>
        </ul>
      ) : (
        <ul className='flex flex-col w-full mt-[5rem] gap-[4rem] g  items-center h-full p-2'>
          <li className=' group z-10'>
            <div className='flex justify-center items-center'>
              <HiMiniShoppingCart
                size={40}
                className='text-cyan-400 group-hover:text-cyan-200 group-hover:scale-110 transition-all'
              />
              <FaChevronUp
                className={`group-hover:rotate-180 transition-all duration-500 text-neutral-700-400`}
                size={20}
              />
            </div>
            <ul className=' shrinked_menue_ul'>
              <MdFormatListNumbered size={30} />
              <CgDetailsMore size={30} />
              <GrStatusUnknown size={30} />
              <MdOutlineAddCircleOutline size={30} />
              <MdManageHistory size={30} />
              <IoAnalytics size={30} />
            </ul>
          </li>
          {/* profile */}
          <li className=' group z-10'>
            <div className='flex justify-center items-center'>
              <CgProfile
                size={40}
                className='text-cyan-400 group-hover:text-cyan-200 group-hover:scale-110 transition-all'
              />
              <FaChevronUp
                className={`group-hover:rotate-180 transition-all duration-500 text-neutral-700-400`}
                size={20}
              />
            </div>
            <ul className=' shrinked_menue_ul'>
              <li>a</li>
              <li>a</li>
              <li>a</li>
              <li>a</li>
            </ul>
          </li>
          {/* receipt generation */}
          <li className=' group z-10 ms-[-1rem] border-t border-t-cyan-400 '>
            <RiAiGenerate
              size={40}
              className='text-cyan-400 group-hover:text-cyan-200 group-hover:scale-110 transition-all'
            />
          </li>
          {/* Return and Refund Handling: */}
          <li className=' group z-10 ms-[-1rem] border-t border-t-cyan-400 '>
            <PiKeyReturnThin
              size={40}
              className='text-cyan-400 group-hover:text-cyan-200 group-hover:scale-110 transition-all '
            />
          </li>
        </ul>
      )}

      {/* log out button */}
      <div className='flex flex-col w-full h-auto justify-center items-center'>
        {Isexpanded ? (
          <button
            className='flex items-center text-3xl uppercase hover:text-cyan-400 p-3 rounded-lg w-[12rem] bg-gray-950'
            type='button'>
            <span className='block'>
              <RiLogoutCircleRLine size={40} className='' />
            </span>
            logout
          </button>
        ) : (
          <span className='block mb-5'>
            <RiLogoutCircleRLine
              size={30}
              className='hover:text-cyan-400 animate-ping '
            />
          </span>
        )}
      </div>
    </section>
  );
};
