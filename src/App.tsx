import React from 'react';
import {SafeAreaView, View} from 'react-native';
import {data} from './static/data';
import CardItem from './components/CardItem';
import AnimatedSwiper from './components/AnimatedSwiper';
import {CardItemProps} from './models/cardItem';

const App = () => {
  return (
    <SafeAreaView>
      <AnimatedSwiper
        data={data}
        renderItem={({item}: {item: CardItemProps}) => (
          <CardItem image={item?.image} name={item?.name} />
        )}
        onSwipeRight={(id) => console.log('right', id)}
        onSwipeLeft={(id) => console.log('swipe left', id)}
      />
    </SafeAreaView>
  );
};

export default App;
