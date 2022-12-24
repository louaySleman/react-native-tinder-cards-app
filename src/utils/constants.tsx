import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('screen');

export const CARD = {
  WIDTH: width * 0.96,
  HEIGHT: height * 0.9,
  BORDER_RADIUS: 20,
  OUT_OF_SCREEN: width + 0.5 * width,
};

export const ACTION_OFFSET = 100;

export const COLORS = {
  like: '#20ed00',
  nope: '#ff002f',
};
