import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa6";
import { Link } from "react-router-dom";

type Props = {};

const Home = (props: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
      setIsModalOpen(!isModalOpen);
    };

    const closeModal = () => {
      setIsModalOpen(false);
    };
  const carBrands = [
    {
      image: "https://cdn.mos.cms.futurecdn.net/WpcTavg99b5XpK6STzSLZ8.jpg",
      brand: "Toyota",
    },
    {
      image:
        "https://static.vecteezy.com/system/resources/previews/020/336/706/non_2x/honda" +
        "-logo-honda-icon-free-free-vector.jpg",
      brand: "Honda",
    },
    {
      image:
        "https://hips.hearstapps.com/hmg-prod/images/nissan-brand-logo-1200x938-1594842" +
        "787.jpg",
      brand: "Nissan",
    },
    {
      image:
        "https://static.vecteezy.com/system/resources/thumbnails/020/109/206/small/ford" +
        "-black-logo-free-download-free-vector.jpg",
      brand: "Ford",
    },
    {
      image:
        "https://i.pinimg.com/originals/e1/34/06/e134063bcdee260fcb8f76d93dab2d56.png",
      brand: "Chevrolet",
    },
    {
      image:
        "https://thumbs.dreamstime.com/b/logo-bmw-formato-ai-aviable-di-vettore-colore-" +
        "dell-automobile-239595216.jpg",
      brand: "Bmw",
    },
    {
      image:
        "https://cdn.icon-icons.com/icons2/2402/PNG/512/mercedes_benz_logo_icon_145798." +
        "png",
      brand: " Benz",
    },
    {
      image:
        "https://www.shutterstock.com/image-photo/kiev-ukraine-march-21-2015-260nw-2697" +
        "35078.jpg",
      brand: "volksWagen",
    },
    {
      image:
        "https://www.shutterstock.com/image-vector/audi-logo-icon-metal-circle-260nw-22" +
        "69704655.jpg",
      brand: "Audi",
    },
    {
      image:
        "https://c8.alamy.com/comp/D8P8G6/hyundai-logo-as-an-app-icon-clipping-path-inc" +
        "luded-D8P8G6.jpg",
      brand: "Hyaundai",
    },
    {
      image:
        "https://www.shutterstock.com/image-photo/kiev-ukraine-may-13-2015-260nw-279228" +
        "050.jpg",
      brand: "Kia",
    },
    {
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Subaru_%282019%29.sv" +
        "g/1200px-Subaru_%282019%29.svg.png",
      brand: "Subaru",
    },
    {
      image:
        "https://i.pinimg.com/originals/21/c2/fe/21c2fe7847dbc1b098500fbe58f5ecee.jpg",
      brand: "Mazda",
    },
    {
      image:
        "https://www.shutterstock.com/image-vector/jeep-automobile-logo-vector-editoria" +
        "l-260nw-2342396215.jpg",
      brand: "Jeep",
    },
    {
      image: "https://c8.alamy.com/comp/HP0RBB/tesla-logo-HP0RBB.jpg",
      brand: "Tesla",
    },
    {
      image:
        "https://wallpapers.com/images/hd/lexus-logo-silver-926n2mfoxigh1xe6.jpg",
      brand: "Lexus",
    },
    {
      image: "https://assets.stickpng.com/images/580b57fcd9996e24bc43c467.png",
      brand: "Acura",
    },
    {
      image:
        "https://1000logos.net/wp-content/uploads/2020/03/Infiniti-Color.jpg",
      brand: "Inifiniti",
    },
    {
      image:
        "https://www.car-brand-names.com/wp-content/uploads/2016/01/GMC-emblem-4.jpg",
      brand: "GMC",
    },
    {
      image:
        "https://media.cadillac.com/dld/content/dam/Shared/Images/Logos/cadillac/CADILL" +
        "AC_2DCREST_POS_RGB.jpg",
      brand: "Cadillac",
    },
    {
      image:
        "https://img.freepik.com/premium-vector/ram-logo-design-vector-illustration_685" +
        "330-1891.jpg",
      brand: "Ram",
    },
    {
      image:
        "https://di-uploads-development.dealerinspire.com/kendalldodgechryslerjeepram1/" +
        "uploads/2018/01/Dodge_Logo1.jpg",
      brand: "Dodge",
    },
    {
      image:
        "https://www.shutterstock.com/image-illustration/west-java-indonesia-oktober-02" +
        "-260nw-2369632509.jpg",
      brand: "Chrysler",
    },
    {
      image:
        "https://di-uploads-pod6.dealerinspire.com/hornburgjaguarsantamonica/uploads/20" +
        "20/06/Jaguar-Symbol.jpg",
      brand: "Jaguar",
    },
    {
      image:
        "https://upload.wikimedia.org/wikipedia/en/thumb/9/9f/Land_Rover_logo_black.svg" +
        "/2560px-Land_Rover_logo_black.svg.png",
      brand: "LandRover",
    },
    {
      image: "https://thumbs.dreamstime.com/b/web-184786279.jpg",
      brand: "Porsche",
    },
    {
      image: "https://thumbs.dreamstime.com/b/web-183281416.jpg",
      brand: "Ferrari",
    },
    {
      image:
        "https://www.shutterstock.com/image-vector/vinnytsia-ukraine-october-4-2023-260" +
        "nw-2370973759.jpg",
      brand: "Lamborghini",
    },
    {
      image:
        "https://hips.hearstapps.com/hmg-prod/images/astonlogo-1658254892.jpg",
      brand: "AstonMartin",
    },
    {
      image:
        "https://cdn4.vectorstock.com/i/1000x1000/93/78/maserati-logo-brand-symbol-blue" +
        "-design-italian-car-vector-46089378.jpg",
      brand: "Maserati",
    },
    {
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Bugatti_logo.svg/256" +
        "0px-Bugatti_logo.svg.png",
      brand: "Bugatti",
    },
    {
      image:
        "https://i.pinimg.com/originals/24/b6/f5/24b6f566569797f8b6a98baacbe27856.jpg",
      brand: "AlfaRemeo",
    },
    {
      image:
        "https://www.shutterstock.com/image-vector/mini-logo-vector-editorial-transpare" +
        "nt-260nw-2340647771.jpg",
      brand: "Mini",
    },
    {
      image:
        "https://c8.alamy.com/comp/2EJ4W47/logo-of-the-car-brand-volvo-free-space-on-wh" +
        "ite-background-2EJ4W47.jpg",
      brand: "Volvo",
    },
    {
      image:
        "https://w7.pngwing.com/pngs/426/862/png-transparent-buick-symbol-logo-icons-lo" +
        "gos-emojis-car-logos.png",
      brand: "Buick",
    },
    {
      image:
        "https://upload.wikimedia.org/wikipedia/commons/b/b7/Mitsubishi-logo.png",
      brand: "Mitsubishi",
    },
    {
      image:
        "https://preview.thenewsmarket.com/Previews/GNUS/StillAssets/1920x1080/470091_v" +
        "5.jpg",
      brand: "Gnensis",
    },
    {
      image:
        "https://seeklogo.com/images/M/McLaren-logo-6D13A50642-seeklogo.com.png",
      brand: "Mclaren",
    },
    {
      image:
        "https://c8.alamy.com/comp/2D4R2GX/logo-of-the-company-bentley-manufacturer-of-" +
        "premium-class-cars-2D4R2GX.jpg",
      brand: "Bentley",
    },
    {
      image:
        "https://w0.peakpx.com/wallpaper/591/587/HD-wallpaper-rolls-royce-logo-awesome-" +
        "cool-thumbnail.jpg",
      brand: "RollRoyce",
    },
    {
      image:
        "https://c8.alamy.com/comp/BNWJ2W/a-smart-car-dealership-BNWJ2W.jpg",
      brand: "Smart",
    },
    {
      image: "https://c8.alamy.com/comp/B5M5G2/peugeot-logo-car-B5M5G2.jpg",
      brand: "Peugeot",
    },
    {
      image:
        "https://cdn1.vectorstock.com/i/1000x1000/12/60/citroen-brand-logo-car-symbol-w" +
        "ith-name-design-vector-45991260.jpg",
      brand: "Citroen",
    },
    {
      image:
        "https://cdni.autocarindia.com/ExtraImages/20210316020140_2021_RENAULT_5_new_re" +
        "nault_logo.jpg",
      brand: "Renault",
    },
    {
      image:
        "https://cdn5.vectorstock.com/i/1000x1000/19/89/dacia-brand-logo-symbol-black-d" +
        "esign-romanian-car-vector-45981989.jpg",
      brand: "Dacia",
    },
    {
      image: "https://m.media-amazon.com/images/I/818Fb5AzGBL.jpg",
      brand: "Ladakh",
    },
    {
      image:
        "https://previews.123rf.com/images/miluxian/miluxian1408/miluxian140800241/3115" +
        "4965-london-uk-november-28-2010-detail-of-skoda-logo-on-red-car.jpg",
      brand: "Skoda",
    },
    {
      image:
        "https://www.alamy.com/aggregator-api/download?url=https://c8.alamy.com/comp/2B" +
        "7CR16/seat-leon-car-logo-2B7CR16.jpg",
      brand: "Seat",
    },
    {
      image:
        "https://w7.pngwing.com/pngs/188/471/png-transparent-2015-toyota-venza-car-spor" +
        "t-utility-vehicle-2014-toyota-venza-suv-toyota-compact-car-sedan-car-thumbnail" +
        ".png",
      brand: "Venza",
    },
  ];
   const brandsPerRow = 7;

   const brandList = carBrands.map((item, index) => (
     <li
       key={index}
       className='md:my-4 my-2 flex flex-col md:flex-row  bg-red-600 text-white md:text-xl text-xs md:mx-auto w-[5rem] md:w-[40rem]'>
       <Link to={`/brands/${item.brand.toLowerCase()}`}>
         <div className='flex items-center space-x-2'>
           <img
             src={item.image}
             alt={item.brand}
             className=' w-[2rem] md:w-[4rem] h-[2rem] md:h-[4rem] object-contain rounded-full'
           />
           <p className='md:text-lg text-xs font-semibold md:font-bold'>{item.brand}</p>
         </div>
       </Link>
     </li>
   ));
  
    const rows = [];
    for (let i = 0; i < brandList.length; i += brandsPerRow) {
      rows.push(
        <div
          key={i / brandsPerRow}
          className='flex  w-[100vw] px-2 md:flex-row gap-2 md:gap-2'>
          {brandList.slice(i, i + brandsPerRow)}
        </div>,
      );
  }
  
  return (
    <div>
      <div className='flex space-x-4 justify-between py-2 px-4 mt-2'>
        {/* brand */}
        <div
          onClick={() => {
            openModal();
          }}
          className='cursor-pointer hidden md:flex items-center bg-gray-300 hover:bg-black-700  rounded-full py-3 px-6 space-x-2 text-blue-500'>
          <p className='text-xl font-semibold'>Brands</p>
          <FaArrowDown
            className={`${isModalOpen ? " transform -rotate-180" : ""}`}
          />
        </div>
     
      </div>
      {isModalOpen && (
        <>
          <ul className='w-[100vw] hidden md:block m-auto bg-black  h-[100vw] bg-opacity-95 absolute z-20'>
            {rows}
          </ul>
          <FaTimes
            fontSize='large'
            className=' hover:bg-black absolute  hover:text-white  top-[9rem] z-20 bg-gray-400 rounded-lg font-bold text-white right-2 cursor-pointer'
            onClick={closeModal}
          />
        </>
      )}
      
    </div>
  );
};

export default Home;
