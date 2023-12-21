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

export type new_productStoreType = {
  model: string;
  year: number;
  price: number;
  image: string;
  description: string;
  rating: string;
  percentage_rating: string;
  id: number;
  qty: number;
};

export type viewCardPropType = {
  Selected: new_productStoreType | undefined;
  close: () => void;
};

export type cartContextType = {
  cart: new_productStoreType[];
  cartModifier: React.Dispatch<React.SetStateAction<new_productStoreType[]>>;
};
