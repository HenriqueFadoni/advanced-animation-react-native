import * as React from 'react';
import {
  StatusBar,
  Dimensions,
  Easing,
  Animated,
  Image,
  Button,
  Text,
  View,
  StyleSheet,
  SafeAreaView
} from 'react-native';
import data, { detailsList, iconsByType } from './data';
import { SimpleLineIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const DURATION = 700;
const TITLE_SIZE = 36;
const SPACING = 80;
const IMAGE_SIZE = width * 0.8;

const colors = {
  lightBg: '#F2F2F2',
  darkBg: '#2C2D51',
  lightText: '#E5E5DD',
  darkText: '#A5A6AA',
};

const Item = ({ children, style }) => {
  return (
    <View
      style={[
        {
          justifyContent: 'center',
          overflow: 'hidden',
          backgroundColor: 'transparent'
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

const Icon = ({ type }) => {
  return (
    <SimpleLineIcons
      name={type}
      size={26}
      color="#A5A6AA"
      style={{
        marginRight: 15,
        height: 26
      }}
    />
  );
};

const Description = ({ index, text, color }) => {
  return (
    <Item>
      <Text
        key={`description-${index}`}
        style={{
          fontSize: 16,
          color
        }}
      >
        {text}
      </Text>
    </Item>
  );
};

const Title = ({ index, text, color }) => {
  return (
    <Item style={{ height: TITLE_SIZE * 3, justifyContent: 'flex-end' }}>
      <Text
        key={`title-${index}`}
        style={{
          fontSize: TITLE_SIZE,
          fontWeight: '900',
          color
        }}
      >
        {text}
      </Text>
    </Item>
  )
}

const Details = ({ color, index }) => {
  return (
    <View style={{ marginVertical: SPACING }}>
      {detailsList.map(key => {
        return (
          <View
            key={key}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 25,
            }}
          >
            <Icon type={iconsByType[key]} />
            <Item style={{
              flex: 1,
              height: 26,
              justifyContent: 'center'
            }}>
              <Text
                key={`${key}-${index}`}
                style={{ fontSize: 16, color, fontWeight: '700' }}
              >
                {data[index][key]}
              </Text>
            </Item>
          </View>
        );
      })}
    </View>
  )
}

export default function App() {
  const [index, setIndex] = React.useState(0);
  const color = index % 2 === 1 ? colors.lightText : colors.darkText;
  const headingColor = index % 2 === 1 ? colors.lightText : colors.darkText;

  return (
    <SafeAreaView style={styles.container}>
      <View style={[
        styles.imageContainer,
        { borderColor: index % 2 === 0 ? colors.darkBg : colors.lightBg }
      ]}>
        <Image source={{ uri: data[index].image }} style={styles.image} />
      </View>
      <View
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
      </View>
    </SafeAreaView>
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
  imageContainer:{
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
