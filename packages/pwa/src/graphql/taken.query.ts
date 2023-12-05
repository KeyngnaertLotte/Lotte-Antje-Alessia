import gql from 'graphql-tag'

export const GET_ALL_TAKEN = gql`
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