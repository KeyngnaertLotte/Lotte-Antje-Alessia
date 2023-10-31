import gql from 'graphql-tag'

export const CREATE_ITEM = gql`
mutation createBenodigdhedenInput ($createBenodigdhedenInput:CreateBenodigdhedenInput!, $uid: String!){
    createBenodigdhedenInput (createBenodigdhedenInput: $createBenodigdhedenInput, uid: $uid){
    benodigdheden{item, podium, categorie, aantal }
    }
  }`