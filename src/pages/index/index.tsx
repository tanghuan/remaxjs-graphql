import * as React from 'react';
import { View, Text, Image } from 'remax/wechat';
import { useHelloQuery } from '../../generated/graphql';
import styles from './index.css';

export default () => {
  const { loading, error, data } = useHelloQuery();
  if (loading) {
    return <View>Loading...</View>;
  }
  if (error) {
    return <View>Load Error</View>;
  }
  return <View>{data?.hello}</View>;
};
