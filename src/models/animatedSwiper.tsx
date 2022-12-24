export interface AnimatedSwiperProps {
  data: any[];
  renderItem: ({item}: {item: any}) => JSX.Element;
  onSwipeRight: (id: number) => void;
  onSwipeLeft: (id: number) => void;
}
