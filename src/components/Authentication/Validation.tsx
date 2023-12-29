import { formType } from "../TypeStore";

export const useValidate = (formData: formType) => {
  let Message: undefined | JSX.Element;
  if (
    formData.fullName &&
    formData.Email &&
    formData.password &&
    formData.userName
  ) {
    if (!formData.Email.includes("@")) {
      Message = (
        <p className='text-xl text-red-700 capitalize'>inavalid email</p>
      );
    }
  }
  return {
    validity: true,
    emailMsg: Message,
  };
};
