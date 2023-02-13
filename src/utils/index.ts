const BASE_URL = 'https://www.omdbapi.com';
const API_KEY = '263d22d8';

const DETAIL_URL = (id: string) => `${BASE_URL}?i=${id}&apikey=${API_KEY}`;
const GENERAL_URL = `${BASE_URL}?s=avatar&apikey=${API_KEY}`;

export {DETAIL_URL, GENERAL_URL, BASE_URL};