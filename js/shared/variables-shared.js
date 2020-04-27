const API_URL = "https://api.giphy.com/v1/gifs";
const API_KEY = "api_key=nviDGCCp3515X3VeiJdD4zAohJ9inqtJ";

const TRENDING = API_URL + "/trending?" + API_KEY + "&limit=0";
const SEARCH = API_URL + "/search?" + API_KEY + "&limit=0" + "&q=";
const AUTOCOMPLETE = API_URL + "/search/tags?" + API_KEY + "&limit=3" + "&q=";
const GET_BY_IDS = API_URL + "?" + API_KEY + "&" + "ids=";
