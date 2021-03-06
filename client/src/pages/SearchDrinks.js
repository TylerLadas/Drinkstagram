import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';

import Auth from '../utils/auth';
import { searchCocktails } from '../utils/API';
import { saveDrinkIds, getSavedDrinkIds } from '../utils/localStorage';

import { useMutation } from '@apollo/client';
import { SAVE_DRINK } from '../utils/mutations'

const SearchDrinks = () => {
  // create state for holding returned cocktail api data
  const [searchedDrinks, setSearchedDrinks] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');

  // create state to hold saved drinkId values
  const [savedDrinkIds, setSavedDrinkIds] = useState(getSavedDrinkIds());

  // define saveDrink with mutation
  const [saveDrink, { error }] = useMutation(SAVE_DRINK);

  // set up useEffect hook to save `savedDrinkIds` list to localStorage on component unmount
 
  useEffect(() => {
    return () => saveDrinkIds(savedDrinkIds);
  });

  // create method to search for drinks and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await searchCocktails(searchInput);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const { drinks } = await response.json();

      // remove null values

      const drinkData = drinks.map((drink) => {

        let ingredientsString = "";

        if (drink.strMeasure1) {
          ingredientsString += drink.strMeasure1 + " "
        };

        if (drink.strIngredient1) {
          ingredientsString += drink.strIngredient1 + ", "
        }

        if (drink.strMeasure2) {
          ingredientsString += drink.strMeasure2 + " "
        };

        if (drink.strIngredient2) {
          ingredientsString += drink.strIngredient2 + ", "
        }

        if (drink.strMeasure3) {
          ingredientsString += drink.strMeasure3 + " "
        };

        if (drink.strIngredient3) {
          ingredientsString += drink.strIngredient3 + ", "
        }

        if (drink.strMeasure4) {
          ingredientsString += drink.strMeasure4 + " "
        };

        if (drink.strIngredient4) {
          ingredientsString += drink.strIngredient4 + ", "
        }

        if (drink.strMeasure5) {
          ingredientsString += drink.strMeasure5 + " "
        };

        if (drink.strIngredient5) {
          ingredientsString += drink.strIngredient5 + ", "
        }

        if (drink.strMeasure6) {
          ingredientsString += drink.strMeasure6 + " "
        };

        if (drink.strIngredient6) {
          ingredientsString += drink.strIngredient6 + ", "
        }

        if (drink.strMeasure7) {
          ingredientsString += drink.strMeasure7 + " "
        };

        if (drink.strIngredient7) {
          ingredientsString += drink.strIngredient7 + ", "
        }

        if (drink.strMeasure8) {
          ingredientsString += drink.strMeasure8 + " "
        };

        if (drink.strIngredient8) {
          ingredientsString += drink.strIngredient8 + ", "
        }

        if (drink.strMeasure9) {
          ingredientsString += drink.strMeasure9 + " "
        };

        if (drink.strIngredient9) {
          ingredientsString += drink.strIngredient9 + ", "
        }

        if (drink.strMeasure10) {
          ingredientsString += drink.strMeasure10 + " "
        };

        if (drink.strIngredient10) {
          ingredientsString += drink.strIngredient10 + ", "
        }

        ingredientsString = ingredientsString.slice(0, -2);

        return ({

        drinkId: drink.idDrink,
        title: drink.strDrink,
        ingredients: ingredientsString,
        instructions: drink.strInstructions,
        image: drink.strDrinkThumb || '',
      })});

      setSearchedDrinks(drinkData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };
  
  // create function to handle saving a drink to our database
  const handleSaveDrink = async (drinkId) => {
    // find the drink in `searchedDrinks` state by the matching id
    const drinkToSave = searchedDrinks.find((drink) => drink.drinkId === drinkId);

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await saveDrink({ 
        variables: {input: drinkToSave}
      });

      if (error) {
        throw new Error('something went wrong!');
      }

      // if drink successfully saves to user's account, save drink id to state
      setSavedDrinkIds([...savedDrinkIds, drinkToSave.drinkId]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark jumbo'>
        <Container>
          <h1>Search for Drinks!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Search for a drink'
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type='submit' variant='success' size='lg'>
                  Submit Search
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      </Jumbotron>

      <Container className='searchBegin'>
        <h2 style={{color: 'white'}}>
          {searchedDrinks.length
            ? `Viewing ${searchedDrinks.length} results:`
            : 'Search for a drink to begin'}
        </h2>
        <CardColumns>
          {searchedDrinks.map((drink) => {
            return (
              <Card key={drink.drinkId} border='dark'>
                {drink.image ? (
                  <Card.Img src={drink.image} alt={`The cover for ${drink.title}`} variant='top' />
                ) : null}
                <Card.Body>
                  <Card.Title>{drink.title}</Card.Title>
                  <p className='small'>Ingredients: {drink.ingredients}</p>
                  <Card.Text>Instructions: {drink.instructions}</Card.Text>
                  {Auth.loggedIn() && (
                    <Button
                      disabled={savedDrinkIds?.some((savedDrinkId) => savedDrinkId === drink.drinkId)}
                      className='btn-block btn-info'
                      onClick={() => handleSaveDrink(drink.drinkId)}>
                      {savedDrinkIds?.some((savedDrinkId) => savedDrinkId === drink.drinkId)
                        ? 'This drink has already been saved!'
                        : 'Save this Drink!'}
                    </Button>
                  )}
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SearchDrinks;