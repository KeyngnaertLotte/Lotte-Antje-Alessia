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
// voor materiaal
export const UPDATE_TAAK = gql`
  mutation updateTaken($id: String!, $updateTakenInput: UpdateTakenInput!) {
    updateTaken(updateTakenInput: $updateTakenInput, id: $id)
  }
`

// voor "alle open taken"
export const UPDATE_STATUS = gql`
  mutation update($id: String!, $status: Boolean!) {
    updateTaken(status: $status, id: $id)
  }
`

// voor materiaal
export const REMOVE_TAAK = gql`
  mutation RemoveTaak($id: String!) {
    removeTaak(id: $id)
  }
`

// voor "alle open taken"
export const REMOVE_TASK_FROM_LIST = gql`
  mutation DeleteTaakInput($id: String!, $uid: String!) {
    DeleteTaakInput(taakId: $id, uid: $uid)
  }
`

export const CREATE_TAAK_ADMIN = gql`
  mutation createTaakAdmin($createTakenInput: UpdateTakenInput!) {
    createTaakAdmin(createTakenInput: $createTakenInput)
  }
`
