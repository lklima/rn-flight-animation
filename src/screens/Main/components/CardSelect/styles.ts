import { LinearGradient } from "expo-linear-gradient";
import Animated from "react-native-reanimated";
import styled from "styled-components/native";

interface Props {
  alingment?: "left" | "right";
  mt?: number;
  bold?: boolean;
  noResize?: boolean;
}

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

export const CardScroll = styled.ScrollView``;

export const Card = styled(Animated.View)`
  width: 73%;
  height: 180px;
  align-self: center;
  margin-bottom: 20px;
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
