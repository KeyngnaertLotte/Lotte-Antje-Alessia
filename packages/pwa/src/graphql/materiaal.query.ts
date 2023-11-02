import gql from 'graphql-tag'

export const GET_MATERIAAL = gql`
    query materiaal {
        materiaal {
            id
            item
            categorie
            aantal
        }
    }
`
