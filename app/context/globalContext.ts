import { createContext } from "react";

type TGlobalContext = {
  category: string;
  setCategory: (name: string) => void;
};

const GlobalContext = createContext<TGlobalContext>({
  category: "",
  setCategory: () => {
    throw new Error("not implemented");
  },
});
export default GlobalContext;
