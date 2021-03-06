import * as React from 'react';
import {
  StatusBar,
  Dimensions,
  Easing,
  Animated,
  Image,
  Button,
  View,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import data from './data';
import { FlingGestureHandler, State, Directions } from 'react-native-gesture-handler'
import { Transition, Transitioning } from 'react-native-reanimated';
import posed, { Transition as PoseTransitions } from 'react-native-pose';
import Title from './components/Title';
import Description from './components/Description';
import Details from './components/Details/Details';

const { width, height } = Dimensions.get('window');

const DURATION = 700;
const IMAGE_SIZE = width * 0.8;

const colors = {
  lightBg: '#F2F2F2',
  darkBg: '#2C2D51',
  lightText: '#E5E5DD',
  darkText: '#A5A6AA',
};

const transition = (
  <Transition.Together>
    <Transition.Out
      type='slide-bottom'
      duration={DURATION}
      interpolation='easeIn'
    />
    <Transition.Change />
    <Transition.In
      type='slide-bottom'
      duration={DURATION}
      interpolation='easeOut'
    />
  </Transition.Together>
);

const config = {
  transition: {
    type: 'tween',
    duration: DURATION,
    easing: Easing.elastic(0.9)
  }
}

const PosedView = posed.View({
  enter: {
    opacity: 1,
    rotate: '0deg',
    ...config
  },
  exit: {
    opacity: 0,
    rotate: '180deg',
    ...config
  }
})

export default function App() {
  const ref = React.useRef();
  const [index, setIndex] = React.useState(0);
  const color = index % 2 === 1 ? colors.lightText : colors.darkText;
  const headingColor = index % 2 === 1 ? colors.lightText : colors.darkText;

  const activeIndex = React.useRef(new Animated.Value(0)).current;
  const animation = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(animation, {
      toValue: activeIndex,
      duration: DURATION * 0.5,
      useNativeDriver: true
    }).start();

    StatusBar.setBarStyle(index % 2 === 0 ? 'dark-content' : 'light-content', true);
  });

  const setActiveIndex = React.useCallback(newIndex => {
    activeIndex.setValue(newIndex);
    ref.current.animateNextTransition();
    setIndex(newIndex);
  });

  const translateY = animation.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [height, 0, -height]
  });

  return (
    <FlingGestureHandler
      key="up"
      direction={Directions.UP}
      onHandlerStateChange={ev => {
        if (ev.nativeEvent.state === State.END) {
          if (index === data.length - 1) {
            return;
          }
          setActiveIndex(index + 1)
        }
      }}
    >
      <FlingGestureHandler
        key="down"
        direction={Directions.DOWN}
        onHandlerStateChange={ev => {
          if (ev.nativeEvent.state === State.END) {
            if (index === 0) {
              return;
            }
            setActiveIndex(index - 1)
          }
        }}
      >
        <SafeAreaView style={styles.container}>
          <Animated.View
            style={[
              StyleSheet.absoluteFillObject,
              {
                height: height * data.length,
                transform: [{ translateY }]
              }
            ]}
          >
            {
              data.map((_, i) => {
                return (
                  <View
                    key={i}
                    style={{
                      height,
                      backgroundColor: i % 2 === 0 ? colors.lightBg : colors.darkBg,
                    }}
                  ></View>
                )
              })
            }
          </Animated.View>
          <PoseTransitions>
            {index % 2 === 0 ? <PosedView
              key='image0'
              style={[
                styles.imageContainer,
                { borderColor: index % 2 === 0 ? colors.darkBg : colors.lightBg }
              ]}>
              <Image source={{ uri: data[index].image }} style={styles.image} />
            </PosedView> : <PosedView
              key='image1'
              style={[
                styles.imageContainer,
                { borderColor: index % 2 === 0 ? colors.darkBg : colors.lightBg }
              ]}>
                <Image source={{ uri: data[index].image }} style={styles.image} />
              </PosedView>}
          </PoseTransitions>
          <Transitioning.View
            ref={ref}
            transition={transition}
            style={{
              padding: 20,
              flex: 1,
              justifyContent: 'space-evenly'
            }}
          >
            <Title
              color={headingColor}
              index={index}
              text={data[index].title}
            />
            <Details
              color={color}
              index={index}
            />
            <Description
              index={index}
              text={data[index].description}
              color={headingColor}
            />
          </Transitioning.View>
        </SafeAreaView>
      </FlingGestureHandler>
    </FlingGestureHandler>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  imageContainer: {
    width: 400,
    height: 400,
    right: '-50%',
    position: 'absolute',
    justifyContent: 'center',
    borderRadius: 200,
    borderStartWidth: 3
  },
  image: {
    width: 350,
    height: 350,
    marginLeft: 20,
    borderRadius: 200
  }
});
