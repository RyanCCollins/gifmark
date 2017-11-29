// @flow
import React from 'react'
import styled from 'styled-components/native'
import { compose, withProps } from 'recompose'
import { ActivityIndicator } from 'react-native'
import { withRouter } from 'react-router-native'
import { withLoadOnMount } from '../../utils/HOCs'

const Container = styled.View`
  display: flex;
  background-color: #fff;
  max-height: 100%;
  align-items: center;
  justify-content: center;
`

const Image = styled.Image`
  height: 100%;
  width: 100%;
`

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
  withLoadOnMount(props => `https://api.giphy.com/v1/gifs/${props.id}?api_key=JbT4J6jsj1DhzgYZ2ds3qoCWXMhEdxT7`, 'image', json => json.data.images.original),
)(Detail)
