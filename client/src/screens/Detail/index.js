// @flow
import React from 'react'
import { compose, withProps } from 'recompose'
import { ActivityIndicator } from 'react-native'
import { withRouter } from 'react-router-native'
import { getGiphyAPIUrl } from '../../utils/api'
import { withLoadOnMount } from '../../utils/HOCs'
import { Container, Image } from './styledcomponents'

type Props = {
  image: {},
}

const Detail = ({
  image,
}: Props) => (
  <Container>
    {image ?
      <Image
        source={{ uri: image.url }}
      />
    :
      <ActivityIndicator animating />
    }
  </Container>
)

export default compose(
  withRouter,
  withProps(({ location }) => ({
    id: new URLSearchParams(location.search).get('id'),
  })),
  withLoadOnMount(props => getGiphyAPIUrl(`/gifs/${props.id}`), 'image', json => json.data.images.original),
)(Detail)
