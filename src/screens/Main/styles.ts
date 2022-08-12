import { LinearGradient } from "expo-linear-gradient";
import Animated from "react-native-reanimated";
import styled from "styled-components/native";

interface Props {
  alingment?: "left" | "right";
  mt?: number;
  bold?: boolean;
  noResize?: boolean;
}

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
`;

export const FlyInfo = styled(Animated.View)`
  width: 100%;
  height: 40%;
  overflow: hidden;
`;

export const Content = styled(LinearGradient).attrs({
  colors: ["#0438AE", "#0438AE", "#859DDF"],
  start: { x: 0.5, y: -0.6 },
  end: { x: 0.5, y: 1 },
})`
  width: 100%;
  height: 100%;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 40px;
`;

export const Logo = styled.Image`
  height: 30px;
  width: 180px;
`;

export const TextRowContent = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 30px;
`;

export const TextContent = styled.View<Props>`
  align-items: ${({ alingment = "left" }) =>
    alingment === "left" ? "flex-start" : "flex-end"};
`;

export const HourContent = styled.View<Props>`
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 8px;
`;

export const SmallText = styled.Text<Props>`
  color: white;
  margin-top: ${({ mt }) => (mt ? mt : 0)}px;
  font-weight: ${({ bold }) => (bold ? "600" : "normal")};
`;

export const LargeText = styled.Text`
  color: white;
  font-size: 30px;
`;

export const Airplane = styled(Animated.Image)`
  height: 200px;
  width: 360px;
  position: absolute;
  align-self: center;
  bottom: -30px;
`;

export const TicketInfo = styled.View`
  width: 100%;
  height: 80px;
  flex-direction: row;
  background: white;
  align-items: center;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
`;

export const TicketView = styled.View`
  flex: 1;
  height: 100%;
  align-items: center;
  justify-content: flex-start;
  padding-top: 15px;
`;

export const Desc = styled.Text`
  color: gray;
  margin-bottom: 3px;
  width: 60%;
`;

export const Value = styled.Text`
  color: black;
  width: 60%;
`;
