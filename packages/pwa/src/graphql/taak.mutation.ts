import gql from 'graphql-tag'

export const CREATE_TASK = gql`
  mutation createTakenInput($createTakenInput: CreateTakenInput!) {
    createTaak(createTakenInput: $createTakenInput) {
      plaats
      type
      naam
      category
      aantal
      deadline
    }
  }
`

export const UPDATE_TAAK = gql`
  mutation updateTaken($id: String!, $updateTakenInput: UpdateTakenInput!) {
    updateTaken(updateTakenInput: $updateTakenInput, id: $id)
  }
`

export const REMOVE_TAAK = gql`
  mutation RemoveTaak($id: String!) {
    removeTaak(id: $id)
  }
`
