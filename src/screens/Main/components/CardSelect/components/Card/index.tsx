import React, { useEffect } from "react";
import {
  FlipInEasyX,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withDelay,
} from "react-native-reanimated";

import * as S from "./styles";
import { ImageSourcePropType } from "react-native";

interface Props {
  index: number;
  selectedCard: number;
  card: {
    id: number;
    colors: string[];
    number: number;
    topLogo: ImageSourcePropType;
    bottomLogo: ImageSourcePropType;
  };
}

export default function Card({ card, index, selectedCard }: Props) {
  const marginBottom = useSharedValue(-132);
  const rotateX = useSharedValue(55);
  const bottom = useSharedValue(-400);

  // useEffect(() => {
  //   if (index === selectedCard) {
  //     rotateX.value = withTiming(0);
  //     marginBottom.value = withTiming(-20);
  //   } else {
  //     rotateX.value = withTiming(45);
  //     marginBottom.value = withTiming(-140);
  //   }
  // }, [index, selectedCard]);

  useEffect(() => {
    if (index === 0) {
      rotateX.value = withDelay(400, withTiming(0, { duration: 600 }));
      bottom.value = withDelay(300, withTiming(0, { duration: 600 }));
    } else {
      const delay = index * 50 + 300;

      bottom.value = withDelay(delay, withTiming(-100, { duration: 500 }));
    }
  }, [index]);

  const cardAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ perspective: 400 }, { rotateX: `${rotateX.value}deg` }],
    marginBottom: marginBottom.value,
    bottom: bottom.value,
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
