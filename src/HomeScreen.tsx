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

    <TouchableHighlight>
          <View style={styles.container}>
            <Text style={styles.TextArea}>Title : {Title}</Text>
            <Text style={styles.TextArea}>Released Date : {Year}</Text>
            <Text style={styles.TextArea}>Genre : {Type}</Text>
            <Image style={styles.SmallImage} source={{uri: Poster}} />
            <Button
              title="Show more details"
              onPress={() => navigation.navigate('Detail', {paramKey: imdbID})}
            />
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
      flex: 1,
      backgroundColor: "#a0d1d7",
      alignItems: "center",
      justifyContent: "center",
    },
    advice: {
      fontSize: 20,
      fontWeight: "bold",
      marginHorizontal: 20,
    },
    ImageBackground: {
      flex: 1,
      resizeMode: "cover",
      width: "100%",
      alignItems: "center",
    },
    SmallImage: {
      width: 100,
      height: 100,
      start: 20,
    },
    TextArea : {
      fontSize: 20,
      paddingTop:10,
      paddingBottom:10,
      paddingLeft: 20,
    },

  });

const styles2= StyleSheet.create({
    container:{
      margin: 0 ,
      padding: 0 ,
    },
    root:{
        fontSize: 18,
        fontFamily: "Arial",
        lineHeight: 1.5,

        shadowColor: '#0000' ,
    } ,

    body:{
      background: '#3C3C3C',
      width: 200 ,
    } ,

});
/*


:root {
    font-size: 18px;
    font-family: 'Capriola', sans-serif;
    line-height: 1.5;

    --white:  #FBFBFB;
    --blue:   #3E989B;
    --green:  #6DB465;
    --yellow: #F2C14E;
    --red:    #F78154;
    --violet: #C87694;
    --black:  #3C3C3C;
    --shadow-color: rgb(0 0 0, .5);
}

body {
    background: var(--black);
    min-width: 360px;
}

._disable-pointer-events {
    pointer-events: none !important;
}

.amazing-menu {
    overflow-x: hidden;

    &.-scrolled {
        .menu-item {
            transform: perspective(40rem) translateY(-.5rem) scaleX(.95) rotateX(-40deg);
        }
    }
}

.menu-item {
    position: relative;
    width: 100%;
    color: var(--white);
    transition: all 210ms cubic-bezier(.8, .1, .2, .9);

    &:nth-of-type(5n + 1) { background: var(--blue);   }
    &:nth-of-type(5n + 2) { background: var(--green);  }
    &:nth-of-type(5n + 3) { background: var(--yellow); }
    &:nth-of-type(5n + 4) { background: var(--red);    }
    &:nth-of-type(5n    ) { background: var(--violet); }

    &:hover,
    &:focus {
        z-index: 1;
        transform: scale(1.1);
        box-shadow: 0 0 1rem var(--shadow-color);
        cursor: pointer;
    }

    .container {
        margin: 0 auto;
        width: 100%;
        max-width: 30rem;
        padding: 2rem 1rem 1rem;

        &:after {
            display: table;
            content: '';
            clear: both;
        }
    }

    .icon {
        float: left;
        font-size: 2rem;
        margin-top: -.5rem;
        margin-right: .5rem;
    }

    .title {
        float: left;
        text-transform: uppercase;
        font-weight: 600;
    }

    .rating {
        float: right;

        &.-r1 {
            .stars span {
                &:nth-of-type(2),
                &:nth-of-type(3),
                &:nth-of-type(4),
                &:nth-of-type(5){
                    opacity: .5;
                }
            }
        }

        &.-r2 {
            .stars span {
                &:nth-of-type(3),
                &:nth-of-type(4),
                &:nth-of-type(5){
                    opacity: .5;
                }
            }
        }

        &.-r3 {
            .stars span {
                &:nth-of-type(4),
                &:nth-of-type(5){
                    opacity: .5;
                }
            }
        }

        &.-r4 {
            .stars span {
                &:nth-of-type(5){
                    opacity: .5;
                }
            }
        }

        &.-r5 {

        }

        .text {
            font-size: .7rem;
            opacity: .8;
        }
    }

    .arrow {
        float: right;
        margin-left: .5rem;
    }
}
 */
