import React, { useState, FC, useEffect } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { shallow } from 'zustand/shallow';
import { useStore } from '../stores/store';
import { CustomHeader, Focused, GenreList } from './ui';
import Search from './Search';
import { commonStyles, palette } from '../styles';
import Sort from './ui/Sort';
import { constants } from '../utils';
import { useRoute } from '@react-navigation/native';
import { AppStackScreenProps } from '../navigation/types';
import Feather from 'react-native-vector-icons/Feather';
import { useFocusState } from '../hooks';

type ActionSectionProps = {};
const initialQuery = {
  keyword: '',
  genre: '',
};
export type InitialQueryType = typeof initialQuery;

const ActionSection: FC<ActionSectionProps> = () => {
  const [isFocusedMenu, handleFocusChangeMenu] = useFocusState();

  const { name: route } = useRoute<AppStackScreenProps<'Home'>['route']>();
  const [query, setQuery] = useState(initialQuery);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const {
    searchParameters,
    setSearchParameters,
    setLibrarySearchParameters,
    librarySearchParameters,
  } = useStore(
    (state) => ({
      searchParameters: state.searchParameters,
      setSearchParameters: state.setSearchParameters,
      librarySearchParameters: state.librarySearchParameters,
      setLibrarySearchParameters: state.setLibrarySearchParameters,
    }),
    shallow,
  );

  const handleFilters = () => {
    setIsFilterOpen((prev) => !prev);
  };

  const handleSearch = (searchQuery: string) => {
    const evalGenre = searchQuery === 'all genres' ? '' : searchQuery;
    if (route === 'Home') {
      const updatedSearchParams = {
        ...searchParameters,
        query: evalGenre,
        page: 1,
      };
      setSearchParameters(updatedSearchParams);
      handleFilters();
    } else {
      const updatedSearchParams = {
        ...librarySearchParameters,
        query: evalGenre,
        page: 1,
      };
      setLibrarySearchParameters(updatedSearchParams);
      handleFilters();
    }
  };

  const sortState = {
    sort: searchParameters.sort,
    order: searchParameters.order,
  };

  const handleSort = (newSortState: typeof sortState) => {
    const updatedSearchParams = {
      ...searchParameters,
      ...newSortState,
      page: 1,
    };
    setSearchParameters(updatedSearchParams);
    handleFilters();
  };

  useEffect(() => {
    if (!searchParameters && !librarySearchParameters) {
      return;
    }

    const queryValue =
      route === 'Home'
        ? searchParameters?.query || ''
        : librarySearchParameters?.query || '';

    const isGenre = constants.genreList.some(
      (item) => item.value === queryValue,
    );
    const updatedQuery = {
      genre: isGenre ? queryValue : '',
      keyword: isGenre ? '' : queryValue,
    };

    setQuery(updatedQuery);
  }, [librarySearchParameters, searchParameters, route]);

  return (
    <View style={[!isFilterOpen ? styles.containerRow : styles.container]}>
      <Focused
        handlePress={handleFilters}
        style={{ ...styles.menu }}
        onFocus={() => handleFocusChangeMenu(true)}
        onBlur={() => handleFocusChangeMenu(false)}
      >
        <Feather
          name="menu"
          size={26}
          color={isFocusedMenu ? palette.accentColor : palette.whiteColor}
        />
      </Focused>

      {isFilterOpen ? (
        <>
          <View style={{ width: '100%' }}>
            <GenreList query={query.genre} handleChange={handleSearch} />
          </View>

          <View style={styles.innerContainer}>
            <Search
              handleChange={handleSearch}
              setMessage={setErrorMessage}
              query={query.keyword}
            />
            {route === 'Home' ? (
              <Sort
                data={constants.sortList}
                sortState={sortState}
                handleChange={handleSort}
              />
            ) : null}
          </View>

          <Text style={{ ...commonStyles.text }}>{errorMessage}</Text>
        </>
      ) : (
        <CustomHeader />
      )}
    </View>
  );
};

export default ActionSection;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    paddingHorizontal: 10,
    flexDirection: 'column',
    gap: 10,
    width: '100%',
  },
  containerRow: {
    marginTop: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menu: {
    padding: 10,
    width: 45,
    height: 45,
    alignContent: 'center',
  },
});
