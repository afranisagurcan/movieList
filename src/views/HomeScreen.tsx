import React, {useEffect, useState} from 'react';
import {
  Button,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import axios from 'axios';
import Rating from '../components/Rating';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import { BLACK, GENERAL_URL, GREY } from "../utils";
import IMovie from '../utils/types/Movie.type';

function HomeScreen(this: any) {
  const [text, setText] = useState('');
  const [movies, setMovies] = useState<IMovie.GeneralItem[]>([]);
  //const [refreshing, setRefreshing] = React.useState(false);
  const navigation = useNavigation<any>();

  /*const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    sendRequest(text, setMovies);
  }, []);*/

  useEffect(() => {
    sendRequest(text, setMovies);
  }, []);

  const Item = ({Title, imdbID, Poster}: IMovie.GeneralItem) => (
    <View>
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
  const EmptyListMessage = () => {
    return <Text style={styles.emptyList}>Please search a movie</Text>;
  };

  return (
    <View style={{backgroundColor: BLACK}}>
      <View style={styles.searchArea}>

        <TextInput
          style={styles.searchText}
          value={text}
          onChangeText={newValue => {
            setText(newValue);
          }}
          placeholder="Search Here"
        >
          <Icon
            name={'search'}
            style={styles.searchArea}
            color={GREY}></Icon>
        </TextInput>
        <View style={styles.searchButton}>
          <TouchableOpacity
            onPress={() => sendRequest(text, setMovies)}
          >
            <Text style={styles.searchButton}>Search</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.favoriteButton}>
        <Icon.Button
          name={'heart'}
          size={25}
          color={BLACK}
          backgroundColor={GREY}
          onPress={() => navigation.navigate('FAVS', {paramKey: movies})}>
          FAVORITES
        </Icon.Button>
      </View>

      <FlatList
        data={movies}
        renderItem={({item}) => {
          if (item.Poster !== 'N/A') {
            return (
              <Item
                Title={item.Title}
                Year={item.Year}
                imdbID={item.imdbID}
                Poster={item.Poster}
              />
            );
          }
          return <View />;
        }}
        keyExtractor={(item, index) => 'item-' + index}
        numColumns={2}
        ListEmptyComponent={EmptyListMessage}
        //refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor=WHITE />}
      />
    </View>
  );
}

export default HomeScreen;

function sendRequest(text: string, setMovies: Function) {
  axios
    .get(GENERAL_URL(text))
    .then(response => {
      setMovies(response.data.Search);
    })
    .catch(error => {
      console.log(error);
    });
}

const styles = StyleSheet.create({
  mainCardView: {
    height: '100%',
    width: '50%',
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: BLACK,
    flexDirection: 'row',
    flex: 1,
  },
  favoriteButton: {
    width: '40%',
    paddingTop: 20,
    paddingBottom: 20,
    alignSelf: 'flex-end',
  },
  smallImage: {
    resizeMode: 'stretch',
    width: 160,
    height: 250,
  },
  textArea: {
    fontSize: 16,
    color: GREY,
    textAlign: 'center',
    paddingVertical: 20,
  },
  searchArea: {
    color: BLACK,
    padding: 20,
    flexDirection: 'row',
  },
  searchText: {
    width: '75%',
    fontSize: 15,
    backgroundColor: GREY,
    color: BLACK,
    padding: 20,
    borderBottomStartRadius: 15,
    borderTopRightRadius:15,
  },
  searchButton: {
    textAlign:'center',
    padding:8,
    color:GREY,
    fontWeight:'bold',
    fontSize: 18,
  },
  emptyList: {
    width: 400,
    height: 800,
    padding: 40,
    fontSize: 18,
    textAlign: 'center',
    color: GREY,
  },
});
