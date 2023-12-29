// ... (import statements remain unchanged)

import axios from "axios";
import { useState, ChangeEvent, useRef, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { formType } from "../TypeStore";

const SignUp = () => {
  const navigate = useNavigate();
  const [Formstate, setFormstate] = useState<formType>({
    Email: "",
    password: "",
    checked: false,
  });
  const [Message, setMessage] = useState<string | null>(null);
  const [isloading, SetisLoading] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

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
    SetisLoading(true);
    const Data: formType = Formstate;
    const Token = localStorage.getItem("userToken");
    const parsedData = Token && JSON.parse(Token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${parsedData}`;
    validateForm() &&
      axios
        .postForm("https://car-backend-23tq.onrender.com/login", Data)
        .then((resp) => {
          SetisLoading(false);
          console.log(resp);
          if (resp.status) navigate("/dashboard");
        })
        .catch((err) => {
          SetisLoading(false);
          console.log(err);
          setMessage(err.message);
        });
  };

  const validateForm: () => boolean = useCallback(() => {
    if (Formstate.Email?.includes("@") && Formstate.password !== "") {
      buttonRef.current!.style.cursor = "pointer";
      return true;
    }
    buttonRef.current!.style.cursor = "not-allowed";
    buttonRef.current!.disabled = true;
    return false;
  }, [Formstate.Email, Formstate.password]);

  useEffect(() => {
    if (buttonRef.current) {
      buttonRef.current.disabled = isloading;
    }
    validateForm();
  }, [isloading, validateForm]);

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
        <p className={`   text-red-500 ${Message ? "block" : "hidden"}`}>
          {Message}
        </p>

        {/* Submit Button */}
        <button
          ref={buttonRef}
          className={`mt-4 ${
            isloading ? "cursor-not-allowed" : "pointer"
          } bg-cyan-500 text-white text-xl flex item-center justify-center p-3 w-[10rem] rounded-md hover:bg-cyan-700 transition duration-300`}
          type='submit'>
          {isloading ? (
            <span
              className={`h-4 w-4 p-4   rounded-full border-[5px] border-cyan-500 border-b-black animate-spin`}></span>
          ) : (
            "Submit"
          )}
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
              <Link to={"/sign-up"}>Sign up</Link>
            </span>
          </p>
        </div>
      </div>
    </form>
  );
};
export default SignUp;

// ... (Notification component remains unchanged)
