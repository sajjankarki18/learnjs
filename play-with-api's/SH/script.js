//url = https://superheroapi.com/api/access-token/character-id
// let api = "https://superheroapi.com/api.php/10223569763528853/245"

let TOKEN = '10223569763528853'
let BASE_URL = `https://superheroapi.com/api.php/${TOKEN}`

let imgEL = document.getElementById('js-img-div')
let getRandomCharEL = document.getElementById('js-random-btn')
let inputEL = document.getElementById('js-input')
let searchBtnEL = document.getElementById('js-search-char')
let statsEL = document.getElementById('js-char-stats')

const getCharacters = async (id) => {
  const url = `${BASE_URL}/${id}`;
  const res = await fetch(url);
  const data = await res.json();

  let stats = getCharactersStats(data);
  imgEL.innerHTML = `<img  src='${data.image.url}' height=350 width=350/>`;
  statsEL.innerHTML = `${stats}`;
}

const getSearchedCharacters = async (name) => {
    const url = `${BASE_URL}/search/${name}`;
    const res = await fetch(url);
    const data = await res.json();

    let hero = data.results[0];
    let stats = getCharactersStats(hero);
    imgEL.innerHTML = `<img  src='${hero.image.url}' height=350 width=350/>`;
    statsEL.innerHTML = `${stats}`;

}

const getCharactersStats = (char) => {
  const stats = Object.keys(char.powerstats).map((stat) => {
    return `<p>${stat}: ${char.powerstats[stat]}</p>`;
  });
  return stats.join(' ')
};

const getRandomCharacters = () => {
    let randomchar = Math.floor(Math.random() * 731) + 1

    return randomchar
}

getRandomCharEL.onclick = () => getCharacters(getRandomCharacters())
searchBtnEL.onclick = () => {
    getSearchedCharacters(inputEL.value)
    inputEL.value = ''
}


