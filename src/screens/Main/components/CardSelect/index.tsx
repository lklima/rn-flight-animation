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
  const prevCardRotationX = useSharedValue(60);
  const prevCardMarginBottom = useSharedValue(0);

  const currentCardMarginBottom = useSharedValue(-40);
  const currCardRotationX = useSharedValue(60);

  const nextCardMarginBottom = useSharedValue(-140);
  const nextCardRotationX = useSharedValue(60);
  const nextCardShadowOpacity = useSharedValue(0);

  const currentCard = useSharedValue(0);

  const toDown = useSharedValue(true);
  const isScrolling = useSharedValue(false);

  const cardHeight = 170;

  const scrollHandler = useAnimatedScrollHandler({
    onBeginDrag: () => (isScrolling.value = true),
    onEndDrag: () => (isScrolling.value = false),
    onScroll: (event, context: any) => {
      const newIndex = Math.floor(event.contentOffset.y / cardHeight);

      currentCard.value = newIndex;

      toDown.value = context.lastValue >= event.contentOffset.y;

      const value = Math.abs(event.contentOffset.y - cardHeight * newIndex);

      currCardRotationX.value = interpolate(value, [0, 170], [0, 60]);
      nextCardRotationX.value = interpolate(value, [0, 170], [60, 0]);
      prevCardRotationX.value = interpolate(value, [0, 170], [60, toDown.value ? 60 : 0]);

      currentCardMarginBottom.value = interpolate(value, [0, 170], [-40, 0]);
      nextCardMarginBottom.value = interpolate(value, [0, 170], [-140, -40]);

      nextCardShadowOpacity.value = interpolate(value, [0, 170], [0, 0.25]);

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
      <S.Container entering={FlipInXDown.duration(600)}>
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
              card={card}
              currentCard={currentCard}
              toDown={toDown}
              isScrolling={isScrolling}
              currCardRotationX={currCardRotationX}
              prevCardRotationX={prevCardRotationX}
              nextCardRotationX={nextCardRotationX}
              currentCardMarginBottom={currentCardMarginBottom}
              nextCardMarginBottom={nextCardMarginBottom}
              prevCardMarginBottom={prevCardMarginBottom}
              nextCardShadowOpacity={nextCardShadowOpacity}
            />
          ))}
        </S.CardScroll>
        <S.BottomGradient pointerEvents="none" />
      </S.Container>
    </>
  );
}
