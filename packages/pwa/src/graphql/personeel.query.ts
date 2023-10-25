import gql from 'graphql-tag'

export const ALL_PERSONEEL = gql`
  query personeel {
    personeel {
      id
      voornaam
      achternaam
    }
  }
`

const GET_PERSONEEL_BY_UID = gql`
  query personeelByUid($uid: String!) {
    personeelByUid(string: $uid) {
      id
      voornaam
      achternaam
    }
  }
`
