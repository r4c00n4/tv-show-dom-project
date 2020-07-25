// All the data for the TV shows have been provided by TVmaze URL= "https://www.tvmaze.com/"
// let url = 'https://api.tvmaze.com/shows/82/episodes';
let allEpisodes;

function setup() {
  allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
  selectList(allEpisodes);

  let inputSearch = document.querySelector("#searchInput"); //inputValue
  inputSearch.addEventListener("keyup", searchEpisodes);
}

// for the search of ep number
function searchEpisodes(event) {
  let filterEpisodes = allEpisodes.filter((episode) =>
    episodeMatchQuery(episode, event.target.value)
  );
  makePageForEpisodes(filterEpisodes);

  // display the number of the matched search cases
  let searchDisplay = document.getElementById("searchDisplay");
  searchDisplay.textContent = `Displaying: ${filterEpisodes.length} / ${allEpisodes.length} episodes`;
}

function episodeMatchQuery(ep, searchWord) {
  return (
    ep.name.toLowerCase().includes(searchWord.toLowerCase()) ||
    ep.summary.toLowerCase().includes(searchWord.toLowerCase())
  );
}

// function to pad numbers to 2 digits
function padToTwoDigits(number) {
  return number > 9 ? "" + number : "0" + number;
}

// episodes loading function
function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.textContent = "";

  for (let i = 0; i < episodeList.length; i++) {
    let card = document.createElement("div");
    card.className = "myCard";
    card.setAttribute("id", episodeCode(episodeList[i]));
    rootElem.appendChild(card);

    let title = document.createElement("h2");
    title.innerText = `${episodeList[i].name} - ${episodeCode(episodeList[i])}`;
    card.appendChild(title);

    let mediumImage = document.createElement("img");
    mediumImage.src = episodeList[i].image.medium;
    card.appendChild(mediumImage);

    let summaryText = document.createElement("p");
    summaryText.innerText = episodeList[i].summary;
    card.appendChild(summaryText);
  }
}

function episodeCode(episode) {
  return `S${padToTwoDigits(episode.season)}E${padToTwoDigits(episode.number)}`;
}

// function to load the episode as a select list
function selectList(episodeList) {
  let listSelect = document.getElementById("selectMenu");
  listSelect.addEventListener("change", function (event) {
    window.location.hash = event.target.value;
  });
  for (let i = 0; i < episodeList.length; i++) {
    let listOption = document.createElement("option");
    listOption.setAttribute("value", episodeCode(episodeList[i]));
    listOption.innerText = `${episodeCode(episodeList[i])} - ${
      episodeList[i].name
    }`;
    listSelect.appendChild(listOption);
  }
}

window.onload = setup;
