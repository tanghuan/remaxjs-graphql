import React, { ReactElement } from 'react';
import { request } from 'remax/wechat';
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
} from '@apollo/client';
import './app.css';

class Response {
  constructor(private body: any, private init?: any) {}

  text() {
    return Promise.resolve(JSON.stringify(this.body));
  }
}

const httpLink = new HttpLink({
  uri: 'http://192.168.2.26:4000/graphql',
  fetch: (uri, options) => {
    return new Promise<any>((resolve, reject) => {
      request({
        url: uri.toString(),
        method: options?.method as any,
        header: options?.headers,
        data: options?.body,
        success(res) {
          resolve(new Response(res.data));
        },
        fail(error) {
          resolve(error);
        },
      });
    });
  },
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: httpLink,
});

// eslint-disable-next-line react/prop-types
const App: React.FC = ({ children }) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
);

export default App;
