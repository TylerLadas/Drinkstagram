import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import SearchDrinks from './pages/SearchDrinks';
import SavedDrinks from './pages/SavedDrinks';
import Book from './pages/Book'
import Navbar from './components/Navbar';

// create apollo provider
const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    
    <ApolloProvider client={client}>
      <Router>
        <>
          <Navbar />
          <Switch>
            <Route exact path='/' component={SearchDrinks} />
            <Route exact path='/saved' component={SavedDrinks} />
            <Route exact path='/book' component={Book} />
            <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
          </Switch>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;