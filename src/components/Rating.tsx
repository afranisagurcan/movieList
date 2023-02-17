import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { StarRatingDisplay } from 'react-native-star-rating-widget';
import IDetailMovie from '../utils/types/DetailMovie.type';
import { DETAIL_URL, GREY } from "../utils";

function isNumeric(str: string) {
  return !Number.isNaN(Number(str)) && !Number.isNaN(parseFloat(str));
}

function Rating({ imdbID }: IDetailMovie.KeyItem) {
  const [rating, setRating] = useState(0);

  useEffect(() => {

    axios
      .get(DETAIL_URL(imdbID))
      .then(response => {
        if (isNumeric(response.data.imdbRating)) {
          setRating(response.data.imdbRating);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, [imdbID]);

  if (rating) {
    const ratingInt = Number(rating) / 2;
    return (
      <View>
        <StarRatingDisplay rating={ratingInt} starSize={22} color={GREY} />
      </View>
    );
  }
  return <View />;
}

export default Rating;
