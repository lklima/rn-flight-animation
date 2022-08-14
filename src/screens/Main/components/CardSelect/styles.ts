import { LinearGradient } from "expo-linear-gradient";
import Animated from "react-native-reanimated";
import styled from "styled-components/native";

export const Container = styled(Animated.View)`
  width: 100%;
  height: 64%;
  align-items: center;
  position: absolute;
  padding-top: 20px;
  bottom: 0px;
  background-color: white;
  box-shadow: 0px 20px 20px rgba(0, 0, 0, 0.3);
  z-index: 999;
`;

export const Title = styled.Text`
  color: gray;
  margin-bottom: 20px;
  font-weight: 600;
`;

export const ButtonView = styled(Animated.View)`
  position: absolute;
  right: 25px;
  top: 43.5%;
  z-index: 9999;
`;

export const Button = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  height: 40px;
  width: 40px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  background-color: white;
  box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.15);
`;

export const CardScroll = styled(Animated.ScrollView)``;

export const BottomGradient = styled(LinearGradient).attrs({
  colors: ["rgba(255, 255, 255, 0)", "white"],
  end: { x: 0.5, y: 0.5 },
})`
  width: 100%;
  height: 150px;
  position: absolute;
  bottom: 0;
`;
