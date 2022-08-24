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
  const currCardTop = useSharedValue(400);
  const currCardRotationX = useSharedValue(55);

  const cardMarginBottom = useSharedValue(0);

  const nextCardRotationX = useSharedValue(55);

  const othersCardsRotationX = useSharedValue(55);
  const othersCardsTop = useSharedValue(400);

  const [selectedCard, setSelectedCard] = useState(0);
  const [nextCard, setNextCard] = useState(1);

  const cardHeight = 170;

  const scrollHandler = useAnimatedScrollHandler({
    // onMomentumEnd: (event, context) => {
    //   // selectedCard.value = event.contentOffset.y / 170;
    //   // console.log(selectedCard.value);
    //   currCardRotationX.value = 0;
    //   nextCardRotationX.value = 55;
    // },
    onScroll: (event, context) => {
      const value = event.contentOffset.y - cardHeight * selectedCard;
      const current = interpolate(value, [0, 170], [0, 55]);
      const next = interpolate(value, [0, 170], [55, 0]);

      // console.log({ next, current }, selectedCard);
      // console.log("next", -value / 3 + 55);

      console.log("index", selectedCard, value);
      currCardRotationX.value = current;
      nextCardRotationX.value = next;
    },
  });

  const handleMomentum = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const newIndex = Math.round(event.nativeEvent.contentOffset.y / cardHeight);

    if (selectedCard !== newIndex) {
      currCardRotationX.value = 0;
      nextCardRotationX.value = 0;

      setSelectedCard(newIndex);

      setTimeout(() => {
        nextCardRotationX.value = 55;
        setTimeout(() => setNextCard(newIndex + 1), 50);
      }, 50);
    }
  };

  // console.log(selectedCard);
  // const scrollHandler = (event) => {
  //   console.log(event.nativeEvent.contentOffset.y);
  // };

  const getCardRotationX = (index: number) => {
    if (index === selectedCard) {
      return currCardRotationX;
    } else if (index === nextCard) {
      return nextCardRotationX;
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
