import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import IDetailMovie from "./types/DetailMovie.type";

const BASE_URL = 'https://www.omdbapi.com';
const API_KEY = "263d22d8";

const DETAIL_URL = (id: string) => `${BASE_URL}?i=${id}&apikey=${API_KEY}`;
const GENERAL_URL = (text: string) => `${BASE_URL}?s=${text}&apikey=${API_KEY}`;

const GREY = '#989393';
const BLACK = '#000';
const WHITE = '#fff';
export { DETAIL_URL, GENERAL_URL, BASE_URL, GREY, BLACK, WHITE };
