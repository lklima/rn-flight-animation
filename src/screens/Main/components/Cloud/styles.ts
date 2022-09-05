import Animated from "react-native-reanimated";
import styled from "styled-components/native";

export const Cloud = styled(Animated.Image)`
  height: 400px;
  width: 400px;
  position: absolute;
  align-self: center;
  bottom: 40px;
  z-index: 9999;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.08);
`;
