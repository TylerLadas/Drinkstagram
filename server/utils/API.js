//  make a search to thecocktaildb api
export const searchCocktails = (query) => {
    return fetch(`www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`);
};

//  random cocktail api call
export const searchCocktails = (query) => {
    return fetch(`www.thecocktaildb.com/api/json/v1/1/random.php`);
};