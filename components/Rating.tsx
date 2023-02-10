import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import StarRating, {StarRatingDisplay} from 'react-native-star-rating-widget';

function isNumeric(str: string) {
  return !Number.isNaN(Number(str)) && !Number.isNaN(parseFloat(str));
}

type RatingProps = {
  imdbID: string;
};

function Rating({imdbID} : RatingProps) {
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const url = 'https://www.omdbapi.com/?i=' + imdbID + '&apikey=263d22d8';
    axios
      .get(url)
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
        <StarRatingDisplay rating={ratingInt} starSize={22} color={'#989393'} />
      </View>
    );
  }
  return <View />;
}

export default Rating;
