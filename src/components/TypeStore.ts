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


export type viewCardPropType = {
  Selected: ProductsType | undefined;
  close: () => void;
};

export type cartContextType = {
  cart: ProductsType[];
  cartModifier: React.Dispatch<React.SetStateAction<ProductsType[]>>;
};

export type ProductsType = {
  id: number;
  model: number;
  name: string;
  description: string;
  Image: string;
  images: string[];
  rating: number;
  percentage_rating: number;
  price: number;
  year: number;
  quantity: number;
  availability: boolean;
};
