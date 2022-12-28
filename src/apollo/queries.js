import gql from 'graphql-tag';

export const myUser = gql`
  query {
    myUser {
      _id
      name
    }
  }
`;

export const getHouseholds = gql`
  query {
    getHouseholds {
      name
      membercount
      _id
    }
  }
`

export const getMyHousehold = gql`
  query {
    getMyHousehold {
      name
      membercount
      _id
    }
  }
`