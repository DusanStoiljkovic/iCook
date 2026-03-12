import { API_URL, RES_PER_PAGE } from './config.js';
import { async } from 'regenerator-runtime';
import { getJSON } from './helpers.js';

export const state = {
  recipe: {
    servings: 4,
  },
  search: {
    page: 1,
    query: '',
    results: [],
    resultsPerPage: RES_PER_PAGE,
  },
};

export const loadRecipe = async id => {
  try {
    const data = await getJSON(`${API_URL}/${id}`);

    let { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingtime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const loadSearchResults = async query => {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);

    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });
  } catch (err) {
    throw err;
  }
};

export const getSearchResultsPage = page => {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;

  return state.search.results.slice(start, end);
};

export const updateServings = newServings => {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = ing.quantity * (newServings / state.recipe.servings);
  });

  state.recipe.servings = newServings;
};
