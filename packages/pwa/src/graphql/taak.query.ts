import gql from 'graphql-tag'

export const GET_TAKEN = gql`
  query Taken {
    taken {
      id
      plaats
      type
      naam
      category
      aantal
      deadline
      materiaal
      status
    }
  }
`

export const GET_TAAK_BY_TYPE = gql`
  query findByType($type: String!) {
    findByType(type: $type) {
      id
      plaats
      type
      naam
      category
      aantal
      deadline
    }
  }
`


