import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Easing,
  GestureResponderEvent,
  Image,
  PanResponder,
  Text,
  View,
} from 'react-native';
import {styles} from './styles';
import {ACTION_OFFSET, CARD} from '../../utils/constants';
import {AnimatedSwiperProps} from '../../models/animatedSwiper';

const AnimatedSwiper = ({
  data,
  renderItem,
  onSwipeRight,
  onSwipeLeft,
}: AnimatedSwiperProps) => {
  const swipe = useRef(new Animated.ValueXY()).current;
  const opacityController = useRef(new Animated.Value(0)).current;
  const rotateFactor = useRef(new Animated.Value(1)).current;
  const [firstIndex, setFirstIndex] = useState<number>(0);
  const [showNoMoreCards, setShowNoMoreCards] = useState<boolean>(false);
  const [showSecondCard, setShowSecondCard] = useState<boolean>(true);
  const firstIndexRef = useRef<number>(firstIndex);
  /**
   * on card release event.
   * @param e
   * @param dx
   * @param dy
   */
  const onPanResponderRelease = (
    e: Event,
    {dx, dy}: {dx: number; dy: number},
  ) => {
    const direction = Math.sign(dx);
    const userAction = Math.abs(dx) > ACTION_OFFSET;
    if (userAction) {
      moveToNextCard(direction, dy);
    } else {
      Animated.parallel([
        Animated.spring(swipe, {
          friction: 5,
          toValue: {
            x: 0,
            y: 0,
          },
          useNativeDriver: true,
        }),
        Animated.timing(opacityController, {
          duration: 400,
          toValue: 0,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  /**
   * Pan responder init.
   */
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
        return (
          Math.sqrt(
            Math.pow(gestureState.dx, 2) + Math.pow(gestureState.dy, 2),
          ) > 10
        );
      },
      onPanResponderMove: (
        e: GestureResponderEvent,
        {dx, dy, y0}: {dx: number; dy: number; y0: number},
      ) => {
        swipe.setValue({x: dx, y: dy});
        rotateFactor.setValue(y0 > CARD.HEIGHT / 2 ? 1 : -1);
        opacityController.setValue(dx);
      },
      onPanResponderRelease,
    }),
  ).current;
  /**
   * Swipe to the next card.
   * @param direction
   * @param dy
   */
  const moveToNextCard = (direction: number, dy: number) => {
    Animated.timing(swipe, {
      duration: 200,
      toValue: {
        x: direction * CARD.WIDTH * 2,
        y: dy,
      },
      useNativeDriver: true,
      easing: Easing.linear,
    }).start(transitionNext);
  };

  /**
   * Transition to the next card callback.
   */
  const transitionNext = () => {
    // @ts-ignore
    if (swipe.x._value) {
      // @ts-ignore
      if (swipe.x._value > 0) {
        onSwipeRight(data[firstIndexRef.current].id);
      }
      // @ts-ignore
      if (swipe.x._value < 0) {
        onSwipeLeft(data[firstIndexRef.current].id);
      }
    }
    setShowNoMoreCards(false);
    setFirstIndex(prev => prev + 1);
    swipe.setValue({x: 0, y: 0});
  };

  useEffect(() => {
    firstIndexRef.current = firstIndex;
    setShowSecondCard(data.length - 1 > firstIndex);
    setShowNoMoreCards(data.length - 1 < firstIndex);
  }, [data.length, firstIndex]);
  /**
   * Card rotate animation.
   */
  const rotate = Animated.multiply(swipe.x, rotateFactor).interpolate({
    inputRange: [-ACTION_OFFSET, 0, ACTION_OFFSET],
    outputRange: ['8deg', '0deg', '-8deg'],
  });

  /**
   * Card swipe animation with rotate left/right.
   */
  const animatedCardStyle = {
    transform: [...swipe.getTranslateTransform(), {rotate}],
  };

  /**
   * Like opacity animation.
   */
  const likeOpacity = swipe.x.interpolate({
    inputRange: [0, ACTION_OFFSET],
    outputRange: [0, 1],
  });

  /**
   * Nope opacity animation.
   */
  const nopeOpacity = swipe.x.interpolate({
    inputRange: [-ACTION_OFFSET, 0],
    outputRange: [1, 0],
  });

  return (
    <Animated.View style={styles.container}>
      {data?.length > 0 && !showNoMoreCards && (
        <React.Fragment>
          {showSecondCard &&
            renderItem({
              item: data[firstIndex + 1],
            })}
          <Animated.View
            style={[styles.cardView, {...animatedCardStyle}]}
            {...panResponder.panHandlers}>
            {renderItem({
              item: data[firstIndex],
            })}
            <View pointerEvents={'none'}>
              <Animated.View style={{opacity: likeOpacity}}>
                <Image
                  style={styles.like}
                  source={require('../../resources/images/like.png')}
                />
              </Animated.View>
              <Animated.View style={{opacity: nopeOpacity}}>
                <Image
                  style={styles.nope}
                  source={require('../../resources/images/nope.png')}
                />
              </Animated.View>
            </View>
          </Animated.View>
        </React.Fragment>
      )}
      {showNoMoreCards && (
        <View style={styles.emptyView}>
          <Text style={styles.emptyViewText}>No more people to show</Text>
        </View>
      )}
    </Animated.View>
  );
};

// @ts-ignore
export default AnimatedSwiper;
