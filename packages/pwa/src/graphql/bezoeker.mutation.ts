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

  export const ADD_FAVOARTIEST = gql`
  mutation AddFavoArtiest($uid: String!, $artiest: String!){
    addFavoArtiestToBezoeker(uid: $uid, favoartiest: $artiest) {
      id
      uid
      favoartiest {
        artiest
        time
        color
      }
    }
  }
  `  
  
  
    