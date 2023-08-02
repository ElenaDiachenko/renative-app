import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { palette } from '../styles';
import { movieRequests } from '../API';
import { useQuery } from '@tanstack/react-query';

import { initialState } from '../stores/createMovieSlice';

type Props = {};

const HomeScreen = (props: Props) => {
  // const { data, isLoading, isError, isSuccess } = useQuery(['movies'], () =>
  //   movieRequests.fetchMovies(initialState),
  // );
  // console.log(data, 'MOVIES');
  return (
    <View>
      <Text style={{ color: palette.whiteColor }}>HomeScreen</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
