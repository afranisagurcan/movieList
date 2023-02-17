import React, {useEffect, useState} from 'react';
import {
  Image,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import axios from 'axios';
import {BLACK, DETAIL_URL, GENERAL_URL, GREY, WHITE} from '../utils';
import {useRoute} from '@react-navigation/native';
import IMovie from '../utils/types/Movie.type';
import IDetailMovie from '../utils/types/DetailMovie.type';
import StatusFavorite from '../components/StatusFavorite';

function DetailScreen() {
  const [movie, setMovie] = useState<IMovie.Item | null>(null);
  const [refreshing, setRefreshing] = React.useState(false);

  const route = useRoute<any>();
  const imdbID = route.params.paramKey;

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    axios
      .get(DETAIL_URL(imdbID))
      .then(response => {
        setMovie(response.data);
        setRefreshing(false);
      })
      .catch(error => {
        console.log(error);
      });

  }, []);

  useEffect(() => {
    axios
      .get(DETAIL_URL(imdbID))
      .then(response => {
        setMovie(response.data);
        setRefreshing(false);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);


  return (
    <SafeAreaView style={styles.container}>
      {movie && (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={WHITE}
            />
          }>
          <View style={styles.imageCard}>
            <Image style={styles.smallImage} source={{uri: movie.Poster}} />
          </View>
          <View style={{padding: 12}}>
            <StatusFavorite imdbID={imdbID} />
            <ContentItem title="Title" content={movie.Title} />
            <ContentItem title="Released Date" content={movie.Year} />
            <ContentItem title="Genre" content={movie.Genre} />
            <ContentItem title="Actors" content={movie.Actors} />
            <ContentItem title="Country" content={movie.Country} />
            <ContentItem title="Plot" content={movie.Plot} />
            <ContentItem title="Awards" content={movie.Awards} />
            <ContentItem title="Imdb Rating" content={movie.imdbRating} />
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const ContentItem = ({title, content}: IDetailMovie.ContentItem) => {
  return (
    <View style={{flexDirection: 'column', paddingBottom: 16}}>
      <Text style={styles.textAreaBold}>{title}</Text>
      <Text style={{fontSize: 20, color: '#989393'}}>{content}</Text>
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BLACK,
  },
  imageCard: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 50,
  },
  smallImage: {
    flex: 1,
    aspectRatio: 1.5,
    resizeMode: 'contain',
  },
  textAreaBold: {
    fontSize: 20,
    color: GREY,
    fontWeight: 'bold',
  },
});
