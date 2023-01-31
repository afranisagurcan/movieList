import {Rating} from "react-native-ratings";
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { Text, View } from "react-native";


function StarRating(route){

  const [rating, setRating] = useState([]);
  const imdbID = route.prop;
  const url = "https://www.omdbapi.com/?i=" + imdbID + "&apikey=263d22d8";
  useEffect(() => {
    axios
      .get(url)
      .then(response => {
        setRating(response.data.imdbRating);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  const ratingInt = Number(rating) / 2 ;
  return (
    <View>

      <Rating
        tintColor={'#000'}
        imageSize={20}
        ratingCount={5}
        startingValue={ratingInt}
        readonly
      />

    </View>
  );

}

export default StarRating;
