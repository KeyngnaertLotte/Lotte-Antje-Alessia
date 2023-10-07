import gql from 'graphql-tag'

export const ALL_Personeel = gql`
  query personeel {
    personeel {
      id
      voornaam
      achternaam
      telefoon
    }
  }
`
