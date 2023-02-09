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
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import axios from 'axios';
import Rating from '../components/Rating';

function HomeScreen({navigation}:any) {
  const [movies, setMovies] = useState([]);
  const [ids, setIds] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    axios
      .get(url)
      .then(response => {
        setMovies(response.data.Search);
        setRefreshing(false);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const url = 'https://www.omdbapi.com/?s=star&apikey=263d22d8';
  useEffect(() => {
    axios
      .get(url)
      .then(response => {
        setMovies(response.data.Search);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  const Item = ({Title, Year, imdbID, Poster} : any) => (
    <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => navigation.navigate('DETAIL', {paramKey: imdbID})}
          style={styles.mainCardView}>
          <View>
            <Image style={styles.smallImage} source={{uri: Poster}} />
            <Text style={styles.textArea}>{Title}</Text>
            <Rating imdbID={imdbID} />
          </View>
        </TouchableOpacity>

    </View>
  );


  return (
    <SafeAreaView style={{backgroundColor: '#000'}}>

      <Button title={"FAVORITES"} onPress={() => navigation.navigate('FAVS', {paramKey: movies} ) }/>
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
        keyExtractor={(item, index) => 'item-' + index}
        numColumns={2}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#fff"
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
    backgroundColor: '#000',
    paddingHorizontal: 20,
    flexWrap: 'wrap',
    flex: 1,
  },
  mainCardView: {
    height: '100%',
    width: '50%',
    paddingTop: 50,
    backgroundColor: '#000',
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
    textAlign: 'center',
    paddingVertical: 20,
  },
});

/*
  <TextInput
        style={{ fontSize: 16,
          color: '#fff',
          textAlign: 'center',
          paddingVertical: 20,
          fontWeight:'bold'
        }}
        placeholder="Search Here"
      />

 */
