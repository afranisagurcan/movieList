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
import Rating from "./Rating";


function ListFavorites({Title,Year,imdbID,Poster}: any) {
  const [favorite, setFavorite] = useState(false);
  const { getItem, setItem } = useAsyncStorage('@favMovies');

  const readItemToStorage = () => {
    getItem().then(res => {
      const favMovies = JSON.parse(res);
      if (favMovies.includes(imdbID)) {
        setFavorite(true);
      }

    })
  };

  useEffect(() => {
    readItemToStorage();
  }, []);


  return (
    <View style={styles.container}>
      {
        favorite && (
          <View
          style={styles.mainCardView}>
          <View>
            <Image style={styles.smallImage} source={{uri: Poster}} />
            <Text style={styles.textArea}>{Title}</Text>
          </View>
        </View>
        )
      }
    </View>
  );

}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#000',
    paddingHorizontal: 20,
    textAlign:'center',
    flex: 1,
  },
  mainCardView: {
    height: '100%',
    width:'100%',
    paddingTop: 50,
    backgroundColor: '#000',
    color:'#fff',
    shadowColor: '#000',
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
    flexDirection: 'row',
    marginTop: 6,
    marginBottom: 6,
  },
  smallImage: {
    resizeMode: 'stretch',
    width: 160,
    height: 250,
  },
  textArea: {
    fontSize: 16,
    color: '#989393',
    textAlign:'auto',
    paddingVertical: 20,
  },
});
export default ListFavorites ;
