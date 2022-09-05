import React, { useEffect } from "react";
import { StatusBar } from "react-native";
import {
  FlipInXDown,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Entypo } from "@expo/vector-icons";

import * as S from "./styles";

import logo from "../../../../assets/images/logo.png";
import profile from "../../../../assets/images/profile.jpeg";
import nopic from "../../../../assets/images/nopic.jpeg";

export default function FlyContent() {
  const headertranslateY = useSharedValue(-320);
  const headerContentTranslateY = useSharedValue(320);
  const headerContentopacity = useSharedValue(0);

  const headerAnimatedStyled = useAnimatedStyle(() => ({
    transform: [{ translateY: headertranslateY.value }],
  }));

  const headerContentAnimatedStyled = useAnimatedStyle(() => ({
    transform: [{ translateY: headerContentTranslateY.value }],
  }));

  useEffect(() => {
    headertranslateY.value = withTiming(0, { duration: 700 });
    headerContentTranslateY.value = withTiming(0, { duration: 900 });
    headerContentopacity.value = withTiming(1, { duration: 700 });
  }, []);

  return (
    <S.Container>
      <StatusBar barStyle="light-content" />
      <S.Header style={headerAnimatedStyled}>
        <S.HeaderInfoText>Swipe down to see options</S.HeaderInfoText>
      </S.Header>
      <S.HeaderContent style={headerContentAnimatedStyled}>
        <S.Logo source={logo} resizeMode="contain" />
        <S.HeaderText bold>Your order has submited</S.HeaderText>
        <S.HeaderText>We are waiting for booking confirmation</S.HeaderText>
      </S.HeaderContent>
      <S.FlyInfo entering={FlipInXDown.duration(900).delay(100)}>
        <S.FlyInfoContent intensity={70}>
          <S.TextRowContent>
            <S.TextContent>
              <S.SmallText>Los Angeles</S.SmallText>
              <S.LargeText>LAS</S.LargeText>
              <S.SmallText>24 Apr, 16:30</S.SmallText>
            </S.TextContent>
            <S.HourContent>
              <Entypo name="chevron-right" size={30} color="white" />
              <S.SmallText bold mt={10}>
                4h 15m
              </S.SmallText>
            </S.HourContent>
            <S.TextContent alingment="right">
              <S.SmallText>New York</S.SmallText>
              <S.LargeText>NYC</S.LargeText>
              <S.SmallText>20:45</S.SmallText>
            </S.TextContent>
          </S.TextRowContent>
          <S.TicketInfo>
            <S.TicketView>
              <S.Desc>Flight</S.Desc>
              <S.Value>AR 580</S.Value>
            </S.TicketView>
            <S.TicketView>
              <S.Desc>Class</S.Desc>
              <S.Value>Premium</S.Value>
            </S.TicketView>
            <S.TicketView>
              <S.Desc>Aircraft</S.Desc>
              <S.Value>B 737-900</S.Value>
            </S.TicketView>
            <S.TicketView>
              <S.Desc>Possibilty</S.Desc>
              <S.Value>AR 580</S.Value>
            </S.TicketView>
          </S.TicketInfo>
          <S.Row>
            <S.ColumnView>
              <S.Duration>
                Jessie J.{"\n"}
                <S.Desc>jessy@gmail.com</S.Desc>
              </S.Duration>
            </S.ColumnView>
            <S.Profile source={profile} />
          </S.Row>
          <S.Row>
            <S.ColumnView>
              <S.Duration>
                Andrea R.{"\n"}
                <S.Desc>andrea@gmail.com</S.Desc>
              </S.Duration>
            </S.ColumnView>
            <S.Profile source={nopic} />
          </S.Row>
          <S.TotalText>Total price</S.TotalText>
          <S.TotalValue>$ 1,536.00</S.TotalValue>
        </S.FlyInfoContent>
      </S.FlyInfo>
    </S.Container>
  );
}
