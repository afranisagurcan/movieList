import React, {useEffect, useState} from 'react';
import axios from 'axios';
import AsyncStorage, {
  useAsyncStorage,
} from '@react-native-async-storage/async-storage';
import {
  Button,
  Image,
  RefreshControl,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";


type FavoritesProps = {
  imdbID: string;

};

function AddFavorite({imdbID}: FavoritesProps) {
  const [favorite, setFavorite] = useState(false);
  const [iconName,setIconName] = useState("heart-o");
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

    if (favorite)
      setIconName('heart');
  };

  useEffect(() => {
    getItem().then(res => {
      if (res != null && JSON.parse(res)?.includes(imdbID)) {
        setFavorite(true);
        setIconName('heart');
      }
    });
  }, []);

  return (
    <View style={{margin: 40}}>
      <TouchableOpacity
        onPress={writeItemToStorage}>
        <Icon name={iconName} size={30} color='red' />
      </TouchableOpacity>
    </View>
  );
}

export default AddFavorite;
