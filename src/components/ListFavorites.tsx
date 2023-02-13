import React, { FC, useEffect, useState } from 'react';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { DETAIL_URL } from '../utils';
import IMovie from '../utils/types/Movie.type';
import IDetailMovie from "../utils/types/DetailMovie.type";

const ListFavorites: FC<IDetailMovie.KeyItem> = ({ imdbID }) => {
  const [movie, setMovie] = useState<IMovie.Item | null>(null);
  const { getItem, setItem } = useAsyncStorage('@favMovies');
  const navigation = useNavigation<any>();

  useEffect(() => {
    axios
      .get(DETAIL_URL(imdbID))
      .then(response => {
        if (response != null) {
          setMovie(response.data);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, [imdbID]);

  if (movie) {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => navigation.navigate('DETAIL', { paramKey: imdbID })}
        style={styles.mainCardView}>
        <Image
          style={styles.smallImage}
          resizeMode="contain"
          source={{ uri: movie.Poster }}
        />
      </TouchableOpacity>
    );
  } else {
    return <View />;
  }
};

const styles = StyleSheet.create({
  mainCardView: {
    shadowColor: '#000',
    width: '50%',
    paddingBottom: 16,
  },
  smallImage: {
    width: '100%',
    height: 264,
  },
});
export default ListFavorites;
