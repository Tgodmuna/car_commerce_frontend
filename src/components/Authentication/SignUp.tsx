import React, { ChangeEvent, useEffect, useState } from "react";
import { formType, messageType } from "../TypeStore";
import axios from "axios";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

type Props = {};

const SignUp = (props: Props) => {
  const navigate = useNavigate();
  const [Formstate, setFormstate] = useState<formType>({
    fullName: "",
    Email: "",
    userName: "",
    password: "",
    checked: false,
  });
  const [message, setMessage] = useState<messageType>({
    success: {
      successMessage: "",
      successStatusCode: undefined,
    },
    error: {
      errorMessage: "",
      errorStatusCode: undefined,
    },
  });
  // form handler
  const handleInputs: (e: ChangeEvent<HTMLInputElement>) => void = (e) => {
    const inputValue: string = e.target.value;
    const inputName: string = e.target.name;
    setFormstate((prevFormState) => ({
      ...prevFormState,
      [inputName]: inputValue,
    }));
  };
  //submit handler
  const HandleSubmit: () => void = () => {
    const Data: formType = Formstate;
    axios
      .post("https://car-backend-23tq.onrender.com/register", Data)
      .then((successRes) => {
        setMessage({
          ...message,
          success: {
            ...message.success,
            successMessage: successRes.data.message,
            successStatusCode: successRes.status,
          },
        });
        if (successRes.status === 200) {
          const token = successRes.data.token;
          const serializedData = JSON.stringify(token);
          localStorage.setItem("userToken", serializedData);
        }
        if (successRes.status === 200)
          setTimeout(() => {
            navigate("/sign-in");
          }, 3000);
        console.log(successRes);
      })
      .catch((err) => {
        if (err.response)
          setMessage((prevstate) => ({
            ...prevstate,
            error: {
              ...prevstate.error,
              errorMessage: err.message,
              errorStatusCode: err.response.status,
            },
          }));
        console.log(err);
      });
  };

  //hideLabel
  const hidelabel: (index: number) => void = (index) => {
    const input = document.getElementsByTagName("input")[
      index
    ] as HTMLInputElement;
    const label = document.getElementsByTagName("label")[
      index
    ] as HTMLLabelElement;
    input.value !== ""
      ? (label.style.visibility = "hidden")
      : (label.style.visibility = "visible");
  };

  return (
    <form
      onSubmit={(e) => {
        HandleSubmit();
        e.preventDefault();
      }}
      className='bg-gray-950 p-3 w-full lg:w-[80vw] h-screen  m-auto md:my-[1rem]'>
      {/* message */}
      <Notification message={message} />

      {/* first */}
      <div className=' flex flex-wrap md:flex-nowrap  w-full md:w-full h-[20rem] m-auto md:mt-[2rem]  divide-y-2 md:divide-y-0 md:divide-x-2 divide-x-0 divide-cyan-500'>
        <div className=' p-2 flex-col flex items-center justify-center w-full h-full m-auto'>
          <input
            className='inputStyle peer'
            type='text'
            name='fullName'
            id='fullName'
            onChange={(e) => handleInputs(e)}
            value={Formstate.fullName}
            onInput={() => hidelabel(0)}
          />
          <label htmlFor='fullName' className='InputlabelStyle'>
            fullName
          </label>
        </div>
        <div className=' p-2 flex-col flex items-center justify-center w-full h-full m-auto'>
          <input
            className='inputStyle peer mt-[3rem]'
            type='email'
            name='Email'
            id='email'
            onChange={(e) => handleInputs(e)}
            value={Formstate.Email}
            onInput={() => hidelabel(1)}
          />
          <label htmlFor='email' className='InputlabelStyle '>
            email
          </label>
        </div>
      </div>
      {/* second */}
      <div className=' z-13 flex flex-wrap md:flex-nowrap bg-transparent w-full md:w-full m-auto h-[20rem] divide-y-2 md:divide-y-0 md:divide-x-2 divide-x-0 divide-cyan-500'>
        <div className=' p-2 flex-col flex items-center justify-center w-full h-full m-auto'>
          <input
            className='inputStyle peer'
            type='text'
            name='userName'
            id='userName'
            onChange={(e) => handleInputs(e)}
            value={Formstate.userName}
            onInput={() => hidelabel(2)}
          />
          <label htmlFor='userName' className='InputlabelStyle '>
            userName
          </label>
        </div>
        <div className=' p-2 flex-col flex items-center justify-center w-full h-full m-auto'>
          <input
            className='inputStyle peer'
            type='password'
            name='password'
            id='pasw'
            onChange={(e) => handleInputs(e)}
            value={Formstate.password}
            onInput={() => hidelabel(3)}
          />
          <label htmlFor='pasw' className='InputlabelStyle '>
            password
          </label>
        </div>
      </div>
      {/* third */}
      <div className='flex md:flex-row flex-col items-center justify-center gap-[1.3rem] w-full md:border-2 md:border-x-transparent md:border-b-transparent border-cyan-500 md:pt-4'>
        <button
          // onSubmit={HandleSubmit}
          className=' hover:ring-2 shadow-md hover:shadow-slate-200 ring-slate-900 rounded-lg p-2 w-[7rem] bg-white text-xl uppercase hover:bg-cyan-500 hover:text-white'
          type='submit'>
          Submit
        </button>

        <div className=''>
          <p className='text-cyan-300 text-center text-xl capitalize'>
            already have an account?{" "}
            <span className='text-cyan-400 text-xl ml-2'>
              <Link to={"sign-in"}>Sign in</Link>
            </span>
          </p>
        </div>
      </div>
    </form>
  );
};

export default SignUp;

//toast notication
type NotificationProp = {
  message: messageType;
};
const Notification = ({ message }: Partial<NotificationProp>) => {
  const [IsSuccessful, setIsSuccessful] = useState<undefined | number>(
    undefined,
  );
  useEffect(
    () => setIsSuccessful(message?.success.successStatusCode),
    [message?.success.successStatusCode],
  );
  return (
    <div
      className={` animate-pulse  w-[25rem] m-auto ${
        IsSuccessful !== undefined ? "flex" : "hidden"
      }  justify-center items-center gap-2 p-3 rounded-xl border-[3px] transform transition-all border-green-500  bg-black opacity-0  text-neutral-200 text-xl text-center `}>
      <p>{message?.success.successMessage}</p>
      <IoCheckmarkDoneSharp className='text-green-500 text-3xl' />
    </div>
  );
};
