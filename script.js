// All the data for the TV shows have been provided by TVmaze URL= "https://www.tvmaze.com/"
let inputSearch;
let allEpisodes;
// let url = 'https://api.tvmaze.com/shows/82/episodes';

function setup() {
 allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
  selectList(allEpisodes);
}

inputSearch = document.querySelector('#searchInput'); //inputValue
inputSearch.addEventListener("keyup", searchEpisodes);

// for the search of ep number
  let seDisplay= document.getElementById("searchDisplay")
    

function searchEpisodes(){
  let filterEpisodes = allEpisodes.filter(episode =>
    episodeMatchQuery(episode, inputSearch.value));
    makePageForEpisodes(filterEpisodes);

    // display the number of the matched search cases
    let searDisplay = ("Displaying: " + filterEpisodes.length + "/"+ allEpisodes.length +"episodes");
    seDisplay.textContent= "";
    seDisplay.append(searDisplay);
}

function episodeMatchQuery(ep, searchWord){
  if (ep.name.toLowerCase().includes(searchWord.toLowerCase()) || ep.summary.toLowerCase().includes(searchWord.toLowerCase())){
    return true;
    }else {
      return false;
  }
}

// function to pad numbers to 2 digits
function sNumber(number){
  return number > 9 ? "" + number: "0" + number;
}

// episodes loading function
function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.textContent = "";
  
  for (let i = 0; i < episodeList.length; i++){
    let card = document.createElement("div");
     card.className = "myCard";
     card.setAttribute("id",[i]);
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

      let res = "S" + sNumber(episodeList[i].season) + "E"+sNumber(episodeList[i].number);
      title.append(" - " + res);
  }
}

// function to load the episode as a select list 
function selectList(episodeList){
  let listSelect = document.getElementById('selectMenu');

  for (let i=0; i < episodeList.length ;i++){

    let listOption = document.createElement('option');
     listOption.setAttribute("id",[i]);
     listSelect.appendChild(listOption);

    let title = document.createElement("h3");
      title.innerText = episodeList[i].name;
      listOption.appendChild(title);

    let res = "S" + sNumber(episodeList[i].season) + "E"+sNumber(episodeList[i].number);
      title.before(res + " - ");
      
    // let ssc = ssc.addEventListener('onclick', showSelectedCard);
    // console.log(ssc)
    // function showSelectedCard(){
    //   let elem = document.getElementById(listOption.id);
    //   elem.scrollIntoView();
    //   return elem;
    // }
  }
}

window.onload = setup;
