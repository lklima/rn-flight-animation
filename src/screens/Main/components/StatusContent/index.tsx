import React, { useEffect, useRef } from "react";
import { FlatList } from "react-native";
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

const texts = ["Connected...", "Secure payment...", "Purchased"];

export default function StatusContent() {
  const buttonScale = useSharedValue(1);

  const listRef = useRef<FlatList>(null);

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }));

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      index = index + 1;

      if (index <= texts.length - 1) {
        listRef.current.scrollToIndex({ index, animated: true });
      } else {
        clearInterval(interval);
      }
    }, 2000);
  }, []);

  return (
    <S.Container exiting={FlipOutXUp} style={buttonAnimatedStyle}>
      <S.ScrollTextView>
        <FlatList
          ref={listRef}
          data={texts}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
          renderItem={({ item }) => <S.StatusText>{item}</S.StatusText>}
        />
      </S.ScrollTextView>
      <S.IconView></S.IconView>
    </S.Container>
  );
}
