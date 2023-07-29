import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import LinearGradient from 'react-native-linear-gradient';
import {useQuery} from '@tanstack/react-query';
import {StackNavigationProp} from '@react-navigation/stack';
import FastImage from 'react-native-fast-image';

import {convertRating, convertTime, constants} from '../utils';
import {movieRequests} from '../API';

import {commonStyles, palette} from '../styles';
import {useMovie, useOrientation} from '../hooks';
import {AppStackParamList} from '../navigation/types';
import {Focused, Loader} from './ui';

type MoviePropsType = {
  movieId: string;
  navigation: StackNavigationProp<AppStackParamList, 'Details'>;
};

const MovieDetailsContent: FC<MoviePropsType> = ({movieId, navigation}) => {
  const {isPortrait, width, height} = useOrientation();
  const {navigate, getState, goBack} = navigation;

  const isHomeScreen =
    getState().routes[getState().routes.length - 2]?.name === 'Home';

  const {toggleMovie} = useMovie({isHomeScreen, goBack});

  const {data: movie, isLoading} = useQuery(['movies', movieId], () =>
    movieRequests.fetchMovieById(movieId),
  );

  const posterBoxStyle = {
    width: isPortrait ? '100%' : undefined,
    height: isPortrait ? undefined : height - 90,
    aspectRatio: constants.ASPECT_RATIO,
  };

  const infoContainerStyle = {
    width: isPortrait ? '100%' : '65%',
    paddingHorizontal: isPortrait ? 16 : 0,
  };

  return (
    <>
      {isLoading ? <Loader size={isPortrait ? width / 6 : height / 6} /> : null}
      {movie && (
        <View style={isPortrait ? styles.container : styles.containerRow}>
          <View style={[styles.posterBox, posterBoxStyle]}>
            <FastImage
              style={[styles.infoImage, {aspectRatio: constants.ASPECT_RATIO}]}
              resizeMode="cover"
              source={{uri: movie.poster[2]}}
            />
            <LinearGradient
              colors={['transparent', 'rgba(0, 0, 0, 0.6)']}
              style={styles.gradient}
            />
          </View>
          <View style={infoContainerStyle}>
            <View style={styles.item}>
              <Text style={styles.title}>{constants.fields.RATING}</Text>

              <View style={styles.contentColor}>
                <Text style={commonStyles.text}>
                  {convertRating(movie.rating || 0)}
                </Text>
              </View>
            </View>
            <View style={styles.item}>
              <Text style={styles.title}>{constants.fields.RELEASE_DATE}</Text>
              <Text style={styles.content}>{movie.releaseDate}</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.title}>{constants.fields.DURATION}</Text>
              <Text style={styles.content}>{convertTime(movie.duration)}</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.title}>{constants.fields.TITLE}</Text>
              <Text style={[styles.content, {textTransform: 'uppercase'}]}>
                {movie.title}
              </Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.title}>{constants.fields.GENRE}</Text>
              <Text style={styles.content}>
                {movie.genres.map(genre => genre).join(' | ')}
              </Text>
            </View>
            <View style={styles.container}>
              <Text style={styles.title}>{constants.fields.CASTS}</Text>
              <Text style={[styles.content, {lineHeight: 20}]}>
                {movie.casts?.slice(0, 10).join(', ')}
              </Text>
            </View>
            <View style={{...styles.container, marginTop: 10}}>
              <Text style={styles.title}>{constants.fields.ABOUT}</Text>
              <Text style={[styles.content, {lineHeight: 20}]}>
                {movie.desc}
              </Text>
            </View>
            <View style={styles.buttonBox}>
              <Focused
                hasTVPreferredFocus
                style={styles.button}
                focusedStyle={styles.buttonFocused}
                handlePress={() =>
                  navigate('Video', {
                    uri: movie.videos[0],
                  })
                }>
                <Octicons
                  name="play"
                  size={isPortrait ? 60 : 40}
                  color={palette.whiteColor}
                />
                <Text style={commonStyles.text}>WATCH</Text>
              </Focused>
              <Focused
                style={styles.button}
                focusedStyle={styles.buttonFocused}
                handlePress={() => toggleMovie(movie)}>
                <View
                  style={{
                    ...(isPortrait
                      ? styles.iconBoxCentered
                      : styles.iconBoxCenteredLand),
                  }}>
                  {isHomeScreen ? (
                    <Octicons
                      name="heart"
                      size={isPortrait ? 26 : 20}
                      color={palette.whiteColor}
                    />
                  ) : (
                    <Octicons
                      name="heart-fill"
                      size={isPortrait ? 26 : 20}
                      color={palette.whiteColor}
                    />
                  )}
                </View>
                <Text style={commonStyles.text}>
                  {isHomeScreen ? 'SAVE' : 'REMOVE'}
                </Text>
              </Focused>
            </View>
          </View>
        </View>
      )}
    </>
  );
};

export default MovieDetailsContent;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: 16,
    paddingVertical: 16,
  },
  containerRow: {
    flexDirection: 'row',
    gap: 16,
    paddingLeft: 16,
    paddingVertical: 16,
  },
  posterBox: {
    position: 'relative',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '100%',
  },

  infoImage: {
    width: '100%',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    width: 100,
    fontWeight: 'bold',
    fontSize: 14,
    color: palette.whiteColor,
  },
  content: {
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 16,
    color: palette.modalGreyText,
  },
  contentColor: {
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 5,
    backgroundColor: palette.accentColor,
  },
  buttonBox: {flexDirection: 'row', justifyContent: 'space-around'},
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 24,
    paddingVertical: 4,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: palette.whiteColor,
  },
  buttonFocused: {
    backgroundColor: palette.accentColor,
    borderColor: palette.accentColor,
  },
  iconBoxCentered: {
    borderWidth: 5.5,
    borderColor: palette.whiteColor,
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconBoxCenteredLand: {
    borderWidth: 3.5,
    borderColor: palette.whiteColor,
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
