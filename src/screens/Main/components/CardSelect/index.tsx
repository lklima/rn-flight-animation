import React, { useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { NativeScrollEvent, NativeSyntheticEvent } from "react-native";
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

  const [selectedCard, setSelectedCard] = useState(0);
  const [nextCard, setNextCard] = useState(1);
  const [prevCard, setPrevCard] = useState(0);

  const toDown = useSharedValue(false);

  const cardHeight = 170;

  const scrollHandler = useAnimatedScrollHandler({
    onBeginDrag: (_, context: any) => (context.isScrolling = true),
    onEndDrag: (_, context: any) => (context.isScrolling = false),
    onScroll: (event, context: any) => {
      const newIndex = Math.round(event.contentOffset.y / cardHeight);

      console.log({ newIndex });

      if (context.isScrolling) {
        toDown.value = context.lastValue > event.contentOffset.y;
      }

      const value = Math.abs(event.contentOffset.y - cardHeight * selectedCard);

      currCardRotationX.value = interpolate(value, [0, 170], [0, 55]);
      nextCardRotationX.value = interpolate(value, [0, 170], [55, 0]);
      prevCardRotationX.value = interpolate(value, [0, 170], [55, toDown.value ? 55 : 0]);

      currentCardMarginBottom.value = interpolate(value, [0, 170], [-35, 0]);
      nextCardMarginBottom.value = interpolate(value, [0, 170], [-135, -35]);

      context.lastValue = event.contentOffset.y;
    },
  });

  const handleMomentum = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const newIndex = Math.round(event.nativeEvent.contentOffset.y / cardHeight);

    if (selectedCard !== newIndex) {
      nextCardRotationX.value = 0;
      currCardRotationX.value = 0;

      setSelectedCard(newIndex);

      setTimeout(() => {
        nextCardRotationX.value = 55;
        nextCardMarginBottom.value = -135;
        currentCardMarginBottom.value = -35;

        setTimeout(() => {
          setNextCard(newIndex + 1);
          setPrevCard(newIndex - 1);
        }, 100);
      }, 150);
    }
  };

  const getCardRotationX = (index: number) => {
    if (index === selectedCard) {
      return currCardRotationX;
    } else if (index === nextCard) {
      return nextCardRotationX;
    } else if (index <= prevCard) {
      return prevCardRotationX;
    }

    return othersCardsRotationX;
  };

  const getCardMarginBottom = (index: number) => {
    if (index === selectedCard) {
      return currentCardMarginBottom;
    } else if (index === nextCard) {
      return nextCardMarginBottom;
    } else if (index <= prevCard) {
      return prevCardMarginBottom;
    }

    return othersCardMarginBottom;
  };

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
          onMomentumScrollEnd={handleMomentum}
          disableIntervalMomentum
          scrollEventThrottle={16}
          decelerationRate={0}
          onScroll={scrollHandler}
          snapToInterval={cardHeight}
          contentContainerStyle={{ paddingBottom: 1000 }}
        >
          {cards.map((card, index) => {
            return (
              <Card
                key={card.id}
                index={index}
                cardMarginBottom={getCardMarginBottom(index)}
                cardRotationX={getCardRotationX(index)}
                card={card}
              />
            );
          })}
        </S.CardScroll>
        <S.BottomGradient pointerEvents="none" />
      </S.Container>
    </>
  );
}
