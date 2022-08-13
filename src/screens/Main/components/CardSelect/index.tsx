import React from "react";
import { Entypo } from "@expo/vector-icons";
import {
  FlipInXDown,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  ZoomIn,
} from "react-native-reanimated";

import * as S from "./styles";

import { cards } from "./utils";

export default function CardSelect() {
  const buttonScale = useSharedValue(1);

  const cardAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ perspective: 400 }, { scale: buttonScale.value }, { rotateX: "50deg" }],
    marginBottom: -140,
  }));

  return (
    <>
      <S.ButtonView entering={ZoomIn.delay(300)}>
        <S.Button>
          <Entypo name="plus" size={26} color="#ddd" />
        </S.Button>
      </S.ButtonView>
      <S.Container entering={FlipInXDown.duration(600)}>
        <S.Title>SELECT PAYMENT METHOD</S.Title>
        <S.CardScroll>
          {cards.map((card) => (
            <S.Card key={card.id} style={cardAnimatedStyle}>
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
          ))}
        </S.CardScroll>
      </S.Container>
    </>
  );
}
