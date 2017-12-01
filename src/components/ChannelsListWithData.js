import React, {Component} from 'react'
import AddChannel from './AddChannel'
import {graphql} from 'react-apollo'
import gql from 'graphql-tag'

const ChannelsList = ({data: {loading, error, channels}}) => {
  if (loading) {
    return <p>Loading</p>
  }
  if (error) {
    return <p>{error.message}</p>
  }
  return <div className="channelsList">
    <AddChannel />
    {channels.map(ch =>
      <div className="channel" key={ch.id}>{ch.name}</div>
    )}
  </div>
}
export const channelsListQuery = gql`
  query ChannelsListQuery {
    channels {
    id
    name
    }
  }
  `

export default graphql(channelsListQuery, {
  options: {pollInterval: 5000}
})(ChannelsList)