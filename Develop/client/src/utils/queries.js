import { gql } from '@apollo/client';


export const QUERY_BOOKS = gql`
  query getBooks {
    books {
        bookId
        authors
        description
        title
        image
        link
    }
  }
`;

export const QUERY_SINGLE_USER = gql`
  query singleUser($userId: ID!, username: string!) {
    singleUser(userId: $userId, username: $username) {
        _id
        username
        email
        bookCount
        savedBooks {
          bookIds
          authors
          description
          title
          image
          link
        }
  }
`;

export const GET_ME = gql`

  query me {
    me {
      _id
      username
      email
      bookCount
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;