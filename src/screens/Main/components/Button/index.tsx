import React from "react";
import {
  FlipInXDown,
  FlipOutXUp,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import * as S from "./styles";

interface Props {
  showFlyInfo: boolean;
  onPress: () => void;
}

export default function Button({ showFlyInfo, onPress }: Props) {
  const buttonScale = useSharedValue(1);

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }));

  const handlePress = (press: string) => {
    buttonScale.value = withTiming(press === "pressIn" ? 0.9 : 1, { duration: 80 });
  };

  return (
    <S.ButtomView
      entering={FlipInXDown.duration(600)}
      exiting={FlipOutXUp}
      style={buttonAnimatedStyle}
    >
      <S.Buttom
        onPress={showFlyInfo ? () => {} : onPress}
        onPressIn={() => handlePress("pressIn")}
        onPressOut={() => handlePress("pressOut")}
      >
        <S.ButtomContent>
          <S.ButtomText>
            {showFlyInfo ? "Go to Home screen" : "Confirm $1,536.00"}
          </S.ButtomText>
        </S.ButtomContent>
      </S.Buttom>
    </S.ButtomView>
  );
}
