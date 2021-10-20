import { gql } from '@apollo/client';

// login user
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

// add new user
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


// add to saved drinks
export const SAVE_DRINK = gql`
    mutation saveDrink($input: savedDrink!) {
        saveDrink(input: $input ) {
            _id
            username
            email
            drinkCount
            savedDrinks {
                drinkId
                title
                instructions
                ingredients
                image
            }
        }
    }
`;


// remove saved drink
export const REMOVE_DRINK = gql`
    mutation removeDrink($drinkId: String!) {
        removeDrink(drinkId: $drinkId) {
            _id
            username
            email
            drinkCount
            savedDrinks {
                drinkId
                title
                instructions
                ingredients
                image
            }
        }
    }
`;