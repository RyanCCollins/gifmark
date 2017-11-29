// @flow
import React from 'react'
import styled from 'styled-components/native'
import { compose, withHandlers, withState, lifecycle } from 'recompose'
import { Text } from 'react-native'

const Container = styled.View`
  display: flex;
  background-color: #fff;
  justify-content: center;
`

const TopView = styled.View`
  width: 100%;
  padding: 10px;
  display: flex;
  margin: 40px 0 40px 0;
  align-items: center;
`

const SearchInput = styled.TextInput`
  padding: 10px;
  width: 100%;
  border: 1px solid blue;
  border-radius: 50px;
`

const Contents = TopView.extend`
  align-self: stretch;
  margin: 0px;
`

const Grid = styled.FlatList`
  width: 100%;
`

const Image = styled.Image`
  min-height: 100px;
  min-width: 100px;
  margin: 5px;
`

type Props = {
  searchText: string,
  setSearchText: (text: string) => void,
  results: [],
}

const Search = ({
  searchText,
  setSearchText,
  results,
}: Props) => (
  <Container>
    <TopView>
      <SearchInput
        value={searchText}
        onChangeText={setSearchText}
        placeholder="Type here to search"
      />
    </TopView>
    <Contents>
      <Text>
        Search Text: {searchText}
      </Text>
      <Grid
        numColumns={3}
        renderItem={({ item }) =>
          (<Image
            key={item.url}
            source={{ uri: item.images.fixed_height_small.url }}
          />)
        }
        data={results}
      />
    </Contents>
  </Container>
)

export default compose(
  withState('searchText', 'setSearchText', ''),
  withState('results', 'setResults', []),
  withHandlers({
    handleSearch: ({ searchText, setResults }) => () => {
      const url = `https://api.giphy.com/v1/gifs/search?api_key=JbT4J6jsj1DhzgYZ2ds3qoCWXMhEdxT7&q=${encodeURIComponent(searchText)}&limit=25&offset=0&rating=G&lang=en`
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
