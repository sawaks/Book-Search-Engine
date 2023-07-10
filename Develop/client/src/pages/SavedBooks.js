import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import {
  Container,
  Card,
  Button,
  Row,
  Col
} from 'react-bootstrap';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
// import { getMe, deleteBook } from '../utils/API';
import Auth from '../utils/auth';
// import { removeBookId } from '../utils/localStorage';

import { REMOVE_BOOK } from '../utils/mutations';

import { GET_ME, QUERY_SINGLE_USER } from '../utils/queries';


const SavedBooks = () => {
  const [userData, setUserData] = useState({});
  const { userId, username: userParam } = useParams();

  // use this to determine if `useEffect()` hook needs to run again
  const userDataLength = Object.keys(userData).length;

  const { loading, data } = useQuery(
    userId || userParam ? QUERY_SINGLE_USER : GET_ME,
    {
      variables: { userId: userId, username: userParam },
    }
  );

  const user = data?.me || data?.user || {};

  const [removeBook, { error }] = useMutation(REMOVE_BOOK, {
    update(cache, { data: { removeBook } }) {
      try {
        cache.writeQuery({
          query: GET_ME,
          data: { me: removeBook },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });

  if (Auth.loggedIn() && Auth.getProfile().data._id === userId || Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/saved" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see your page. Use the navigation
        links above to sign up or log in!
      </h4>
    );
  }
  // useEffect(() => {
  //   const getUserData = async () => {
  //     try {
  //       const token = Auth.loggedIn() ? Auth.getToken() : null;

  //       if (!token) {
  //         return false;
  //       }

  //       const response = await getMe(token);

  //       if (!response.ok) {
  //         throw new Error('something went wrong!');
  //       }

  //       const user = await response.json();
  //       setUserData(user);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };

  //   getUserData();
  // }, [userDataLength]);



  const handleDeleteBook = async (bookId) => {
    // const token = Auth.loggedIn() ? Auth.getToken() : null;

    // if (!token) {
    //   return false;
    // }

    try {
      const { data } = await removeBook({
        variables: { bookId },
      });
      // const response = await deleteBook(bookId, token);

      // if (!response.ok) {
      //   throw new Error('something went wrong!');
      // }

      // const updatedUser = await response.json();
      // setUserData(updatedUser);
      // upon success, remove book's id from localStorage
      // removeBookId(bookId);
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  // if (!userDataLength) {
  //   return <h2>LOADING...</h2>;
  // }

  return (
    <>
      <div fluid className='text-light bg-dark p-5'>
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <Row>
          {userData.savedBooks.map((book) => {
            return (
              <Col md="4">
                <Card key={book.bookId} border='dark'>
                  {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className='small'>Authors: {book.authors}</p>
                    <Card.Text>{book.description}</Card.Text>
                    <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                      Delete this Book!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;
