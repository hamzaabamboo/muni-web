import { extendTheme, ThemeConfig } from "@chakra-ui/react";
// 2. Add your color mode config
const config: Partial<ThemeConfig> = {
  initialColorMode: "light",
  useSystemColorMode: false,
};
// 3. extend the theme
const theme = extendTheme({
  fonts: {
    body: "Rodin Pro, sans-serif",
    heading: "Rodin Pro, sans-serif",
  },
  config,
});

export default theme;
