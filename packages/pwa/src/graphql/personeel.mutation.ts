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

export const UPDATE_TYPE = gql`
  mutation updateType($updateTypeInput: String!, $uid: String!) {
    updateType(updateTypeInput: $updateTypeInput, uid: $uid) {
      type
    }
  }
`

export const DELETE_PERSONEEL = gql`
  mutation RemovePersoneel($uid: String!) {
    removePersoneel(string: $uid)
  }
`

export const UPDATE_PERSONEEL = gql`
mutation UpdatePersoneel ($updatePersoneelInput: 
  UpdatePersoneelInput!, $uid: String!) {
  updatePersoneel(updatePersoneelInput: $updatePersoneelInput, uid: $uid)
}`
