import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation SaveBook($bookInfo: infoBook!) {
    saveBook(bookInfo: $bookInfo) {
      savedBooks {
        title
        link
        image
        description
        bookId
        authors
      }
    }
  }
`;

export const REMOVE_BOOK = gql`

  mutation RemoveBook($bookId: ID!) {
    removeBook(bookId: $bookId) {
      username
      savedBooks {
        title
        link
        image
        description
        bookId
        authors
      }
    }
  }
`;

