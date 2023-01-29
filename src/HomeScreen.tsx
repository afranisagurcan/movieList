import React, {useEffect, useState} from 'react';
import {
  Button,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
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

    <View  style={styles.container}>
      <Text>
        <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('Detail', {paramKey: imdbID}) }
                             style={styles.mainCardView}>
          <View >
            <Image style={styles.smallImage} source={{uri: Poster}}/>
            <Text style={styles.textArea}>{Title}</Text>

          </View>

        </TouchableOpacity>
      </Text>

    </View>
  );
  return (
    <SafeAreaView >
      <FlatList
        key={'item-'}
        data= {movies}
        renderItem = { ({item})=>(
          <>
            <Item Title={item.Title} Year={item.Year}  imdbID={item.imdbID} Type={item.Type} Poster={item.Poster} />
          </>
        )}
        keyExtractor={(item,index) => "item-"+index}
        numColumns={numColumns}
      />
    </SafeAreaView>
  );
}
const numColumns = 2 ;
export default HomeScreen;


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: "#cec3bd",
    paddingHorizontal: 20,
    flexWrap: "wrap",
    flex:1,
  },
  mainCardView: {
    height: 400,
    width: 170,
    paddingTop: 50,
    backgroundColor: "#cec3bd",
    borderRadius: 15,
    shadowColor: "#cec3bd",
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
    flexDirection: 'row',
    justifyContent:'space-between',
    marginTop: 6,
    marginBottom: 6,
    flexBasis: '50%',
  },
  smallImage: {
    resizeMode:"stretch",
    width: 170,
    height: 250,

  },
  textArea : {
    fontSize: 20,
    color:'#39729b',
    /*
    paddingTop:50,
    paddingBottom:10,
    paddingLeft: 20,
     */
    start:5,
    flex: 1,
    flexWrap: 'wrap'
  },

});


