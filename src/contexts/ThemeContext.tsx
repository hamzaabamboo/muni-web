import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";

export const ThemeContext = createContext<{
  bgImage?: string;
  setBgImage?: Dispatch<SetStateAction<string>>;
}>({});

export const ThemeProvider = ({
  defaultImage,
  children,
}: {
  defaultImage?: string;
  children: React.ReactNode;
}) => {
  const [bgImage, _setBgImage] = useState<string>();

  const setBgImage = useCallback(
    (args:string) => {
      if (defaultImage) return;
      _setBgImage(args);
    },
    [defaultImage]
  );

  useEffect(() => {
    if (defaultImage) {
      _setBgImage(defaultImage);
    }
  }, [defaultImage]);

  return (
    <ThemeContext.Provider value={{ bgImage, setBgImage }}>
      {children}
    </ThemeContext.Provider>
  );
};
