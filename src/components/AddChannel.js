import React from 'react'
import {graphql} from 'react-apollo'
import gql from 'graphql-tag'
import {channelsListQuery} from './ChannelsListWithData'

const ENTER = 13
const AddChannel = ({mutate}) => {
  const handleKeyUp = (evt) => {
    if (evt.keyCode === ENTER) {
      // console.log(evt.target.value)
      evt.persist()
      mutate({
        variables: {name: evt.target.value},
        refetchQueries: [{query: channelsListQuery}]
      }).then(res => {
        evt.target.value = ''
      })
    }
  }
  return (
    <input
      type='text'
      placeholder="New Channel"
      onKeyUp={handleKeyUp}
    />
  )
}
const addChannelMutation = gql`
mutation addChannel($name:String!){
  addChannel(name:$name){
    id
    name
  }
}
`
export default graphql(addChannelMutation)(AddChannel)