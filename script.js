// All the data for the TV shows have been provided by TVmaze URL= "https://www.tvmaze.com/"
// let inputSearch;
// let inputButton
// const url = 'https://api.tvmaze.com/shows/82/episodes';
let allEpisodes;

function setup() {
 allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

// inputSearch = document.querySelector('#searchInput'); //inputValue
// inputButton = document.querySelector('#searchButton') //search or button
// inputButton.addEventListener("click", searchEpisodes);

// function searchEpisodes(event){
//   event.preventDefault()
//   inputSearch = inputSearch.value;
//   let newUrl= url + inputSearch;
//   fetch(newUrl)
//     .then(function(response){
//       return response.json();
//     })
//     .then((data) => {
//       console.log(data)
//     })

//   let filterEpisodes = allEpisodes.filter(episode =>
//     episodeMatchQuery(episode, inputSearch.value));
//     makePageForEpisodes(filterEpisodes);
// }

// function episodeMatchQuery(ep, searchWord){
//   if (ep.name.includes(searchWord) || ep.summary.includes(searchWord)){
//     return true;
//   }
// }

function makePageForEpisodes(episodeList) {
//  debugger;
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
