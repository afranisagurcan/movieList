declare namespace IMovie {
  interface Item {
    imdbID: string;
    Poster: string;
    Title: string;
    Year: string;
    Genre: string;
    Actors: string;
    Country: string;
    Plot: string;
    Awards: string;
    imdbRating: string;
  }

  interface GeneralItem {
    Poster: string;
    Title: string;
    imdbID: string;
    Year: string;
  }


}
export default IMovie;
