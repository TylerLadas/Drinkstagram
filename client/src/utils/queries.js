import { gql } from '@apollo/client';

export const GET_ME = gql`
    {
        me {
            _id
            username
            email
            drinkCount
            savedDrinks {
                drinkId
                ingredients
                instructions
                title
                image
            }
        }
    }
`;