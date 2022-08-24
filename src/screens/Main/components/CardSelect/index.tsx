import React, { useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { NativeScrollEvent, NativeSyntheticEvent } from "react-native";
import {
  FlipInXDown,
  useAnimatedScrollHandler,
  useSharedValue,
  ZoomIn,
} from "react-native-reanimated";

import * as S from "./styles";

import { cards } from "./utils";

import Card from "./components/Card";

export default function CardSelect() {
  const currCardRotationX = useSharedValue(55);
  const currCardBottom = useSharedValue(-132);
  const cardMarginBottom = useSharedValue(0);

  const nextCardRotationX = useSharedValue(55);
  const nextCardBottom = useSharedValue(-95);

  const othersCardsRotationX = useSharedValue(55);
  const nothersCardsBottom = useSharedValue(-95);

  const [selectedCard, setSelectedCard] = useState(0);
  const selectedSharedCard = useSharedValue(0);

  const cardHeight = 170;

  const scrollHandler = useAnimatedScrollHandler({
    // onMomentumEnd: (event, context) => {
    //   selectedCard.value = event.contentOffset.y / 170;
    //   // console.log(selectedCard.value);
    //   currCardRotationX.value = 0;
    //   nextCardRotationX.value = 55;
    // },
    onScroll: (event, context) => {
      const value = event.contentOffset.y - cardHeight * selectedSharedCard.value;

      console.log("curreent", value / 2);
      console.log("next", -value / 3 + 55);

      console.log("index", selectedCard);
      currCardRotationX.value = value / 2;
      nextCardRotationX.value = -value / 3 + 55;
      currCardBottom.value = value;
      nextCardBottom.value = value / 5;
    },
  });

  const handleMomentum = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const newIndex = Math.round(event.nativeEvent.contentOffset.y / 170);

    if (selectedCard !== newIndex) {
      selectedSharedCard.value = newIndex;
      setSelectedCard(newIndex);
    }
  };

  // console.log(selectedCard);
  // const scrollHandler = (event) => {
  //   console.log(event.nativeEvent.contentOffset.y);
  // };

  const snapToOffsets = cards.map((_, i) => (i === 0 ? 0 : i * cardHeight));

  const getCardRotationX = (index: number) => {
    if (index === selectedCard) {
      return currCardRotationX;
    } else if (index === selectedCard + 1) {
      return nextCardRotationX;
    }

    return othersCardsRotationX;
  };

  const getCardMarginBottom = (index: number) => {
    return nextCardBottom;
  };

  const getCardBottom = (index: number) => {
    return nextCardBottom;
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
          scrollEventThrottle={16}
          decelerationRate={0.5}
          pagingEnabled
          onScroll={scrollHandler}
          snapToOffsets={snapToOffsets}
          contentContainerStyle={{ paddingBottom: 1000 }}
        >
          {cards.map((card, index) => {
            return (
              <Card
                key={card.id}
                cardBottom={getCardBottom(index)}
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
