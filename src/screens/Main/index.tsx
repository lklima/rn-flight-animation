import React, { useEffect, useState } from "react";
import {
  FadeOut,
  FlipOutXUp,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { StatusBar } from "react-native";
import { Entypo } from "@expo/vector-icons";

import * as S from "./styles";

import logo from "../../assets/images/logo.png";
import airplane from "../../assets/images/airplane.png";
import clouds from "../../assets/images/clouds.png";
import profile from "../../assets/images/profile.jpeg";
import nopic from "../../assets/images/nopic.jpeg";

import Button from "./components/Button";
import CardSelect from "./components/CardSelect";
import StatusContent from "./components/StatusContent";

export default function Main() {
  const backgroundColor = useSharedValue("white");
  const airplaneRotateZ = useSharedValue(0);
  const airplaneShadowY = useSharedValue(0);
  const airplaneShadowX = useSharedValue(0);

  const [showCardSelect, setShowCardSelect] = useState(false);
  const [confirm, setConfirm] = useState(true);

  const handleConfirm = () => {
    if (showCardSelect) {
      setShowCardSelect(false);
      setConfirm(true);
    } else {
      setShowCardSelect(true);
    }
  };

  useEffect(() => {
    backgroundColor.value = withTiming(confirm ? "#F1F1F1" : "white", { duration: 600 });
    if (confirm) {
      setTimeout(() => {
        airplaneRotateZ.value = withSequence(
          withTiming(-10, { duration: 4000 }),
          withTiming(-10, { duration: 2000 }),
          withTiming(0, { duration: 2000 })
        );

        airplaneShadowY.value = withTiming(200, { duration: 8000 });
      }, 6000);
    }
  }, [confirm]);

  const backgroundAnimatedStyle = useAnimatedStyle(() => ({
    backgroundColor: backgroundColor.value,
  }));

  const airplaneAnimatedStyle = useAnimatedStyle(() => {
    airplaneShadowX.value = interpolate(airplaneShadowY.value, [0, 200], [0, -400]);

    return {
      transform: [{ rotateZ: airplaneRotateZ.value + "deg" }],
      shadowOffset: { height: airplaneShadowY.value, width: airplaneShadowX.value },
    };
  });

  return (
    <>
      <S.Background style={backgroundAnimatedStyle} />
      <S.Container>
        <StatusBar barStyle="dark-content" />
        {!confirm && (
          <S.FlyInfo exiting={FlipOutXUp.duration(600)}>
            <S.Content>
              <S.Logo source={logo} resizeMode="contain" />
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
            </S.Content>
          </S.FlyInfo>
        )}
        <S.Airplane
          source={airplane}
          style={airplaneAnimatedStyle}
          resizeMode="contain"
        />
        <S.Cloud source={clouds} resizeMode="contain" />
        {!confirm && (
          <S.TicketInfo exiting={FlipOutXUp.duration(600)}>
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
        )}
        {!confirm && (
          <S.InfoContent exiting={FadeOut.duration(600)}>
            <S.Duration>
              43h 15m <S.Desc>total duration</S.Desc>
            </S.Duration>
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
            <S.TotalText>Total you will pay</S.TotalText>
            <S.TotalValue>$ 1,536.00</S.TotalValue>
          </S.InfoContent>
        )}
        {!confirm && <Button onPress={handleConfirm} />}
        {showCardSelect && <CardSelect />}
        {confirm && <StatusContent />}
      </S.Container>
    </>
  );
}
