import React from "react";
import { Entypo } from "@expo/vector-icons";
import {
  FlipInXDown,
  useAnimatedScrollHandler,
  useSharedValue,
  ZoomIn,
  interpolate,
} from "react-native-reanimated";

import * as S from "./styles";

import { cards } from "./utils";

import Card from "./components/Card";

export default function CardSelect() {
  const prevCardRotationX = useSharedValue(55);
  const prevCardMarginBottom = useSharedValue(0);

  const currentCardMarginBottom = useSharedValue(-35);
  const currCardRotationX = useSharedValue(55);

  const nextCardMarginBottom = useSharedValue(-135);
  const nextCardRotationX = useSharedValue(55);

  const othersCardsRotationX = useSharedValue(55);
  const othersCardMarginBottom = useSharedValue(-135);

  const selectedCard = useSharedValue(0);
  const nextCard = useSharedValue(0);
  const prevCard = useSharedValue(0);

  const toDown = useSharedValue(false);

  const cardHeight = 170;

  const scrollHandler = useAnimatedScrollHandler({
    onBeginDrag: (_, context: any) => (context.isScrolling = true),
    onEndDrag: (_, context: any) => (context.isScrolling = false),
    onScroll: (event, context: any) => {
      const newIndex = Math.floor(event.contentOffset.y / cardHeight);

      selectedCard.value = newIndex;
      nextCard.value = newIndex + 1;
      prevCard.value = newIndex - 1;

      if (context.isScrolling) {
        toDown.value = context.lastValue > event.contentOffset.y;
      }

      const value = Math.abs(event.contentOffset.y - cardHeight * newIndex);

      currCardRotationX.value = interpolate(value, [0, 170], [0, 55]);
      nextCardRotationX.value = interpolate(value, [0, 170], [55, 0]);
      prevCardRotationX.value = interpolate(value, [0, 170], [55, toDown.value ? 55 : 0]);

      currentCardMarginBottom.value = interpolate(value, [0, 170], [-35, 0]);
      nextCardMarginBottom.value = interpolate(value, [0, 170], [-135, -35]);

      context.lastValue = event.contentOffset.y;
    },
  });

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
          scrollEventThrottle={16}
          decelerationRate={0}
          onScroll={scrollHandler}
          snapToInterval={cardHeight}
          contentContainerStyle={{ paddingBottom: 1000 }}
        >
          {cards.map((card, index) => (
            <Card
              key={card.id}
              index={index}
              selectedCard={selectedCard}
              nextCard={nextCard}
              prevCard={prevCard}
              currCardRotationX={currCardRotationX}
              prevCardRotationX={prevCardRotationX}
              nextCardRotationX={nextCardRotationX}
              othersCardsRotationX={othersCardsRotationX}
              currentCardMarginBottom={currentCardMarginBottom}
              nextCardMarginBottom={nextCardMarginBottom}
              prevCardMarginBottom={prevCardMarginBottom}
              othersCardMarginBottom={othersCardMarginBottom}
              card={card}
            />
          ))}
        </S.CardScroll>
        <S.BottomGradient pointerEvents="none" />
      </S.Container>
    </>
  );
}
