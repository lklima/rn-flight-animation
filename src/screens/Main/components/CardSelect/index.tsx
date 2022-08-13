import React from "react";
import { Entypo } from "@expo/vector-icons";
import {
  FlipInXDown,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  ZoomIn,
} from "react-native-reanimated";

import * as S from "./styles";

export default function CardSelect() {
  const buttonScale = useSharedValue(1);

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }));

  return (
    <>
      <S.ButtonView entering={ZoomIn.delay(300)}>
        <S.Button>
          <Entypo name="plus" size={24} color="#ddd" />
        </S.Button>
      </S.ButtonView>
      <S.Container entering={FlipInXDown.duration(600)}>
        <S.Title>SELECT PAYMENT MEHOD</S.Title>
      </S.Container>
    </>
  );
}
