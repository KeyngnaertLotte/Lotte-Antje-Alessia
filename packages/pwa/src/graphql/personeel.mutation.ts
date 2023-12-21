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
  mutation UpdatePersoneel(
    $updatePersoneelInput: UpdatePersoneelInput!
    $uid: String!
  ) {
    updatePersoneel(updatePersoneelInput: $updatePersoneelInput, uid: $uid)
  }
`

export const REMOVE_TAAK_BIJ_PERSONEEL = gql`
  mutation removeTaak($id: String!) {
    removeTaak(id: $id)
  }
`

export const ADD_TAAK = gql`
  mutation createTaakInput($taakId: String!, $uid: String!) {
    createTaakInput(taakId: $taakId, uid: $uid) {
      id
      type
      voornaam
      achternaam
      takenlijst {
        id
        plaats
        naam
        status
        category
        aantal
        deadline
      }
    }
  }
`
