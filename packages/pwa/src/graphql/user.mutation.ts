import gql from 'graphql-tag'

export const ADD_USER = gql`
  mutation createUSer($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      id
      uid
      locale
      role
      naam
    }
  }
`

export const ADD_USER_ADMIN = gql`
  mutation createUserAdmin($createUserAdminInput: CreateUserAdminInput!) {
    createUserAdmin(createUserAdminInput: $createUserAdminInput) {
      id
      uid
      locale
      role
    }
  }
`
