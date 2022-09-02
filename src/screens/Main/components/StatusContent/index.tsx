import React, { useEffect, useRef, useState } from "react";
import { FlatList } from "react-native";
import {
  Extrapolate,
  FlipOutXUp,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
  ZoomIn,
  FadeInDown,
} from "react-native-reanimated";
import { Ionicons, Entypo } from "@expo/vector-icons";

import * as S from "./styles";

const texts = ["Connected...", "Secure payment...", "Purchased"];

export default function StatusContent() {
  const buttonScale = useSharedValue(1);
  const iconOpacity = useSharedValue(0);

  const wave1Scale = useSharedValue(0);
  const wave1Opacity = useSharedValue(1);
  const wave2Scale = useSharedValue(0);
  const wave2Opacity = useSharedValue(1);

  const [icon, setIcon] = useState<any>("md-wifi");

  const listRef = useRef<FlatList>(null);

  useEffect(() => {
    setTimeout(() => {
      let index = 0;

      iconOpacity.value = withSequence(
        withTiming(1),
        withDelay(2400, withTiming(0)),
        withTiming(1),
        withDelay(2400, withTiming(0)),
        withTiming(1),
        withDelay(2400, withTiming(0)),
        withTiming(1)
      );

      wave1Scale.value = withRepeat(
        withTiming(1, { duration: 2500, easing: Easing.linear }),
        -1,
        false
      );

      wave2Scale.value = withDelay(
        800,
        withRepeat(withTiming(1, { duration: 2500, easing: Easing.linear }), -1, false)
      );

      const interval = setInterval(() => {
        if (index < texts.length - 1) {
          index = index + 1;

          setTimeout(
            () => listRef.current.scrollToIndex({ index, animated: true }),
            index === 2 ? 3000 : 0
          );

          if (index === 1) {
            setIcon("link-sharp");
            setTimeout(() => setIcon("shield-checkmark-outline"), 2900);
          }

          if (index === 2) {
            setTimeout(() => setIcon("check"), 2900);
          }
        } else {
          clearInterval(interval);
        }
      }, 3000);
    }, 300);
  }, []);

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }));

  const iconAnimatedStyle = useAnimatedStyle(() => ({
    opacity: iconOpacity.value,
  }));

  const wave1AnimatedStyle = useAnimatedStyle(() => {
    wave1Opacity.value = interpolate(
      wave1Scale.value,
      [0, 0.8, 1],
      [1, 1, 0],
      Extrapolate.CLAMP
    );

    return {
      transform: [{ scale: wave1Scale.value }],
      opacity: wave1Opacity.value,
    };
  });

  const wave2AnimatedStyle = useAnimatedStyle(() => {
    wave2Opacity.value = interpolate(
      wave2Scale.value,
      [0, 0.8, 1],
      [1, 1, 0],
      Extrapolate.CLAMP
    );

    return {
      transform: [{ scale: wave2Scale.value }],
      opacity: wave2Opacity.value,
    };
  });

  return (
    <S.Container exiting={FlipOutXUp} style={buttonAnimatedStyle}>
      <S.ScrollTextView entering={FadeInDown.duration(600).delay(300)}>
        <FlatList
          ref={listRef}
          data={texts}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
          renderItem={({ item }) => <S.StatusText>{item}</S.StatusText>}
        />
      </S.ScrollTextView>
      <S.IconViewOut entering={ZoomIn.duration(600).delay(300)}>
        <S.IconView>
          <S.IconContent style={iconAnimatedStyle}>
            {icon === "check" ? (
              <Entypo name="check" size={50} color="black" />
            ) : (
              <Ionicons name={icon} size={45} color="#d3d3d3" />
            )}
          </S.IconContent>
        </S.IconView>
      </S.IconViewOut>
      <S.Wave style={wave1AnimatedStyle} />
      <S.Wave style={wave2AnimatedStyle} />
    </S.Container>
  );
}
