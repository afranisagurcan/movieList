import React, { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView, ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from "react-native";

import axios from "axios";

function DetailScreen({ route }) {
  const [movie, setMovie] = useState(null);
  const imdbID = route.params.paramKey;
  const url = "https://www.omdbapi.com/?i=" + imdbID + "&apikey=263d22d8";
  useEffect(() => {
    axios
      .get(url)
      .then(response => {
        setMovie(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (

    <View style={styles.container}>
      {movie &&
        <SafeAreaView>
          <ScrollView>
            <View style={{
              width:"100%",
              flex:1,
              flexDirection:"row",
              justifyContent: 'center'
            }}>
              <Image style={styles.smallImage} source={{ uri: movie.Poster }} />
            </View>
            <View style={{ padding: 12 }}>
              <ContentItem title="Title" content={movie.Title}/>
              <ContentItem title="Released Date" content={movie.Year}/>
              <ContentItem title="Genre" content={movie.Type}/>
              <ContentItem title="Actors" content={movie.Actors}/>
              <ContentItem title="Country" content={movie.Country}/>
              <ContentItem title="Plot" content={movie.Plot}/>
              <ContentItem title="Awards" content={movie.Awards}/>
              <ContentItem title="Imdb Rating" content={movie.imdbRating}/>
            </View>
          </ScrollView>
        </SafeAreaView>
      }
    </View>

  );

}

const ContentItem = ({title, content})=> {
  return  <View style={{ flexDirection: "column", paddingBottom: 16 }}>
    <Text style={styles.textAreaBold}>{title}</Text>
    <Text style={ {fontSize: 20 , color:'#535359FF'} }>{content}</Text>
  </View>
};
export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center"
  },
  smallImage: {
    flex: 1,
    aspectRatio: 1.5,
    resizeMode: 'contain',
  },
  textAreaBold: {
    fontSize: 20,
    color:'#535359FF',
    fontWeight: "bold"
  },

});
