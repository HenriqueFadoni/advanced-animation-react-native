import * as React from 'react';
import { Text } from 'react-native';
import Item from '../hoc/Item';

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

export default Description;