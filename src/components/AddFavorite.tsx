import React, {useEffect, useState} from 'react';
import axios from 'axios';
import AsyncStorage, {
  useAsyncStorage,
} from '@react-native-async-storage/async-storage';
import {
  Button,
  StyleSheet,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import IDetailMovie from "../utils/types/DetailMovie.type";

function AddFavorite({imdbID}: IDetailMovie.KeyItem) {
  const [favorite, setFavorite] = useState(false);
  const {getItem, setItem} = useAsyncStorage('@favMovies');

  const writeItemToStorage = () => {
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
            .catch(() => {});
        }
      }
    });
  };

  useEffect(() => {
    getItem().then(res => {
      if (res != null && JSON.parse(res)?.includes(imdbID)) {
        setFavorite(true);
      }
    });
  }, []);

  return (
    <View>
      {!favorite && (
        <View style={styles.container}>
          <Icon.Button
            onPress={writeItemToStorage}
            name={'plus'}
            color={'#000'}
            backgroundColor={'#989393'}>
            Add To Favorites
          </Icon.Button>
        </View>
      )}

      {favorite && (
        <View style={styles.container}>
          <Icon.Button
            name={'check'}
            color={'#000'}
            backgroundColor={'#989393'}>
            Added To Favorites
          </Icon.Button>
        </View>
      )}
    </View>
  );
}

export default AddFavorite;

const styles = StyleSheet.create({
  container: {
    margin: 40,
    alignItems: 'center',
  },
});
