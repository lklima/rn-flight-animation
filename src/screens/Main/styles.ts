import { LinearGradient } from "expo-linear-gradient";
import Animated from "react-native-reanimated";
import styled from "styled-components/native";

interface Props {
  alingment?: "left" | "right";
  mt?: number;
  bold?: boolean;
}

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const FlyInfo = styled.View`
  width: 100%;
  height: 45%;
`;

export const Content = styled(LinearGradient).attrs({
  colors: ["#0438AE", "#0438AE", "#859DDF"],
  start: { x: 0.5, y: -0.5 },
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

export const Airplane = styled.Image`
  height: 30px;
  width: 180px;
`;
