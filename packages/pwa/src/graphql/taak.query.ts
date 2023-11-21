import gql from 'graphql-tag'

export const GET_TAKEN = gql`
  query taak {
    taken {
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
