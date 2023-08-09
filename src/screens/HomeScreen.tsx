import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { palette } from '../styles';
import { fetchMovies } from '../API/movieRequests';
import { useQuery } from '@tanstack/react-query';

import { initialState } from '../stores/createMovieSlice';
import { MovieDataType } from '../types';
import { movieRequests } from '../API';

type Props = {};

const HomeScreen = (props: Props) => {
  // const { data, isLoading, isError, isSuccess } = useQuery(['movies'], () =>
  //   fetchMovies(initialState),
  // );
  // console.log(data, 'MOVIES');
  const [moviesData, setMoviesData] = useState<MovieDataType | []>([]);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const data = await movieRequests.fetchMovies(initialState);

  //       if (data) setMoviesData(data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   })();
  // }, []);
  // console.log(moviesData);

  return (
    <View>
      <Text style={{ color: palette.whiteColor }}>HomeScreen</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
