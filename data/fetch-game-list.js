import axios from 'axios';

export const fetchGameList = async (searchKey, pageSize, pageNumber, selectedCategory) => {
  try {
    const apiUrl = 'https://casino.api.stg.kansino.nl/v1/kansino/en/games/tiles';

    const params = {};

    if (searchKey) {
      params.search = searchKey;
    }

    if (pageNumber) {
      params.pageNumber = pageNumber;
    }

    if (pageSize) {
      params.pageSize = pageSize;
    }

    if (selectedCategory) {
      params.gameCategories = selectedCategory;
    }

    const response = await axios.get(apiUrl, { params });

    return response.data;
  } catch (error) {
    console.error('Error fetching game data:', error);
  }
};
