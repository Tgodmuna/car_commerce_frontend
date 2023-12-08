import React, { ChangeEvent, useState } from "react";
import { formType, messageType } from "../TypeStore";
import axios from "axios";

type Props = {};

const SignUp = (props: Props) => {
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
      .post("hkn", Data)
      .then((successRes) => {
        setMessage({
          ...message,
          success: {
            ...message.success,
            successMessage: successRes.statusText,
            successStatusCode: successRes.status,
          },
        });
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
    console.log(input, label);
    input.value !== ""
      ? (label.style.visibility = "hidden")
      : (label.style.visibility = "visible");
  };

  return (
    <div className='bg-gray-950 p-3 w-full lg:w-[60vw] h-screen md:h-[50vh] m-auto md:my-[5rem]'>
      {/* first */}
      <div className=' flex flex-wrap md:flex-nowrap bg-transparent w-full md:w-full m-auto md:mt-[2rem] h-auto divide-y-2 md:divide-y-0 md:divide-x-2 divide-x-0 divide-cyan-500'>
        <div className=' p-2 flex-col flex items-center justify-center w-full h-full m-auto'>
          <input
            className='inputStyle peer'
            type='text'
            name='fullName'
            id='fullName'
            onChange={(e) => handleInputs(e)}
            value={Formstate.fullName}
            onBlur={() => hidelabel(0)}
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
            onBlur={() => hidelabel(1)}
          />
          <label htmlFor='email' className='InputlabelStyle'>
            email
          </label>
        </div>
      </div>
      {/* second */}
      <div className=' z-13 flex flex-wrap md:flex-nowrap bg-transparent w-full md:w-full m-auto h-auto divide-y-2 md:divide-y-0 md:divide-x-2 divide-x-0 divide-cyan-500'>
        <div className=' p-2 flex-col flex items-center justify-center w-full h-full m-auto'>
          <input
            className='inputStyle peer'
            type='text'
            name='userName'
            id='userName'
            onChange={(e) => handleInputs(e)}
            value={Formstate.userName}
            onBlur={() => hidelabel(2)}
          />
          <label htmlFor='userName' className='InputlabelStyle'>
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
            onBlur={() => hidelabel(3)}
          />
          <label htmlFor='pasw' className='InputlabelStyle'>
            password
          </label>
        </div>
      </div>
      {/* third */}
      <div className='flex md:flex-row flex-col items-center justify-center gap-[1.3rem] w-full md:border-2 md:border-x-transparent md:border-b-transparent border-cyan-500 md:pt-4'>
        <button
          onSubmit={(e) => {
            e.preventDefault();
            HandleSubmit();
          }}
          className=' hover:ring-2 shadow-md hover:shadow-slate-200 ring-slate-900 rounded-lg p-2 w-[7rem] bg-white text-xl uppercase hover:bg-cyan-500 hover:text-white'
          type='submit'>
          Submit
        </button>

        <div className=''>
          {" "}
          <p className='text-xl text-cyan-300 capitalize'>
            <a href='klkk'>forget password..?</a>
          </p>
          <input
            type='checkbox'
            name='checkbox'
            id='chk'
            onChange={(e) => handleInputs(e)}
            className='form-checkbox h-[17px] w-[20px] transition duration-1000 ease-in-out'
          />
          <label
            htmlFor='chk'
            className='text-cyan-300 text-center text-xl capitalize'>
            remember me
          </label>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
