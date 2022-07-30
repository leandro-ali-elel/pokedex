import {gql} from 'apollo-angular';

export const GET_JOKES = gql`
  query {
    joke {
      joke
    }
  }
`;
