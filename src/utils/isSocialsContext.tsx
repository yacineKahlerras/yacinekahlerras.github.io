import { createContext, use, useContext } from "react";

export const IsSocialsContext = createContext({
  isSocials: false,
});

export const useIsSocialsContext = () => {
  const { isSocials } = useContext(IsSocialsContext);
  return isSocials;
};
