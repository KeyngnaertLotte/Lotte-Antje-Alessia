import {
  createHttpLink,
  ApolloClient,
  InMemoryCache,
  from,
} from '@apollo/client/core'
import { setContext } from '@apollo/client/link/context'
import useFirebase from './useFirebase'
import { logErrorMessages } from '@vue/apollo-util'
import { onError } from '@apollo/client/link/error'

const { firebaseUser } = useFirebase()

const httpLink = createHttpLink({
  // uri: 'http://[::1]:8000/graphql',
  uri: import.meta.env.VITE_BACKEND_URL,
  credentials: 'same-origin',
})

const authLink = setContext(async (_, { headers }) => ({
  headers: {
    ...headers,
    authorization: firebaseUser.value
      ? `Bearer ${await firebaseUser.value.getIdToken()}`
      : '',
  },
}))

const errorLink = onError((error: any) => {
  if (import.meta.env.DEV) logErrorMessages(error)
})

const apolloClient = new ApolloClient({
  link: from([authLink, errorLink, httpLink]),
  cache: new InMemoryCache(),
})

export default () => {
  return {
    apolloClient,
  }
}
