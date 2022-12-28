import gql from 'graphql-tag';

export const loginUser = gql`
  mutation LoginUser(
    $username: String!
    $password: String!
    $platform: String!
  ) {
    loginUser(name: $username, password: $password, platform: $platform) {
      success
      msg
      code
    }
  }
`;

export const createUser = gql`
  mutation CreateUser($username: String!, $password: String!, $email: String!) {
    createUser(name: $username, password: $password, email: $email) {
      msg
      code
      success
    }
  }
`;

export const createHousehold = gql`
  mutation createHousehold($name: String!) {
    createHousehold(name: $name) {
      msg
      code
      success
    }
  }
`;

export const joinHousehold = gql`
  mutation joinHousehold($id: ID!) {
    joinHousehold(id: $id) {
      msg
      code
      success
    }
  }
`;

export const leaveHousehold = gql`
  mutation leaveHousehold {
    leaveHousehold {
      msg
      code
      success
    }
  }
`;

export const createChallenge = gql`
  mutation createChallenge($name: String!, $points: Int!) {
    createChallenge(name: $name, points: $points) {
      msg
      code
      success
    }
  }
`;

export const completeChallenge = gql`
  mutation completeChallenge($id: ID!) {
    completeChallenge(id: $id) {
      msg
      code
      success
    }
  }
`;

export const createReward = gql`
  mutation createReward($name: String!, $costs: Int!) {
    createReward(name: $name, costs: $costs) {
      msg
      code
      success
    }
  }
`;

export const collectReward = gql`
  mutation collectReward($id: ID!) {
    collectReward(id: $id) {
      msg
      code
      success
    }
  }
`;