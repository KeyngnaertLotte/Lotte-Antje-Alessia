import gql from 'graphql-tag'

export const ADD_BEZOEKER = gql`
  mutation createBezoeker($createBezoekerInput: CreateBezoekerInput!) {
    createBezoeker(createBezoekerInput: $createBezoekerInput) {
      id
      uid
      naam
    }
  }
  `

  export const ADD_FAVOARTIEST = gql`
  mutation AddFavoArtiest($uid: String!, $artiest: String!){
    addFavoArtiestToBezoeker(uid: $uid, favoartiest: $artiest) {
      id
      uid
      favoartiest {
        artiest
        startTime
        endTime
        color
      }
    }
  }
  `  

  export const REMOVE_FAVOARTIEST = gql`
  mutation removeFavoArtiestFromBezoeker ($uid: String!, $artiest: String!){
    removeFavoArtiestFromBezoeker(uid: $uid, favoartiest: $artiest) {
      id
      uid
      favoartiest {
        artiest
        startTime
        endTime
        color
      }
    }
  }
  `  

  export const ADD_SALDO = gql`
  mutation AddTransaction($uid: String!, $saldo: Float!){
    addSaldoToBezoeker(uid: $uid, saldo: $saldo) {
      id
      uid
      saldo
      transacties{transactie, tijd, aantal}
    }
  }
  `
  
  
    