import gql from 'graphql-tag'

export const GET_BEZOEKER_BY_UID = gql`
  query bezoekerByUid($uid: String!) {
    bezoekerByUid(uid: $uid) {
      id
      uid
      naam
      saldo
      favoartiest {
        artiest
        startTime
        endTime
        color
      }
      transacties {
        transactie
        aantal
        tijd
      }
    }
  }
`

export const GET_FAVOARTISTS_BY_ID = gql`
  query bezoekersFavorite($uid: String!) {
    bezoekersFavorite(uid: $uid) {
      artiest
      startTime
      endTime
      color
    }
  }
`
