import React from "react";
import { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

import * as S from "./styles";

export default function Button() {
  const buttonScale = useSharedValue(1);

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }));

  const handlePress = (press: string) => {
    buttonScale.value = withTiming(press === "pressIn" ? 0.9 : 1);
  };

  return (
    <S.Container>
      <S.ButtomView style={buttonAnimatedStyle}>
        <S.Buttom
          onPressIn={() => handlePress("pressIn")}
          onPressOut={() => handlePress("pressOut")}
        >
          <S.ButtomContent>
            <S.ButtomText>Confirm $1,536.00</S.ButtomText>
          </S.ButtomContent>
        </S.Buttom>
      </S.ButtomView>
    </S.Container>
  );
}
