import React, {Component} from 'react'
import logo from './logo.svg'
import './App.css'

import {graphql, ApolloProvider} from 'react-apollo'
import {ApolloClient} from 'apollo-client'
import {HttpLink} from 'apollo-link-http'
import {InMemoryCache} from 'apollo-cache-inmemory'
import gql from 'graphql-tag'

import {makeExecutableSchema, addMockFunctionsToSchema} from 'graphql-tools'
import {mockNetworkInterfaceWithSchema} from 'apollo-test-utils'
import {typeDefs} from './schema'

const schema = makeExecutableSchema({typeDefs})
addMockFunctionsToSchema({schema})
const mockNetworkInterface = mockNetworkInterfaceWithSchema({schema})

const client = new ApolloClient({
  link: new HttpLink({uri: 'https://q80vw8qjp.lp.gql.zone/graphql'}),
  cache: new InMemoryCache(),
  networkInterface: mockNetworkInterface
})
const channelsListQuery = gql`
  query ChannelsListQuery {
    channels {
    id
    name
    }
  }
  `
const ChannelsList = ({data: {loading, error, channels}}) => {
  if (loading) {
    return <p>Loading</p>
  }
  if (error) {
    return <p>{error.message}</p>
  }
  return <ul>{channels.map(ch => <li key={ch.id}>{ch.name}</li>)}</ul>
}
const ChannelsListWithData = graphql(channelsListQuery)(ChannelsList)


class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to Apollo</h1>
          </div>
          <ChannelsListWithData />
        </div>
      </ApolloProvider>
    )
  }
}

export default App
