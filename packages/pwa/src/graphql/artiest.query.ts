import gql from 'graphql-tag'

export const ALL_Artiesten = gql`
  query Artiesten {
    artiesten {
      id
      uid
      naam
      podium
      agenda {
        taak
        podium
        tijd
        id
      }
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
        id
      }
    }
  }
`

export const GET_LINEUP = gql`
  query LineUp {
    lineUp {
      podium
      tijd
      naam
    }
  }
`
