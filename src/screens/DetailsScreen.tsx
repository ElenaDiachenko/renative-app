import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { palette } from '../styles';

const DetailsScreen = () => {
  return (
    <View>
      <Text style={{ color: palette.whiteColor }}>DetailsScreen</Text>
    </View>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.mainBgColor,
  },
});
