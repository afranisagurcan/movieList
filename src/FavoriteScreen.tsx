import React, {useEffect, useState} from 'react';
import AddFavorite from "../components/AddFavorite";
import { FlatList, Image, RefreshControl, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Rating from "../components/Rating";
import ListFavorites from "../components/ListFavorites";

function FavoriteScreen({route}:any){

  const movies = route.params.paramKey;

  const Item = ({Title, Year, imdbID, Poster} : any) => (
    <View style={styles.container}>
      <Text>
        <ListFavorites Title={Title} Year={Year} imdbID={imdbID} Poster={Poster}></ListFavorites>
      </Text>

    </View>
  );

  return (
    <View style={{backgroundColor:'#000'}}>
      <FlatList
        data={movies}
        renderItem={({item}:any) => (
          <Item
            Title={item.Title}
            Year={item.Year}
            imdbID={item.imdbID}
            Poster={item.Poster}
          />
        )}
      >

      </FlatList>
    </View>
  );

}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#000',
    paddingHorizontal: 20,
    flexWrap:'wrap',
    flex: 1,
  },

});

export default FavoriteScreen;
