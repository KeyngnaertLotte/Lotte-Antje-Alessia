import gql from 'graphql-tag'

export const ADD_BEZOEKER = gql`
  mutation createBezoeker($createBezoekerInput: CreateBezoekerInput!) {
    createBezoeker(createBezoekerInput: $createBezoekerInput) {
      id
      uid
      saldo
      favoartiest
    }
  }
  `
  
  
    