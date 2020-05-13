import React, { Component } from 'react';
import {
  View,
  Animated,
  PanResponder,
  Dimensions,
  StyleSheet,
  UIManager,
  LayoutAnimation,
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

class Deck extends Component {
  static defaultProps = {
    onSwipeRight: () => {},
    onSwipeLeft: () => {},
    renderNomoreCard: () => {},
  };
  constructor(props) {
    super(props);
    const position = new Animated.ValueXY();
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          this.forceSwipe();
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          this.forceSwipe(false);
        } else {
          this.resetPosition();
        }
      },
    });
    this.state = { panResponder, position, index: 0 };
  }

  componentDidUpdate() {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.spring();
  }

  forceSwipe(right = true) {
    Animated.timing(this.state.position, {
      toValue: {
        x: right ? SCREEN_WIDTH : -SCREEN_WIDTH,
        y: 0,
      },
      duration: SWIPE_OUT_DURATION,
    }).start(() => this.onSwipeComplete(right));
  }

  onSwipeComplete(right) {
    const { onSwipeLeft, onSwipeRight, data } = this.props;
    const item = data[this.state.index];
    right === true ? onSwipeRight(item) : onSwipeLeft(item);
    this.state.position.setValue({ x: 0, y: 0 });
    this.setState({ index: this.state.index + 1 });
  }

  resetPosition() {
    Animated.spring(this.state.position, { toValue: { x: 0, y: 0 } }).start();
  }

  getCardStyle() {
    const { position } = this.state;
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ['-120deg', '0deg', '120deg'],
    });

    return {
      ...this.state.position.getLayout(),
      transform: [{ rotate }],
    };
  }

  renderCards() {
    if (this.state.index >= this.props.data.length) {
      return this.props.renderNomoreCard();
    }

    return (
      <View style={styles.container}>
        {this.props.data
          .map((item, i) => {
            if (i < this.state.index) return null;
            if (i === this.state.index) {
              return (
                <Animated.View
                  key={item.id}
                  style={[this.getCardStyle(), styles.card]}
                  {...this.state.panResponder.panHandlers}
                >
                  {this.props.renderCard(item)}
                </Animated.View>
              );
            }

            return (
              <Animated.View
                key={item.id}
                style={[styles.cardStyle, { top: (i - this.state.index) * 10 }]}
              >
                {this.props.renderCard(item)}
              </Animated.View>
            );
          })
          .reverse()}
      </View>
    );
  }

  render() {
    return this.renderCards();
  }
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  cardStyle: {
    position: 'absolute',
    width: SCREEN_WIDTH,
  },
});
export default Deck;
