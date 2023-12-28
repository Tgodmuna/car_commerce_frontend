import React, { useContext, useEffect, useState } from "react";
import Navbar from "./Navbar";
import { CartContext } from "../App";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import Swipe from "react-easy-swipe";
import AllProducts from "./AllProducts";

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
          home: "/",
        }}
        IsLoggedIn={false}
      />
      <HeroBanner />
      <AllProducts />
    </div>
  );
};

export default Home;

//Hero banner
const HeroBanner = () => {
  const CarouselData = [
    {
      image:
        "https://m.atcdn.co.uk/vms/media/%7Bresize%7D/d945eb9d576348c3824d48dc5fc9abd7.jpg",
    },
    {
      image:
        "https://www.motortrend.com/uploads/2023/01/2023-Mercedes-Benz-AMG-GT63-4-Door-Coupe-1.jpg",
    },
    {
      image:
        "https://images.hindustantimes.com/auto/img/2022/01/03/1600x900/Audi_Q5_2021_1634618582184_1641183750841.jpg",
    },
    {
      image:
        "https://www.mazdausa.com/siteassets/vehicles/2024/cx-5/new-build--price/trims/ext.-360s/2.5-s-select/51k/e360-my24-cx50-selectpackage-rhodiumwhite-016.jpg",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!paused) {
        setCurrentSlide((prevSlide) =>
          prevSlide === CarouselData.length - 1 ? 0 : prevSlide + 1,
        );
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [CarouselData.length, paused]);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === CarouselData.length - 1 ? 0 : prevSlide + 1,
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? CarouselData.length - 1 : prevSlide - 1,
    );
  };

  const handleMouseEnter = () => {
    setPaused(true);
  };

  const handleMouseLeave = () => {
    setPaused(false);
  };

  const handleDotClick = (index: React.SetStateAction<number>) => {
    setCurrentSlide(index);
  };

  return (
    <div className='mt-8'>
      <div className='w-full h-full flex overflow-hidden relative'>
        <AiOutlineLeft
          onClick={prevSlide}
          className='absolute left-0 text-3xl inset-y-1/2 text-white cursor-pointer'
        />

        <Swipe onSwipeLeft={nextSlide} onSwipeRight={prevSlide}>
          {CarouselData.map((slide, index) => (
            <div key={index} className='relative w-[100vw] m-auto'>
              <img
                src={slide.image}
                alt='This is a carousel slide'
                className={
                  index === currentSlide
                    ? "block w-full h-full object-cover m-auto"
                    : "hidden"
                }
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              />
              {index === currentSlide && (
                <div className='absolute right-0 top-72 mr-12 transform -translate-y-1/2 p-4 text-white'>
                  <div>
                    <p className='font-bold text-9xl text-white'>
                      Explore to our related product
                    </p>
                    <div>
                      <h1 className='font-semibold text-5xl text-neutral-600'>
                        Shop the best product for your home
                      </h1>
                    </div>
                    <button
                      type='button'
                      className='bg-indigo-500 text-white text-xl w-[10rem] h-[4rem] rounded-lg p-3'>
                      Explore Product
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </Swipe>

        <div className='absolute w-full flex justify-center bottom-0'>
          {CarouselData.map((element, index) => (
            <div
              className={
                index === currentSlide
                  ? "h-2 w-2 bg-blue-700 rounded-full mx-2 mb-2 cursor-pointer"
                  : "h-2 w-2 bg-white rounded-full mx-2 mb-2 cursor-pointer"
              }
              key={index}
              onClick={() => handleDotClick(index)}></div>
          ))}
        </div>

        <AiOutlineRight
          onClick={nextSlide}
          className='absolute right-0 text-3xl inset-y-1/2 text-white cursor-pointer'
        />
      </div>
      <TopCategory />

      <h1 className='text-6xl text-center w-full text-neutral-600 font-bold'>
        Featured Products
      </h1>
      <div className='featured bg-cyan-100 products border-[3px] py-7 mb-[4rem] rounded-lg border-cyan-100 flex justify-around'>
        <img
          src='FeaturedImages/INKAS.png'
          alt='featured product1'
          className='w-[20rem] h-[20rem] rounded-md bg-slate-200'
        />
        <img
          src='FeaturedImages/STREIT.jpeg'
          alt='featured product2'
          className='w-[20rem] h-[20rem] rounded-md bg-slate-200'
        />
        <img
          src='FeaturedImages/TAG.jpeg'
          alt='featured product3'
          className='w-[20rem] h-[20rem] rounded-md bg-slate-200'
        />
      </div>
    </div>
  );
};

//top catergories
function TopCategory() {
  const topCategory = [
    {
      image:
        "https://cdn.punchng.com/wp-content/uploads/2020/09/04221815/Davido.jpg",
      name: "Davido",
    },

    {
      image:
        "https://wallpapers.com/images/hd/messi-pictures-jzykf84saw6wbkd6.jpg",
      name: "Messi",
    },

    {
      image:
        "https://thumbs.dreamstime.com/b/tom-hanks-los-angeles-ca-january-people-s-choice-awards-microsoft-theatre-l-live-170568542.jpg",
      name: "Tom Hanky",
    },
    {
      image:
        "https://st4.depositphotos.com/21607914/24089/i/450/depositphotos_240895602-stock-photo-usain-bolt-jamaica-reacts-winning.jpg",
      name: "Usian Bolt",
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section className='bg-gray-200 py-8 mt-4  w-full'>
      <div className=' flex w-full justify-between items-center m-2 p-2'>
        <p className='text-5xl  text-neutral-700 font-bold mb-4 md:mb-0'>
          Top Celebrity with our Goods
        </p>
        <button
          type='button'
          onClick={openModal}
          className='bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-700'>
          View All
        </button>
      </div>

      <div className='flex  w-full bg-black justify-between items-center p-2 '>
        <div className='relative rounded-lg p-4'>
          <div className='relative aspect-w-2 aspect-h-3'>
            <img
              src='https://cdn.britannica.com/61/137461-050-BB6C5D80/Brad-Pitt-2008.jpg'
              alt='Brad Pitt'
              className='object-cover rounded-lg shadow-lg'
            />
          </div>

          <div className='absolute inset-0 flex items-center justify-center'>
            <p className='text-lg font-semibold text-white bg-black bg-opacity-50 p-2 rounded-lg'>
              Brad Pitt
            </p>
          </div>
        </div>

        <div className='relative rounded-lg p-4'>
          <div className='relative aspect-w-2 aspect-h-3'>
            <img
              src='https://cdn.britannica.com/55/244255-050-478C8681/Supermodel-Naomi-Campbell-New-York-2021.jpg'
              alt='Brad Pitt'
              className='object-cover rounded-lg shadow-lg'
            />
          </div>

          <div className='absolute inset-0 flex items-center justify-center'>
            <p className='text-lg font-semibold text-white bg-black bg-opacity-50 p-2 rounded-lg'>
              Naomi Campbell
            </p>
          </div>
        </div>

        <div className='relative rounded-lg p-4'>
          <div className='relative aspect-w-2 aspect-h-3'>
            <img
              src='https://i.insider.com/62ea6b00c6987600183c623c?width=1136&format=jpeg'
              alt='Brad Pitt'
              className='object-cover rounded-lg shadow-lg'
            />
          </div>

          <div className='absolute inset-0 flex items-center justify-center'>
            <p className='text-lg font-semibold text-white bg-black bg-opacity-50 p-2 rounded-lg'>
              Richard Bradson
            </p>
          </div>
        </div>
      </div>

      <div>
        {isModalOpen && (
          <div className=''>
            <div className='bg-white p-6 rounded-lg shadow-lg mt-8'>
              <div className='text-center'>
                <h2 className='text-2xl font-semibold mb-4 md:mb-4'>
                  Top Celebrities
                </h2>
              </div>
              <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                {topCategory.map((celebrity, index) => (
                  <div key={index} className='relative'>
                    <img
                      src={celebrity.image}
                      alt={celebrity.name}
                      className='object-cover rounded-lg shadow-lg h-48'
                    />
                    <p className='text-center absolute inset-x-0 bottom-0 bg-white bg-opacity-75 text-black p-2 rounded-lg'>
                      {celebrity.name}
                    </p>
                  </div>
                ))}
              </div>
              <div className='text-center mt-4'>
                <button
                  onClick={closeModal}
                  className='bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600'>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
