import Config from 'react-native-config'

export const getGiphyAPIUrl = path => `${Config.GIPHY_URL}${path}?api_key=${Config.API_KEY}`

export const getApiUrl = Config.API_URL