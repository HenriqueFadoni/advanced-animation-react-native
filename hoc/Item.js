import * as React from 'react';
import { View } from 'react-native';

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

export default Item;
