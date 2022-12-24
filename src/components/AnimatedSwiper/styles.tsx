import {Dimensions, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  cardView: {
    width: '100%',
    height: '100%',
  },
  emptyView: {
    width: '100%',
    height: Dimensions.get('screen').height - 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyViewText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
  },
  like: {
    position: 'absolute',
    top: 10,
    left: '4%',
    width: 160,
    height: 160,
    resizeMode: 'contain',
  },
  nope: {
    position: 'absolute',
    top: 10,
    right: '2%',
    width: 160,
    height: 160,
    resizeMode: 'contain',
  }
});
