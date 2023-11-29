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
