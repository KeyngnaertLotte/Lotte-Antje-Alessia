import gql from 'graphql-tag'

export const ALL_Artiesten = gql`
  query {
    artiesten {
      id
      naam
      podium
    }
  }
`

export const GET_Artiest_By_Uid = gql`
  query artiestByUid($uid: String!) {
    artiestByUid(string: $uid) {
      naam
      podium
      benodigdheden {
        item
        aantal
        categorie
        podium
      }
      uid
      agenda {
        taak
        podium
        tijd
      }
    }
  }
`
