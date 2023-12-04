import gql from 'graphql-tag'

export const CREATE_ITEM = gql`
  mutation createBenodigdhedenInput(
    $createBenodigdhedenInput: CreateBenodigdhedenInput!
    $uid: String!
  ) {
    createBenodigdhedenInput(
      createBenodigdhedenInput: $createBenodigdhedenInput
      uid: $uid
    ) {
      benodigdheden {
        item
        podium
        categorie
        aantal
      }
    }
  }
`

export const ADD_ARTIEST = gql`
  mutation createArtiesten($createArtiestenInput: CreateArtiestenInput!) {
    createArtiesten(createArtiestenInput: $createArtiestenInput) {
      id
      naam
      uid
    }
  }
`

export const REMOVE_ARTIEST = gql`
  mutation RemoveArtiesten($uid: String!) {
    removeArtiesten(string: $uid)
  }
`

export const UPDATE_ARTIEST = gql`
  mutation UpdateArtiesten(
    $updateArtiestenInput: UpdateArtiestenInput!
    $uid: String!
  ) {
    updateArtiesten(updateArtiestenInput: $updateArtiestenInput, uid: $uid)
  }
`
