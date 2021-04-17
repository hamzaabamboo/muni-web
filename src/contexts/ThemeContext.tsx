import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

export const ThemeContext = createContext<{
  bgImage?: string;
  setBgImage?: Dispatch<SetStateAction<string>>;
}>({});

export const ThemeProvider: React.FC<{ defaultImage?: string }> = ({
  defaultImage,
  children,
}) => {
  const [bgImage, setBgImage] = useState<string>();

  useEffect(() => {
    if (defaultImage) {
      setBgImage(defaultImage);
    }
  }, [defaultImage]);

  return (
    <ThemeContext.Provider value={{ bgImage, setBgImage }}>
      {children}
    </ThemeContext.Provider>
  );
};
