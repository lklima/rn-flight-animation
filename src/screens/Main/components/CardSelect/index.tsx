import React, { useEffect, useState } from "react";
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

  const currCardTop = useSharedValue(400);
  const currCardRotationX = useSharedValue(55);

  const cardMarginBottom = useSharedValue(0);

  const nextCardRotationX = useSharedValue(55);

  const othersCardsRotationX = useSharedValue(55);
  const othersCardsTop = useSharedValue(400);

  const [selectedCard, setSelectedCard] = useState(0);
  const [nextCard, setNextCard] = useState(1);
  const [prevCard, setPrevCard] = useState(0);

  const toDown = useSharedValue(false);

  const cardHeight = 170;

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event, context: any) => {
      toDown.value = context.lastValue > event.contentOffset.y;
      const value = Math.abs(event.contentOffset.y - cardHeight * selectedCard);

      console.log("laste", value);

      const current = interpolate(value, [0, 170], [0, 55]);
      const prev = interpolate(value, [0, 170], [55, 0]);
      const next = interpolate(value, [0, 170], [55, toDown.value ? 55 : 0]);

      currCardRotationX.value = current;
      nextCardRotationX.value = next;
      prevCardRotationX.value = prev;
      context.lastValue = event.contentOffset.y;
    },
  });

  const handleMomentum = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const newIndex = Math.round(event.nativeEvent.contentOffset.y / cardHeight);

    if (selectedCard !== newIndex) {
      currCardRotationX.value = 0;

      // nextCardRotationX.value = 0;

      setSelectedCard(newIndex);

      setTimeout(() => {
        nextCardRotationX.value = 55;
        setTimeout(() => {
          setNextCard(newIndex + 1);
          setPrevCard(newIndex - 1);
        }, 100);
      }, 100);
    }
  };

  const getCardRotationX = (index: number) => {
    if (index === selectedCard) {
      return currCardRotationX;
    } else if (index === nextCard) {
      return nextCardRotationX;
    } else if (index === prevCard) {
      return prevCardRotationX;
    }

    return othersCardsRotationX;
  };

  const getCardMarginBottom = (index: number) => {
    return othersCardsTop;
  };

  const getCardTop = (index: number) => (index === 0 ? currCardTop : othersCardsTop);

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
                cardTop={getCardTop(index)}
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
