// All the data for the TV shows have been provided by TVmaze URL= "https://www.tvmaze.com/"
let inputSearch;
let allEpisodes;
// let url = 'https://api.tvmaze.com/shows/82/episodes';

function setup() {
 allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

inputSearch = document.querySelector('#searchInput'); //inputValue
inputSearch.addEventListener("keyup", searchEpisodes);

// for the search of ep number
  let seDisplay= document.getElementById("searchDisplay")
    seDisplay.textContent= "";

function searchEpisodes(){
  let filterEpisodes = allEpisodes.filter(episode =>
    episodeMatchQuery(episode, inputSearch.value));
    makePageForEpisodes(filterEpisodes);

    // display the number of the matched search cases
    let searDisplay = ("Displaying: " + filterEpisodes.length + "/73 episodes");
    seDisplay.append(searDisplay);
    console.log(searDisplay)
}

function episodeMatchQuery(ep, searchWord){
  if (ep.name.toLowerCase().includes(searchWord.toLowerCase()) || ep.summary.toLowerCase().includes(searchWord.toLowerCase())){
    return true;
    }else {
      return false;
  }
}

// episodes loading function
function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.textContent = "";
  
  for (let i = 0; i < episodeList.length; i++){
    let card = document.createElement("div");
     card.className = "myCard";
     rootElem.appendChild(card);

      let title = document.createElement("h2");
       title.innerText = episodeList[i].name; 
       card.appendChild(title);

      let mediumImage = document.createElement("img");
       mediumImage.src =  episodeList[i].image.medium;
       card.appendChild(mediumImage);

      let summaryText = document.createElement("p");
       summaryText.innerText = episodeList[i].summary;
       card.appendChild(summaryText);

      // function to pad numbers to 2 digits
      function sNumber(number){
        return number > 9 ? "" + number: "0" + number;
      }

      let res = "S" + sNumber(episodeList[i].season) + "E"+sNumber(episodeList[i].number);
      title.append(" - " + res);
  }
}

window.onload = setup;
