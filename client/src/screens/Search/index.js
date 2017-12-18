// @flow
import React from 'react'
import { compose, withHandlers, withState, lifecycle } from 'recompose'
import { Keyboard, Dimensions } from 'react-native'
import { SearchBar } from 'react-native-elements'
import { Link } from 'react-router-native'
import { getGiphyAPIUrl } from '../../utils/api'
import { Container, TopView, Contents, Grid, Image } from './styledcomponents'

type Props = {
  searchText: string,
  setSearchText: (text: string) => void,
  handleReturn: (e: Event) => void,
  results: [],
}

const Search = ({
  results,
  handleReturn,
  setSearchText,
}: Props) => (
  <Container
    contentContainerStyle={{ justifyContent: 'center' }}
  >
    <TopView>
      <SearchBar
        onKeyPress={handleReturn}
        lightTheme
        containerStyle={{ width: '100%' }}
        onChangeText={setSearchText}
        onClearText={() => setSearchText('')}
        placeholder="Type here to search"
      />
    </TopView>
    <Contents>
      <Grid
        numColumns={3}
        renderItem={({ item }) => (
          <Link href="/" to={`/detail?id=${encodeURIComponent(item.id)}`}>
            <Image
              itemWidth={(Dimensions.get('window').width / 3) - 15}
              key={item.url}
              source={{ uri: item.images.fixed_height_small.url }}
            />
          </Link>
        )}
        data={results}
      />
    </Contents>
  </Container>
)

export default compose(
  withState('searchText', 'setSearchText', ''),
  withState('results', 'setResults', []),
  withHandlers({
    handleReturn: () => ({ keyCode }) => {
      if (keyCode === 13) {
        Keyboard.dismiss()
      }
    },
    handleSearch: ({ searchText, setResults }) => () => {
      const url = `${getGiphyAPIUrl('/gifs/search')}&q=${encodeURIComponent(searchText)}&limit=25&offset=0&rating=G&lang=en`
      console.log(`Making fetch to ${url}`)
      fetch(url)
        .then(res => res.json())
        .then(json => setResults(json.data))
        .catch(err => console.error(err)) // eslint-disable-line
    },
  }),
  lifecycle({
    componentWillReceiveProps({ searchText }) {
      if (searchText !== this.props.searchText) {
        this.props.handleSearch()
      }
    },
  }),
)(Search)
