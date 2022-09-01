import { LinearGradient } from "expo-linear-gradient";
import Animated from "react-native-reanimated";
import styled from "styled-components/native";

export const Content = styled(LinearGradient)`
  width: 100%;
  align-items: center;
`;

export const ButtomView = styled(Animated.View)`
  width: 100%;
  align-items: center;
  position: absolute;
  bottom: 30px;
  z-index: 9999;
`;

export const Buttom = styled.TouchableOpacity.attrs({
  activeOpacity: 1,
})`
  width: 50%;
  box-shadow: 0px 8px 6px #9bc3fb;
`;

export const ButtomContent = styled(LinearGradient).attrs({
  colors: ["#6E8DFF", "#4995FE"],
  start: { x: 0.5, y: 0 },
  end: { x: 1, y: 0 },
})`
  width: 100%;
  height: 45px;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  box-shadow: 0px 4px 10px #4995fe;
`;

export const ButtomText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;
