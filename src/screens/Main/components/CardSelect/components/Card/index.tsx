import React, { useEffect } from "react";
import { ImageSourcePropType } from "react-native";
import {
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";

import * as S from "./styles";

interface Props {
  cardRotationX: SharedValue<number>;
  cardMarginBottom: SharedValue<number>;
  index: number;
  card: {
    id: number;
    colors: string[];
    number: number;
    topLogo: ImageSourcePropType;
    bottomLogo: ImageSourcePropType;
  };
}

export default function Card({ index, card, cardRotationX, cardMarginBottom }: Props) {
  const cardTop = useSharedValue(400);

  useEffect(() => {
    if (index === 0) {
      cardRotationX.value = withDelay(450, withTiming(0, { duration: 600 }));
      cardTop.value = withDelay(300, withTiming(0, { duration: 600 }));
    } else {
      const delay = index * 50 + 300;

      cardTop.value = withDelay(delay, withTiming(0, { duration: 600 }));
    }
  }, [index]);

  const cardAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ perspective: 400 }, { rotateX: `${cardRotationX.value}deg` }],
    top: cardTop.value,
    marginBottom: cardMarginBottom.value,
  }));

  return (
    <S.Card style={cardAnimatedStyle}>
      <S.CardContent colors={card.colors}>
        <S.TopCardLogo source={card.topLogo} resizeMode="contain" />
        <S.BottomCardView>
          <S.CardTextView>
            <S.CardNumber>{card.number}</S.CardNumber>
            <S.CardName>ANDREW MITCHEL</S.CardName>
          </S.CardTextView>
          <S.BottomCardLogo source={card.bottomLogo} resizeMode="contain" />
        </S.BottomCardView>
      </S.CardContent>
    </S.Card>
  );
}
