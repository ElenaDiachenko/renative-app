import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { palette } from '../styles';

type Props = {};

const HomeScreen = (props: Props) => {
  return (
    <View>
      <Text style={{ color: palette.whiteColor }}>HomeScreen</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
