import Animated from "react-native-reanimated";
import styled from "styled-components/native";

export const Container = styled(Animated.View)`
  width: 100%;
  height: 330px;
  align-items: center;
  position: absolute;
  bottom: 30px;
  z-index: 9999;
`;

export const ScrollTextView = styled.View`
  height: 20px;
  width: 100%;
  align-items: center;
`;

export const StatusText = styled.Text`
  font-size: 18px;
  color: gray;
  text-align: center;
`;

export const IconView = styled.View`
  height: 60px;
  width: 60px;
  border-radius: 40px;
  background: white;
  box-shadow: 4px 15px 8px rgba(1, 1, 1, 0.15);
`;
