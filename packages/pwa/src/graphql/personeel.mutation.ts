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
