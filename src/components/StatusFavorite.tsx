import React, { useEffect, useState } from 'react';
import IDetailMovie from '../utils/types/DetailMovie.type';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

function StatusFavorite({ imdbID }: IDetailMovie.KeyItem) {
  const [favorite, setFavorite] = useState(false);
  const { getItem, setItem } = useAsyncStorage('@favMovies');

  useEffect(() => {
    getItem().then(res => {
      if (res === null) {
        setFavorite(false);
      } else {
        const favMovies = JSON.parse(res);
        if (favMovies.includes(imdbID)) {
          setFavorite(true);
        }
      }
    });
  });

  const handleRemoveFavorite = () => {
    getItem().then(res => {
      if (res) {
        const favMovies: string[] = JSON.parse(res);
        if (favMovies.includes(imdbID)) {
          const newList = favMovies.filter(movie => {
            return movie !== imdbID;
          });
          setItem(JSON.stringify(newList))
            .then(() => {
              setFavorite(false);
            })
            .catch(() => {
            });
        }
      }
    });
  };

  const handleAddToFavorite = () => {
    getItem().then(res => {
      if (res === null) {
        setItem(JSON.stringify([imdbID]));
        setFavorite(true);
      } else {
        const favMovies = JSON.parse(res);

        if (!favMovies.includes(imdbID)) {
          setItem(JSON.stringify([...favMovies, imdbID]))
            .then(() => {
              setFavorite(true);
            })
            .catch(() => {
            });
        }
      }
    });
  };
  return (
    <View>
      {favorite && (
        <View style={styles.container}>
          <Icon.Button
            onPress={handleRemoveFavorite}
            name={'minus'}
            color={'#000'}
            backgroundColor={'#989393'}>
            Remove From Favorites
          </Icon.Button>
        </View>
      )}
      {!favorite && (
        <View style={styles.container}>
          <Icon.Button
            onPress={handleAddToFavorite}
            name={'plus'}
            color={'#000'}
            backgroundColor={'#989393'}>
            Add To Favorites
          </Icon.Button>
        </View>
      )}
    </View>
  );
}

export default StatusFavorite;

const styles = StyleSheet.create({
  container: {
    margin: 40,
    alignItems: 'center',

  },

});
