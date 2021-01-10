import * as React from 'react';
import { Text } from 'react-native';
import Item from '../hoc/Item';

const Title = ({ index, text, color }) => {
  const TITLE_SIZE = 36;

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

export default Title;