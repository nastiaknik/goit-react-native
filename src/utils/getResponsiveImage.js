import { PixelRatio } from "react-native";

export const getResponsiveImage = () => {
  const pixelDensity = PixelRatio.get();

  const bgImagex1 = require("../../assets/images/background-image.jpg");
  const bgImagex2 = require("../../assets/images/background-image-x2.jpg");
  const bgImagex3 = require("../../assets/images/background-image-x3.jpg");

  if (pixelDensity <= 1) {
    return bgImagex1;
  } else if (pixelDensity <= 2) {
    return bgImagex2;
  } else {
    return bgImagex3;
  }
};
