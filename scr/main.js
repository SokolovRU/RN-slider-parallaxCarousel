import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useCallback } from "react/cjs/react.development";
import { scale, verticalScale } from "./adaptiveSize";
export const MainScreen = () => {
  const cards = [
    {
      id: 0,
      block: (
        <>
          <Animated.View style={styles.header1}>
            <Text style={{ fontSize: verticalScale(28), color: "#FFF" }}>
              Do you love nature?
            </Text>
          </Animated.View>
          <Text style={styles.mainText1}>
            Maybe then you need to go camping?
          </Text>
          <Animated.Image
            source={{
              uri: "https://images.unsplash.com/photo-1652297866759-a0121b63d041?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
            }}
            style={styles.main1}
          />
        </>
      ),
    },
    {
      id: 1,
      block: (
        <Animated.View style={styles.card}>
          <Animated.Image
            source={{
              uri: "https://images.unsplash.com/photo-1652428068435-9a8043360b4e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
            }}
            style={styles.main2}
          />
          <Animated.View style={styles.header2}>
            <Text
              style={{
                fontSize: verticalScale(28),
                color: "#FFF",
                textAlign: "center",
              }}
            >
              Take a break from the hustle and bustle
            </Text>
          </Animated.View>
          <Text style={styles.mainText2}>
            Great view, fresh air and relaxation
          </Text>
        </Animated.View>
      ),
    },
    {
      id: 2,
      block: (
        <Animated.View style={styles.card}>
          <Animated.Image
            source={{
              uri: "https://images.unsplash.com/photo-1652372167945-0c711b065450?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2069&q=80",
            }}
            style={styles.main3}
          />
          <Text style={styles.mainText3}>Start your vacation with us</Text>
        </Animated.View>
      ),
    },
  ];

  const { width: widthSize, height: heightSize } = Dimensions.get("window");

  const translateX = useSharedValue(0);

  const activeIndex = useDerivedValue(() => {
    return translateX.value / widthSize;
  });
  
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      translateX.value = event.contentOffset.x;
    },
  });
    
  const scrollRef = useAnimatedRef();
  const onNextPress = useCallback(() => {
    scrollRef.current.scrollTo({x: widthSize * (activeIndex.value + 1)})
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <Animated.ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={{ flex: 1 }}
        scrollEventThrottle={16}
        onScroll={scrollHandler}
        ref={scrollRef}
      >
        {cards.map((cards, id) => {
          const styleCards = useAnimatedStyle(() => {
            const inputRange = [
              widthSize * (id - 1),
              widthSize * id,
              widthSize * (id + 1),
            ];
            const outputRange = interpolate(
              translateX.value,
              inputRange,
              [-widthSize * 0.5, 0, widthSize * 0.5],
              Extrapolate.CLAMP
            );
            return {
              transform: [{ translateX: outputRange }],
            };
          });
          return (
            <View
              style={{
                width: widthSize,
                height: heightSize,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#000",
                overflow: "hidden",
              }}
              key={id.toString()}
            >
              <Animated.View style={[styles.card, styleCards]}>
                {cards.block}
              </Animated.View>
            </View>
          );
        })}
      </Animated.ScrollView>
      <Animated.View style={styles.footer}>
        <Animated.View style={{flexDirection: 'row'}}>
          {cards.map((cards, id) => {
            const stylePosition = useAnimatedStyle(() => {
              const isActive = activeIndex.value === id;
              return {
                backgroundColor: isActive
                  ? "rgba(255, 255, 255, 0.5)"
                  : "rgba(255, 255, 255, 0.1)",
            };
            });
            return (
              <Animated.View key={id.toString()}>
                <Animated.View style={[styles.activePoz, stylePosition]} />
              </Animated.View>
            );
          })}
        </Animated.View>
        <Animated.View>
          <TouchableOpacity onPress={onNextPress}>
            <Text style={{color: '#FFF', fontSize: verticalScale(24)}}>NEXT</Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    width: scale(350),
    height: verticalScale(600),
    borderRadius: 24,
    alignItems: "center",
  },
  header1: {
    width: scale(320),
    height: verticalScale(60),
    marginTop: verticalScale(20),
    justifyContent: "center",
    alignItems: "center",
  },
  header2: {
    width: scale(340),
    height: verticalScale(90),
    marginTop: verticalScale(60),
    justifyContent: "center",
    alignItems: "center",
  },
  main1: {
    width: scale(350),
    height: verticalScale(440),
    backgroundColor: "blue",
    marginTop: verticalScale(80),
    borderTopRightRadius: 350,
    borderRadius: 24,
  },

  main2: {
    width: scale(350),
    height: verticalScale(400),
    backgroundColor: "blue",
    borderRadius: 24,
    borderBottomRightRadius: 350,
  },
  main3: {
    width: scale(350),
    height: verticalScale(600),
    backgroundColor: "blue",
    borderRadius: 24,
    position: "absolute",
  },
  footer: {
    width: scale(320),
    height: verticalScale(50),
    marginTop: verticalScale(20),
    flexDirection: "row",
    marginBottom: verticalScale(20),
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
  },
  mainText1: {
    color: "#FFF",
    fontSize: verticalScale(20),
    position: "absolute",
    marginTop: verticalScale(150),
    paddingLeft: scale(140),
    marginRight: scale(20),
    textAlign: "right",
  },
  mainText2: {
    color: "#FFF",
    fontSize: verticalScale(20),
    position: "absolute",
    marginTop: verticalScale(360),
    paddingLeft: scale(180),
    marginRight: scale(20),
    textAlign: "right",
  },
  mainText3: {
    color: "#FFF",
    fontSize: verticalScale(26),
    marginTop: verticalScale(360),
    textAlign: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 5,
    borderRadius: 14,
  },
  activePoz: {
    width: scale(20),
    height: verticalScale(20),
    borderRadius: 50,
    marginHorizontal: 2,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
});
