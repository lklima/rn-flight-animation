import React from "react";
import { ImageSourcePropType } from "react-native";
import { SharedValue, useAnimatedStyle } from "react-native-reanimated";

import * as S from "./styles";

interface Props {
  cardRotationX: SharedValue<number>;
  cardBottom: SharedValue<number>;
  cardMarginBottom: SharedValue<number>;
  card: {
    id: number;
    colors: string[];
    number: number;
    topLogo: ImageSourcePropType;
    bottomLogo: ImageSourcePropType;
  };
}

export default function Card({
  card,
  cardRotationX,
  cardBottom,
  cardMarginBottom,
}: Props) {
  const cardAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ perspective: 400 }, { rotateX: `${cardRotationX.value}deg` }],
    bottom: cardBottom.value,
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
