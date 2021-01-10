import * as React from 'react';
import { Text, View } from 'react-native';
import Item from '../../hoc/Item';
import data, { detailsList, iconsByType } from '../../data';
import Icon from './Icon/Icon';

const Details = ({ color, index }) => {
  const SPACING = 80;
  
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

export default Details;