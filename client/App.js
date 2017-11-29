import React from 'react'
import { NativeRouter, Route } from 'react-router-native'
import 'url-search-params-polyfill'
import { Search, Detail } from './src/screens'

const Main = () => [
  <Route path="/" component={Search} exact />,
  <Route path="/detail" component={Detail} />,
]

const App = () => (
  <NativeRouter>
    <Main />
  </NativeRouter>
)

export default App