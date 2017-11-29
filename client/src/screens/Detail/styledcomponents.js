import styled from 'styled-components/native'

export const Container = styled.ScrollView`
  display: flex;
  background-color: #fff;
  max-height: 100%;
`

export const TopView = styled.View`
  width: 100%;
  padding: 10px;
  display: flex;
  margin: 40px 0 40px 0;
  align-items: center;
`

export const Contents = TopView.extend`
  align-self: stretch;
  margin: 0px;
`

export const Grid = styled.FlatList`
  width: 100%;
`

export const Image = styled.Image`
  min-height: 100px;
  min-width: 100px;
  height: ${props => props.itemWidth}px;
  width: ${props => props.itemWidth}px;
  margin: 5px;
`