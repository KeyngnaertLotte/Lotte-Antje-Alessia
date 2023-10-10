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
