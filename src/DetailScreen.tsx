import React, {useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

import axios from 'axios';

function DetailScreen({route}) {
  const [movie, setMovie] = useState(null);
  const imdbID = route.params.paramKey;
  const url = 'https://www.omdbapi.com/?i=' + imdbID +'&apikey=263d22d8';
  useEffect(() => {
    axios
      .get(url)
      .then(response => {
        setMovie(response.data);
      })
      .catch(error => {
        console.log(error);
      } )
  }, [] );

    return (

    <SafeAreaView style={styles.container} >
        {movie &&
            <View >
                <Text style={styles.TextArea}>Title : {movie.Title}</Text>
                <Text style={styles.TextArea}>Released Date : {movie.Year}</Text>
                <Text style={styles.TextArea}>Genre : {movie.Type}</Text>
                <Text style={styles.TextArea}>Actors : {movie.Actors}</Text>
                <Text style={styles.TextArea}>Country : {movie.Country}</Text>
                <Text style={styles.TextArea}>Plot : {movie.Plot}</Text>
                <Text style={styles.TextArea}>Awards : {movie.Awards}</Text>
                <Text style={styles.TextArea}>Imdb Rating : {movie.imdbRating}</Text>
                <Image style={styles.SmallImage} source={{uri: movie.Poster}} />

            </View>  }
    </SafeAreaView>

    );

  }

export default DetailScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#a0d1d7",
      alignItems: "center",
      justifyContent: "center",
    },
    advice: {
      fontSize: 20,
      fontWeight: "bold",
      marginHorizontal: 20,
    },
    ImageBackground: {
      flex: 1,
      resizeMode: "cover",
      width: "100%",
      alignItems: "center",
    },
    SmallImage: {
      width: 100,
      height: 100,
      start: 20,
    },
    TextArea : {
      fontSize: 20,
      paddingTop:10,
      paddingBottom:10,
      paddingLeft: 20,
    },

  });
