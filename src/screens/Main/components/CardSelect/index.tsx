import React, { useState } from "react";
import { Entypo } from "@expo/vector-icons";
import {
  FlipInXDown,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  ZoomIn,
} from "react-native-reanimated";

import * as S from "./styles";

import { cards } from "./utils";

import Card from "./components/Card";

export default function CardSelect() {
  const currCardRotationX = useSharedValue(55);
  const nextCardRotationX = useSharedValue(55);
  const nextCardBottom = useSharedValue(-95);
  const yContentOffset = useSharedValue(0);

  const [selectedCard, setSelectedCard] = useState(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event, context) => {
      currCardRotationX.value = event.contentOffset.y;
      nextCardRotationX.value = -event.contentOffset.y / 4 + 55;
      nextCardBottom.value = event.contentOffset.y / 5;
    },
  });

  const cardHeight = 180;
  const snapToOffsets = cards.map((_, i) => (i === 0 ? 0 : i * (cardHeight + 30) + 5));

  return (
    <>
      <S.ButtonView entering={ZoomIn.delay(100).duration(1000)}>
        <S.Button>
          <Entypo name="plus" size={26} color="#ddd" />
        </S.Button>
      </S.ButtonView>
      <S.Container entering={FlipInXDown.duration(400)}>
        <S.Title>SELECT PAYMENT METHOD</S.Title>
        <S.CardScroll
          bounces={false}
          showsVerticalScrollIndicator={false}
          disableIntervalMomentum
          pagingEnabled
          scrollEventThrottle={16}
          decelerationRate={0.5}
          onScroll={scrollHandler}
          snapToOffsets={snapToOffsets}
          contentContainerStyle={{ paddingBottom: 1000 }}
        >
          {cards.map((card, index) => (
            <Card
              key={card.id}
              index={index}
              currCardRotationX={currCardRotationX}
              nextCardRotationX={nextCardRotationX}
              nextCardBottom={nextCardBottom}
              selectedCard={selectedCard}
              card={card}
            />
          ))}
        </S.CardScroll>
        <S.BottomGradient pointerEvents="none" />
      </S.Container>
    </>
  );
}
