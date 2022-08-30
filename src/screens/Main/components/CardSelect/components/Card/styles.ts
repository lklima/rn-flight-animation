import { LinearGradient } from "expo-linear-gradient";
import Animated from "react-native-reanimated";
import styled from "styled-components/native";

export const Card = styled(Animated.View)`
  width: 71%;
  height: 170px;
  align-self: center;
  margin-bottom: 20px;
  box-shadow: 0 20px 5px;
  shadow-color: black;
  shadow-offset: 0 20px;
  shadow-radius: 8px;
`;

export const CardContent = styled(LinearGradient).attrs({
  start: { x: 0, y: 0 },
  end: { x: 0.8, y: 0 },
})`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  padding: 15px 20px;
  justify-content: space-between;
`;

export const TopCardLogo = styled.Image`
  height: 25px;
  width: 70px;
`;

export const BottomCardView = styled.View`
  width: 100%;
  height: 48px;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
`;

export const CardTextView = styled.View``;

export const CardNumber = styled.Text`
  color: white;
  font-weight: 500;
  font-size: 13px;
`;

export const CardName = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 11px;
  margin-top: 8px;
`;

export const BottomCardLogo = styled.Image`
  height: 40px;
  width: 50px;
`;
