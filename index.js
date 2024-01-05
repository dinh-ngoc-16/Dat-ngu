const baseURL = "https://steam-api-dot-cs-platform-306304.et.r.appspot.com";
let searchValue = "";
let tag = "";
let page = 1;
let limit = 10;
let genres = "";

// hàm chung xử lí call api
const handleCallApi = async (url, method) => {
  try {
    const respone = await fetch(url, {
      method: method,
    });
    return respone.json();
  } catch (error) {
    console.log(error);
  }
};
// --------------------------------------------------

// lấy list game và render
const getAllGames = async (searchValue, tag, page = 1, limit = 10, genres) => {
  let url = `${baseURL}/games?`;
  if (searchValue || searchValue !== "") {
    url = `${url}q=${searchValue}&`;
  }

  if (tag || tag !== "") {
    url = `${url}steamspy_tags=${tag}&`;
  }

  if (page || page >= 1) {
    url = `${url}page=${page}&`;
  }

  if (limit || limit > 0) {
    url = `${url}limit=${limit}&`;
  }

  if (genres || genres !== "") {
    url = `${url}genres=${genres}&`;
  }

  const res = await handleCallApi(url, "GET");

  renderAllGames(res);
};

const renderAllGames = (data) => {
  console.log("games", data);
};

document.getElementById("button_game").addEventListener("click", async () => {
  getAllGames(searchValue, tag, page, limit, genres);
});

// -----------------------------------------------------

// lấy thông tin genres
const getAllGenres = async (page = 1, limit = 10) => {
  let url = `${baseURL}/genres?`;

  if (page || page >= 1) {
    url = `${url}page=${page}&`;
  }

  if (limit || limit > 0) {
    url = `${url}limit=${limit}&`;
  }

  const res = await handleCallApi(url, "GET");

  renderAllGenres(res);
};

const renderAllGenres = (data) => {
  console.log("genres", data);
};

document.getElementById("button_genres").addEventListener("click", async () => {
  getAllGenres(page, limit);
});
// --------------------------------------------------------

// lấy thông tin tags
const getAllTag = async (page = 1, limit = 10) => {
  let url = `${baseURL}/steamspy-tags?`;

  if (page || page >= 1) {
    url = `${url}page=${page}&`;
  }

  if (limit || limit > 0) {
    url = `${url}limit=${limit}&`;
  }

  const res = await handleCallApi(url, "GET");

  renderAllTags(res);
};

const renderAllTags = (data) => {
  console.log("Tags", data);
};

document.getElementById("button_tags").addEventListener("click", async () => {
  getAllTag(page, limit);
});
// --------------------------------------------------------

// lấy thông tin chi tiết 1 game
const getDetailGame = async (appid) => {
  if (appid || appid !== "") {
    let url = `${baseURL}/single-game/${appid}`;

    const res = await handleCallApi(url, "GET");

    renderDetailGame(res);
  }
};

const renderDetailGame = (data) => {
  console.log("Detail game", data);
};

document
  .getElementById("button_detail_game")
  .addEventListener("click", async () => {
    // thay đổi id theo từng game được chọn
    // đang hard id
    getDetailGame(570);
  });
// --------------------------------------------------------

// lấy thông tin chi tiết 1 game
const getFeaturedGames = async () => {
  let url = `${baseURL}/features`;

  const res = await handleCallApi(url, "GET");

  renderFeaturedGames(res);
};

const renderFeaturedGames = (data) => {
  console.log("Featured Games", data);
};

document
  .getElementById("button_featured_games")
  .addEventListener("click", async () => {
    // thay đổi id theo từng game được chọn
    // đang hard id
    getFeaturedGames();
  });
// --------------------------------------------------------
