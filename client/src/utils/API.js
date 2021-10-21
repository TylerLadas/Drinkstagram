// make a search to TheCocktailDB
// www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita
export const searchCocktails = (query) => {
    return fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`);
};
  