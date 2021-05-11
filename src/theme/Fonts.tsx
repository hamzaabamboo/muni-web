import { Global } from "@emotion/react";
import { getAbsolutePath } from "utils/assets";

export const Fonts = () => {
  return (
    <Global
      styles={`
    @font-face {
      font-family: 'Rodin Pro';
      font-style: normal;
      font-weight: 100;
      font-display: swap;
      src: url('${getAbsolutePath(
        "/fonts/FOT-RodinPro-L.otf"
      )}') format("opentype");
    }
    @font-face {
      font-family: 'Rodin Pro';
      font-style: normal;
      font-weight: 500;
      font-display: swap;
      src: url('${getAbsolutePath(
        "/fonts/FOT-RodinPro-M.otf"
      )}') format("opentype");
    }
    @font-face {
      font-family: 'Rodin Pro';
      font-style: normal;
      font-weight: 700;
      font-display: swap;
      src: url('${getAbsolutePath(
        "/fonts/FOT-RodinPro-B_5.otf"
      )}') format("opentype");
    }
    @font-face {
      font-family: 'Rodin Pro';
      font-style: normal;
      font-weight: 800;
      font-display: swap;
      src: url('${getAbsolutePath(
        "/fonts/FOT-RodinPro-EB.otf"
      )}') format("opentype");
    } 
    @font-face {
      font-family: 'Rodin Pro';
      font-style: normal;
      font-weight: 900;
      font-display: swap;
      src: url('${getAbsolutePath(
        "/fonts/FOT-RodinPro-UB.otf"
      )}') format("opentype");
    }
    `}
    />
  );
};
