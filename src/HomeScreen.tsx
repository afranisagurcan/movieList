import React, {useEffect, useState} from 'react';
import {
  Button,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

import axios from 'axios';
function HomeScreen({navigation}) {
  const [movies, setMovies] = useState([]);
  const url = 'https://www.omdbapi.com/?s=avatar&apikey=263d22d8';
  useEffect ( () => {
    axios
      .get(url)
      .then( response => { setMovies(response.data.Search) })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const Item = ({Title, Year, imdbID, Type, Poster}) => (

    <TouchableHighlight style={styles.container}>
      <View style={styles.mainCardView}>

        <Image style={styles.SmallImage} source={{uri: Poster}}/>
        <Text style={styles.TextArea}>

          Title : {Title} {'\n'}
          Released Date : {Year} {'\n'}
          Genre : {Type} {'\n\n\n'}

          <Button
            title="Show more details"
            onPress={() => navigation.navigate('Detail', {paramKey: imdbID})}
          />
        </Text>
      </View>
    </TouchableHighlight>
  );
  return (
    <SafeAreaView >
      <FlatList
        data= {movies}
        renderItem = { ({item})=>(
          <>
            <Item Title={item.Title} Year={item.Year}  imdbID={item.imdbID} Type={item.Type} Poster={item.Poster} />
          </>
        )}
        keyExtractor={(item,index) => "item-"+index}
      />
    </SafeAreaView>
  );
}

export default HomeScreen;


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: "#a0d1d7",
    paddingHorizontal: 20,
  },
  advice: {
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 20,
  },
  mainCardView: {
    height: 300,
    width: '100%',
    alignItems: 'center',
    backgroundColor: "#6bc6cc",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
    flexDirection: 'row',
    marginTop: 6,
    marginBottom: 6,
  },
  ImageBackground: {
    flex: 1,
    resizeMode: "cover",
    width: "100%",
    alignItems: "center",
  },
  SmallImage: {
    resizeMode: "cover",
    width: 150,
    height: 180,
    start: 5,
    top: -10
  },
  TextArea : {
    fontSize: 20,
    paddingTop:50,
    paddingBottom:10,
    paddingLeft: 20,
    start:5,
    flex: 1,
    flexWrap: 'wrap'
  },

});


