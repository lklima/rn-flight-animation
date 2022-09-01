import React from "react";
import {
  FlipOutXUp,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import * as S from "./styles";

interface Props {
  onPress: () => void;
}

export default function Button({ onPress }: Props) {
  const buttonScale = useSharedValue(1);

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }));

  const handlePress = (press: string) => {
    buttonScale.value = withTiming(press === "pressIn" ? 0.9 : 1, { duration: 80 });
  };

  return (
    <S.ButtomView exiting={FlipOutXUp} style={buttonAnimatedStyle}>
      <S.Buttom
        onPress={onPress}
        onPressIn={() => handlePress("pressIn")}
        onPressOut={() => handlePress("pressOut")}
      >
        <S.ButtomContent>
          <S.ButtomText>Confirm $1,536.00</S.ButtomText>
        </S.ButtomContent>
      </S.Buttom>
    </S.ButtomView>
  );
}
