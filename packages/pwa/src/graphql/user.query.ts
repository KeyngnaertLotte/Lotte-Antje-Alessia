import gql from 'graphql-tag'

export const GET_USER_BY_UID = gql`
  query userByUid($uid: String!) {
    userByUid(string: $uid) {
      id
      uid
      locale
      role
      createdAt
      UpdatedAt
      naam
    }
  }
`

export const GET_USERS_BY_ROLE = gql`
  query {
    findByRole {
      uid
      role
      naam
    }
  }
`
