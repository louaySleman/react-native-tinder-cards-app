import {StyleSheet} from 'react-native';
import {CARD} from '../../utils/constants';

export const styles = StyleSheet.create({
  card: {
    width: CARD.WIDTH,
    height: CARD.HEIGHT,
    borderRadius: CARD.BORDER_RADIUS,
    position: 'absolute',
    left: '2%',
    top: '1%',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: CARD.BORDER_RADIUS,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    position: 'absolute',
    bottom: '2%',
    left: '2%',
  },
});
