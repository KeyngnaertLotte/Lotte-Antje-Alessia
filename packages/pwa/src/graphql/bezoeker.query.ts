import gql from 'graphql-tag'

export const GET_BEZOEKER_BY_UID = gql`
query bezoekerByUid($uid: String!){
  bezoekerByUid(uid: $uid) {
    id
    uid
    naam
    saldo
    favoartiest {
      artiest
    	time
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
