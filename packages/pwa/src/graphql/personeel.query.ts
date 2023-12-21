import gql from 'graphql-tag'

export const GET_PERSONEEL_BY_UID = gql`
  query personeelByUid($uid: String!) {
    personeelByUid(uid: $uid) {
      id
      uid
      voornaam
      achternaam
      type
      takenlijst {
        id
        status
        aantal
        category
        deadline
        naam
        plaats
      }
    }
  }
`

export const GET_PERSONEEL = gql`
  query {
    personeel {
      id
      uid
      voornaam
      achternaam
      type
      takenlijst {
        plaats
        naam
        category
        aantal
        deadline
      }
    }
  }
`
