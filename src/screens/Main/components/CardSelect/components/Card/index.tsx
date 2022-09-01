import React from "react";
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
  currentCard: SharedValue<number>;
  toDown: SharedValue<boolean>;
  isScrolling: SharedValue<boolean>;
  currCardRotationX: SharedValue<number>;
  prevCardRotationX: SharedValue<number>;
  nextCardRotationX: SharedValue<number>;
  currentCardMarginBottom: SharedValue<number>;
  nextCardMarginBottom: SharedValue<number>;
  prevCardMarginBottom: SharedValue<number>;
  nextCardShadowOpacity: SharedValue<number>;
  index: number;
  card: {
    id: number;
    colors: string[];
    number: number;
    topLogo: ImageSourcePropType;
    bottomLogo: ImageSourcePropType;
  };
}

export default function Card({
  index,
  card,
  toDown,
  isScrolling,
  currentCard,
  currCardRotationX,
  prevCardRotationX,
  nextCardRotationX,
  currentCardMarginBottom,
  nextCardMarginBottom,
  prevCardMarginBottom,
  nextCardShadowOpacity,
}: Props) {
  const cardTop = useSharedValue(400);
  const othersCardsRotationX = useSharedValue(60);

  setTimeout(() => {
    if (index === 0) {
      currCardRotationX.value = withDelay(450, withTiming(0, { duration: 600 }));
      cardTop.value = withDelay(300, withTiming(0, { duration: 600 }));
    } else {
      cardTop.value = withDelay(index * 50 + 300, withTiming(0, { duration: 600 }));
    }
  }, 100);

  const cardAnimatedStyle = useAnimatedStyle(() => {
    if (isScrolling.value) {
      if (toDown.value) {
        othersCardsRotationX.value = withTiming(50, { duration: 150 });
      }
    } else {
      othersCardsRotationX.value = withTiming(60, { duration: index * 100 });
    }

    return {
      transform: [
        { perspective: 500 },
        {
          rotateX: `${
            index === currentCard.value
              ? currCardRotationX.value
              : index === currentCard.value + 1
              ? nextCardRotationX.value
              : index < currentCard.value
              ? prevCardRotationX.value
              : othersCardsRotationX.value
          }deg`,
        },
      ],
      top: cardTop.value,
      marginBottom:
        index === currentCard.value
          ? currentCardMarginBottom.value
          : index === currentCard.value + 1
          ? nextCardMarginBottom.value
          : index < currentCard.value
          ? prevCardMarginBottom.value
          : -140,
      shadowOpacity:
        index <= currentCard.value
          ? 0.25
          : index === currentCard.value + 1
          ? nextCardShadowOpacity.value
          : 0,
      zIndex: index === currentCard.value ? 999 : 0,
    };
  });

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
