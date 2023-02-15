import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import axios from 'axios';
import Rating from '../components/Rating';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { GENERAL_URL } from '../utils';
import IMovie from '../utils/types/Movie.type';

function HomeScreen() {
  const [movies, setMovies] = useState<IMovie.GeneralItem[]>([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const navigation = useNavigation<any>();

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    axios
      .get(GENERAL_URL)
      .then(response => {
        setMovies(response.data.Search);
        setRefreshing(false);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(GENERAL_URL)
      .then(response => {
        setMovies(response.data.Search);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const Item = ({ Title, imdbID, Poster }: IMovie.GeneralItem) => (
    <View>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => navigation.navigate('DETAIL', { paramKey: imdbID })}
        style={styles.mainCardView}>
        <View>
          <Image style={styles.smallImage} source={{ uri: Poster }} />
          <Text style={styles.textArea}>{Title}</Text>
          <Rating imdbID={imdbID} />
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ backgroundColor: '#000' }}>
      <View style={styles.favoriteButton}>
        <Icon.Button
          name={'heart'}
          color={'#000'}
          backgroundColor={'#989393'}
          onPress={() => navigation.navigate('FAVS', { paramKey: movies })}>
          FAVORITES
        </Icon.Button>
      </View>

      <FlatList
        data={movies}
        renderItem={({ item }) => (
          <Item
            Title={item.Title}
            Year={item.Year}
            imdbID={item.imdbID}
            Poster={item.Poster}
          />
        )}
        keyExtractor={(item, index) => 'item-' + index}
        numColumns={3}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#fff"
          />
        }
      />
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  mainCardView: {
    height: "100%",
    width: "50%",
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: "#000",
    flexDirection: "row",
    flex: 1
  },
  favoriteButton: {
    width: "50%",
    paddingTop: 20,
    paddingBottom: 20,
    alignSelf: "flex-end",
    alignItems: "center"
  },
  smallImage: {
    resizeMode: "stretch",
    width: 160,
    height: 250
  },
  textArea: {
    fontSize: 16,
    color: "#989393",
    textAlign: "center",
    paddingVertical: 20
  }
});
