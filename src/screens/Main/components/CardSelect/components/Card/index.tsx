import React, { useEffect } from "react";
import {
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
  currCardRotationX: SharedValue<number>;
  nextCardRotationX: SharedValue<number>;
  currCardBottom: SharedValue<number>;
  nextCardBottom: SharedValue<number>;
  selectedCard: SharedValue<number>;
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
  index,
  selectedCard,
  currCardRotationX,
  currCardBottom,
  nextCardRotationX,
  nextCardBottom,
}: Props) {
  const rotateX = useSharedValue(55);
  const bottom = useSharedValue(-400);

  const isSelected = index === selectedCard.value;
  const nextCard = index === selectedCard.value + 1;

  useEffect(() => {
    if (index === 0) {
      currCardRotationX.value = withDelay(400, withTiming(0, { duration: 600 }));
      bottom.value = withDelay(300, withTiming(0, { duration: 600 }));
    } else {
      const delay = index * 50 + 400;

      nextCardBottom.value = withDelay(delay, withTiming(-95, { duration: 500 }));
      bottom.value = withDelay(delay, withTiming(-95, { duration: 500 }));
    }
  }, [index]);

  const cardAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { perspective: 400 },
      {
        rotateX: `${
          index === selectedCard.value
            ? currCardRotationX.value
            : index === selectedCard.value + 1
            ? nextCardRotationX.value
            : rotateX.value
        }deg`,
      },
    ],
    bottom: bottom.value,
    marginBottom: index === selectedCard.value ? -130 : -145,
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
