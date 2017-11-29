// @flow
import React from 'react'
import { compose, lifecycle, withState } from 'recompose'

// eslint-disable-next-line import/prefer-default-export
export const withLoadOnMount = (url, property, transformer) => (Component) => {
  const WithLoad = props => (
    <Component {...props} />
  )
  return compose(
    withState('error', 'setError'),
    withState(property, 'setProperty'),
    lifecycle({
      componentDidMount() {
        let finalUrl = url
        if (typeof url === 'function') {
          finalUrl = url(this.props)
        }
        fetch(finalUrl)
          .then(res => res.json())
          .then(json => (transformer ? transformer(json) : json))
          .then(json => this.props.setProperty(json))
          .catch(err => this.props.setError(err))
      },
    }),
  )(WithLoad)
}