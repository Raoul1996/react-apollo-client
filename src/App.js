import React, {Component} from 'react'
import logo from './logo.svg'
import './App.css'
import ChannelsListWithData from './components/ChannelsListWithData'

import {ApolloProvider} from 'react-apollo'
import {ApolloClient} from 'apollo-client'
import {HttpLink} from 'apollo-link-http'
import {InMemoryCache} from 'apollo-cache-inmemory'

import {makeExecutableSchema, addMockFunctionsToSchema} from 'graphql-tools'
import {mockNetworkInterfaceWithSchema} from 'apollo-test-utils'
import {typeDefs} from './schema'

const schema = makeExecutableSchema({typeDefs})
addMockFunctionsToSchema({schema})
const mockNetworkInterface = mockNetworkInterfaceWithSchema({schema})

const client = new ApolloClient({
  link: new HttpLink({uri: 'http://localhost:4000/graphql'}),
  cache: new InMemoryCache()
  // networkInterface: mockNetworkInterface
})

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <div className="navbar">React Apollo</div>
          <ChannelsListWithData />
        </div>
      </ApolloProvider>
    )
  }
}

export default App
