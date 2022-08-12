import React from "react";
import { Entypo } from "@expo/vector-icons";

import * as S from "./styles";

import logo from "../../assets/images/logo.png";
import airplane from "../../assets/images/airplane.png";

export default function Main() {
  return (
    <S.Container>
      <S.FlyInfo>
        <S.Content>
          <S.Logo source={logo} resizeMode="contain" />
          <S.TextRowContent>
            <S.TextContent>
              <S.SmallText>Los Angeles</S.SmallText>
              <S.LargeText>LAS</S.LargeText>
              <S.SmallText>24 Apr, 16:30</S.SmallText>
            </S.TextContent>
            <S.HourContent>
              <Entypo name="chevron-right" size={24} color="white" />
              <S.SmallText bold mt={5}>
                4h 15m
              </S.SmallText>
            </S.HourContent>
            <S.TextContent alingment="right">
              <S.SmallText>New York</S.SmallText>
              <S.LargeText>NYC</S.LargeText>
              <S.SmallText>20:45</S.SmallText>
            </S.TextContent>
          </S.TextRowContent>
          <S.Airplane source={airplane} resizeMode="contain" />
        </S.Content>
      </S.FlyInfo>
      <S.TicketInfo>
        <S.TicketView>
          <S.Desc>Flight</S.Desc>
          <S.Value>AR 580</S.Value>
        </S.TicketView>
        <S.TicketView>
          <S.Desc>Class</S.Desc>
          <S.Value>Premium{"\n"}Econim</S.Value>
        </S.TicketView>
        <S.TicketView>
          <S.Desc>Aircraft</S.Desc>
          <S.Value>AR 580</S.Value>
        </S.TicketView>
        <S.TicketView>
          <S.Desc>Possibilty</S.Desc>
          <S.Value>AR 580</S.Value>
        </S.TicketView>
      </S.TicketInfo>
      <S.Value>
        43h 15m <S.Desc>total duration</S.Desc>
      </S.Value>
    </S.Container>
  );
}
