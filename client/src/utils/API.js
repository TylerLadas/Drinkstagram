// make a search to TheCocktailDB
// www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita
export const searchGoogleBooks = (query) => {
    return fetch(`www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`);
};
  