import { GIPHY_URL, API_KEY, API_URL } from 'react-native-dotenv'

export const getGiphyAPIUrl = path => `${GIPHY_URL}${path}?api_key=${API_KEY}`

export const getApiUrl = API_URL