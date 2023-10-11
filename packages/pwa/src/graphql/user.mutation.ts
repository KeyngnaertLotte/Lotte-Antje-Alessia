import gql from 'graphql-tag'

export const ADD_USER = gql`
  mutation createUSer($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      id
      uid
      locale
      role
    }
  }
`


