import gql from 'graphql-tag'

export const ADD_PERSONEEL = gql`
  mutation createPersoneel($createPersoneelInput: CreatePersoneelInput!) {
    creatPersoneel(createPersoneelInput: $createPersoneelInput) {
      id
      voornaam
      achternaam
      telefoon
    }
  }
`
