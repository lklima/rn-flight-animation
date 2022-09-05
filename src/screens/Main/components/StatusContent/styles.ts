import Animated from "react-native-reanimated";
import styled from "styled-components/native";

export const Container = styled(Animated.View)`
  width: 100%;
  height: 330px;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 40px;
  z-index: 9999;
`;

export const ScrollTextView = styled(Animated.View)`
  height: 20px;
  width: 100%;
  align-items: center;
  position: absolute;
  top: 60px;
  z-index: 9999;
`;

export const StatusText = styled.Text`
  font-size: 19px;
  color: #c3c3c3;
  font-weight: 600;
  text-align: center;
`;

export const IconViewOut = styled(Animated.View)`
  height: 100px;
  width: 100px;
  border-radius: 80px;
  background: #f1f1f1;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 0px 8px rgba(1, 1, 1, 0.15);
  z-index: 999;
`;

export const IconView = styled.View`
  height: 80px;
  width: 80px;
  border-radius: 40px;
  background: white;
  align-items: center;
  justify-content: center;
  box-shadow: 4px 15px 8px rgba(1, 1, 1, 0.15);
`;

export const IconContent = styled(Animated.View)``;

export const Wave = styled(Animated.View)`
  height: 350px;
  width: 350px;
  border-radius: 200px;
  box-shadow: 0px 0px 20px white;
  position: absolute;
  z-index: 10;
`;
