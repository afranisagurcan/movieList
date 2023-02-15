import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import ListFavorites from '../components/ListFavorites';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';

function FavoriteScreen() {
  const [favorites, setFavorites] = useState([]);
  const { getItem } = useAsyncStorage('@favMovies');

  useEffect(() => {
    getItem().then(res => {
      if (res != null) {
        const favMovies = JSON.parse(res);
        setFavorites(favMovies);
      }
    });
  }, [favorites]);

  return (
    <FlatList
      style={{ backgroundColor: '#000', paddingVertical: 16 }}
      data={favorites}
      renderItem={({ item }) => <ListFavorites imdbID={item} />}
      numColumns={2}
    />
  );
}

export default FavoriteScreen;
