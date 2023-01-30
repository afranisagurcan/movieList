import React, {useEffect, useState} from 'react';
import {
  Button,
  FlatList,
  Image,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';

import axios from 'axios';

function HomeScreen({navigation}) {
  const [movies, setMovies] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  }, []);


  const url = 'https://www.omdbapi.com/?s=star&apikey=263d22d8';
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
        <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('DETAIL', {paramKey: imdbID}) }
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
    <SafeAreaView style={{backgroundColor:'#000'}} >
        <FlatList
          key={'item-'}
          data={movies}
          renderItem = { ({item})=>(
            <>
              <Item Title={item.Title} Year={item.Year}  imdbID={item.imdbID} Type={item.Type} Poster={item.Poster} />
            </>
          )}
          keyExtractor={(item,index) => "item-"+index}
          numColumns={2}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh}
                            tintColor="#fff"
                            backgroundColor='#000'
            />
          }
        />

    </SafeAreaView>
  );
}
export default HomeScreen;


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: "#000",
    paddingHorizontal: 20,
    flexWrap: "wrap",
    flex:1,
  },
  mainCardView: {
    height: 350,
    width: 170,
    paddingTop: 50,
    backgroundColor: "#000",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
    flexDirection: 'row',
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
    fontSize: 16,
    color:'#989393',
    textAlign: 'center',

  },

});


