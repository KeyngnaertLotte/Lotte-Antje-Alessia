import gql from 'graphql-tag'

export const ADD_PERSONEEL = gql`
  mutation createPersoneel($createPersoneelInput: CreatePersoneelInput!) {
    createPersoneel(createPersoneelInput: $createPersoneelInput) {
      id
      voornaam
      achternaam
    }
  }
`

export const UPDATE_TYPE= gql`
mutation updateType ($updateTypeInput: String!, $uid: String!){
  updateType (updateTypeInput: $updateTypeInput, uid: $uid){
    type
  }
}`
