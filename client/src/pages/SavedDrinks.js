import React from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';

// import { getMe, deleteDrink } from '../utils/API';
import Auth from '../utils/auth';
import { removeDrinkId } from '../utils/localStorage';

import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../utils/queries'
import { REMOVE_DRINK } from '../utils/mutations'

const SavedDrinks = () => {

  const { loading, data } = useQuery(GET_ME); 
  const [ removeDrink, { error } ] = useMutation(REMOVE_DRINK);

  const userData = data?.me || [];

  // create function that accepts the drink's mongo _id value as param and deletes the drink from the database
  const handleDeleteDrink = async (drinkId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await removeDrink({
        variables: { drinkId }
      });

      if (error) {
        throw new Error('something went wrong!');
      }

      // upon success, remove drink's id from localStorage
      removeDrinkId(drinkId);
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark jumbo'>
        <Container>
          <h1>Viewing saved drinks!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.savedDrinks.length
            ? `Viewing ${userData.savedDrinks.length} saved ${userData.savedDrinks.length === 1 ? 'drink' : 'drinks'}:`
            : 'You have no saved drinks!'}
        </h2>
        <CardColumns>
          {userData.savedDrinks.map((drink) => {
            return (
              <Card key={drink.drinkId} border='dark'>
                {drink.image ? <Card.Img src={drink.image} alt={`The cover for ${drink.title}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{drink.title}</Card.Title>
                  <p className='small'>Ingredients: {drink.ingredients}</p>
                  <Card.Text>{drink.instructions}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteDrink(drink.drinkId)}>
                    Delete this Drink!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedDrinks;