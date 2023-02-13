import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import ListFavorites from "../components/ListFavorites";
import { useAsyncStorage } from '@react-native-async-storage/async-storage';


function FavoriteScreen() {
  const [favorites, setFavorites] = useState([]);
  const { getItem} = useAsyncStorage('@favMovies');

  useEffect(() => {
    getItem().then(res => {
      if (res != null) {
        const favMovies = JSON.parse(res);
        setFavorites(favMovies);
      }
    });
  }, []);

  return (
    <FlatList
      style={styles.flatList}
      contentContainerStyle={styles.container}
      data={favorites}
      renderItem={({ item }) => (
        <ListFavorites
          imdbID={item}
        />
      )}
      numColumns={2} />
  );
}

const styles = StyleSheet.create({
  flatList: {
    backgroundColor: "#000",
    paddingVertical: 16
  },
  container: {}
});

export default FavoriteScreen;
