// ... (import statements remain unchanged)

import axios from "axios";
import { useState, ChangeEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { formType, messageType } from "../TypeStore";

const SignUp = () => {
  const navigate = useNavigate();
  const [Formstate, setFormstate] = useState<formType>({
    Email: "",
    password: "",
    checked: false,
  });
  const [Message, setMessage] = useState<string | null>(null);

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
    const Token = localStorage.getItem("userToken");
    const parsedData = Token && JSON.parse(Token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${parsedData}`;
    axios
      .postForm("https://car-backend-23tq.onrender.com/signin", Data)
      .then((resp) => {
        console.log(resp);
        if (resp.status) navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err);
        setMessage(err.message);
      });
  };

  
  //hideLabel
  // const hidelabel: (index: number) => void = (index) => {
  //   const input = document.getElementsByTagName("input")[
  //     index
  //   ] as HTMLInputElement;
  //   const label = document.getElementsByTagName("label")[
  //     index
  //   ] as HTMLLabelElement;
  //   input.value !== ""
  //     ? (label.style.visibility = "hidden")
  //     : (label.style.visibility = "visible");
  // };
  return (
    <form
      onSubmit={(e) => {
        HandleSubmit();
        e.preventDefault();
      }}
      className='bg-gray-950  p-3 w-full lg:w-fit rounded-xl  m-auto md:my-[1rem] flex flex-col items-center justify-center'>
      <div className='flex flex-col items-center justify-center  gap-4  bg-opacity-10 w-auto h-full'>
        {/* Email */}
        <div className='signin'>
          <label htmlFor='email' className=' '>
            Email
          </label>
          <input
            className='inputStyle peer ml-[-4rem]'
            type='email'
            name='Email'
            id='email'
            onChange={(e) => handleInputs(e)}
            value={Formstate.Email}
          />
        </div>
        {/* Password */}
        <div className='signin'>
          <label
            htmlFor='pasw'
            className='text-white text-center text-xl w-[15rem]'>
            Password
          </label>
          <input
            className='inputStyle ml-[-4rem] '
            type='password'
            name='password'
            id='pasw'
            onChange={(e) => handleInputs(e)}
            value={Formstate.password}
          />
        </div>
        <p className={`  text-red-500 ${Message ? "block" : "hidden"}`}>
          {Message}
        </p>

        {/* Submit Button */}
        <button
          className='mt-4 bg-cyan-500 text-white p-2 rounded-md hover:bg-cyan-700 transition duration-300'
          type='submit'>
          Submit
        </button>
        {/* Additional Options */}
        <div className='mt-4  m-0  text-center flex flex-col gap-2 justify-center items-center'>
          <p className='text-cyan-400 text-xl capitalize'>
            <a href='klkk'>Forgot your password?</a>
          </p>
          <div className='flex items-center'>
            <input
              type='checkbox'
              name='checkbox'
              id='chk'
              onChange={(e) => handleInputs(e)}
              className='form-checkbox text-cyan-400 h-5 w-5 transition duration-300 ease-in-out'
            />
            <label htmlFor='chk' className='ml-2 text-cyan-400 text-xl'>
              Remember me
            </label>
          </div>
          <p className='text-cyan-400 capitalize p-2 '>
            no account..?
            <span className=' text-cyan-500 text-xl ml-2 capitalize'>
              <Link to={"/sign-in"}>Sign up</Link>
            </span>
          </p>
        </div>
      </div>
    </form>
  );
};
export default SignUp;

// ... (Notification component remains unchanged)
