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

export const GET_MATERIAAL_BY_CATEGORIE = gql`
    query findByCategorie($categorie: String!) {
        findByCategorie(categorie: $categorie ) {
        id
        categorie
        item
        aantal
        }
    }
`
