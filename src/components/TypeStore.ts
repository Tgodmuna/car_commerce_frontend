//simple types
export type simpleTypes = boolean | number | string | void;
export type StringAndBooleanTYPES = Exclude<simpleTypes, number | void>;

//form types
export type formType = {
  fullName?: string;
  Email?: string;
  userName?: string;
  password?: string;
  checked?: boolean;
};
export type messageType = {
  success: {
    successMessage: string;
    successStatusCode: number | undefined;
  };
  error: {
    errorMessage: string;
    errorStatusCode: number | undefined;
  };
};
