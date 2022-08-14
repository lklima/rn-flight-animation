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
  const direction = useSharedValue(0);
  const yContentOffset = useSharedValue(0);

  const [selectedCard, setSelectedCard] = useState(0);

  // const scrollHandler = useAnimatedScrollHandler({
  //   onEndDrag: () => {
  //     direction.value = 0;
  //   },
  //   onScroll: (event) => {
  //     console.log(event);
  //     // const yDirection = contentOffsetXY - (ctx?.y ?? 0);
  //     // direction.value = Math.sign(yDirection);
  //     // ctx.y = contentOffsetXY;
  //     yContentOffset.value = event.contentOffset.y;
  //   },
  // });

  const scrollHandler = (event) => {
    console.log(event.nativeEvent.contentOffset.y);
  };

  const cardHeight = 180;
  const snapToOffsets = cards.map((_, i) => {
    if (i === 0) return 0;
    else {
      return i * (cardHeight + 30) + 5;
    }
  });

  return (
    <>
      <S.ButtonView entering={ZoomIn.delay(200)}>
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
          contentContainerStyle={{ paddingBottom: 400 }}
        >
          {cards.map((card, index) => (
            <Card key={card.id} index={index} selectedCard={selectedCard} card={card} />
          ))}
        </S.CardScroll>
        <S.BottomGradient />
      </S.Container>
    </>
  );
}
