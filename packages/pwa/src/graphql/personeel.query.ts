import gql from 'graphql-tag'

export const GET_PERSONEEL_BY_UID = gql`
  query personeelByUid($uid: String!) {
    personeelByUid(uid: $uid) {
      id
      uid
      voornaam
      achternaam
      takenlijst {
        wie
        naam
        category
        aantal
        urgent
      }
    }
  }
`
