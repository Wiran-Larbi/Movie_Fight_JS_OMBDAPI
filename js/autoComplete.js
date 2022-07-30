//? Finding the Color Type
class ColorFinder{
    //? Utilities  //
   Color_Genre = new Map([
    ["action",'bg-red-500'],
    ["comedy",'bg-yellow-300'],
    ["drama",'bg-pink-600'],
    ["fantasy",'bg-violet-400'],
    ["horror",'bg-lime-600'],
    ["western",'bg-orange-500'],
    ["mystery",'bg-stone-500'],
    ["thriller",'bg-emerald-500'],
    ["default","bg-green-400"]
  ]);
  
  Color_Type = new Map([
    ["movie",'red'],
    ["series",'violet']
  ]);
        constructor(type){
             this.type = type;
        }
        get TypeColor(){
              for(const key of this.Color_Type.keys()){
                  if(this.type.indexOf(key) != -1)
                      return this.Color_Type.get(key);
              }
        }     
}
let LeftMovie,RightMovie;

//! Auto Complete Decoupling
const AutoComplete = ({Side,PlayerContainer,renderOption,renderSelected,startComparing}) => {
    const Input = PlayerContainer.querySelector("input");
    const WholeWrapper = PlayerContainer.parentElement;
    const SearchWrapper = PlayerContainer.querySelector(".search-wrapper");
    const SelectedWrapper = PlayerContainer.querySelector(".selected-wrapper");
    const msgIndic = document.querySelector(".msgIndic");


//? Handeling Focus on Input
    Input.onfocus = () => {
                if(Input.classList.contains("search-selected"))
                   Input.classList.remove("search-selected");
    }
//! Handeling click Outside of the menu after search
document.onclick = (e) =>{
        if(!WholeWrapper.contains(e.target)){
          SelectedWrapper.classList.add("hidden");
          SearchWrapper.classList.remove("flex");
        }
}

//? Main Function That Display on input search
const onInputSearch = async (event)=>{
    if(event.target.value){
      let movies = await Moviefetch(event.target.value);

      if(movies.length !== 0){
           ViewSearch(movies);
       }
    }else{
           hideSearchResult();
    }
}



//? Function To View Search
function ViewSearch(movies = []){
                SearchWrapper.innerHTML = '';
                if(!msgIndic.classList.contains("hidden")) msgIndic.classList.add("hidden");
                let hrCounter = 0; 
                if(movies.length !== 0){
                     let slicedMovies = movies.slice(0, 3);
                   SearchWrapper.classList.remove("hidden");SearchWrapper.classList.add("flex");
                  //! Displaying All Movies
                   for (const movie of slicedMovies) {
                          //? Dom Manipulation Area
                           let option = document.createElement("div"); option.classList.add("search-result");option.dataset.search = "result";
                           let Colors = new ColorFinder(movie.Type);

                           //? Rendering Movie
                           option.innerHTML = renderOption(movie);

                           //? The Type Show
                           let TypeSpan = document.createElement("span"); TypeSpan.innerText = movie.Type; TypeSpan.classList.add('movie-type', `${Colors.TypeColor}`); option.appendChild(TypeSpan);
                           
                           //? Horizontal Row
                           let hr = document.createElement("hr"); hr.classList.add("divisor");
                           if(hrCounter !== movies.length )
                              if(hrCounter !== 0)SearchWrapper.appendChild(hr);
                            
                           //! Handeling Click on a given movie

                           option.onclick = () => {
                           Input.value = movie.Title;
                           let optionID = option.querySelector("input").value;
                           
                           //! Dom Stuff
                           SearchWrapper.classList.add("hidden");SearchWrapper.classList.remove("flex"); Input.classList.add("search-selected");
                          
                           //? Handling Selecting a Movie
                           ViewMovieSelect(optionID);   
                         }


                           SearchWrapper.appendChild(option);
                           hrCounter++;
                   }

             }
}


//? Function To View Selected Option
const ViewMovieSelect = async(movieID) => {
           //? After Fetching Data
           let movie = await onMovieSelect(movieID); 
           if(movie.length === 0) return;

           //? Rendering Movie Data
           let movieHTML = renderSelected(movie); 

           //? Basic DOM Manipulation
             SelectedWrapper.innerHTML =  movieHTML;
             SelectedWrapper.classList.remove("hidden"); SelectedWrapper.classList.add("flex");
            if(Side === "left") LeftMovie = movieHTML;
            if(Side === "right") RightMovie = movieHTML;

            if(LeftMovie && RightMovie){
                startComparing();
            }
}

//? Function To Hide Search
function hideSearchResult() {
    SearchWrapper.innerHTML = '';
    SearchWrapper.classList.add("hidden");
    SearchWrapper.classList.remove("flex");
}


//? Compare Function
function startComparing() {
        //! First Player Stats
           let awardsOne = document.querySelector("[data-movie='selected-wrapper-1'] [data-movie='awards']");
           let awardsOneVal = parseInt(document.querySelector("[data-movie='selected-wrapper-1'] [data-movie='awards']").getAttribute("data-value"));
           let boxofficeOne = document.querySelector("[data-movie='selected-wrapper-1'] [data-movie='boxoffice']");
           let boxofficeOneVal = parseInt(document.querySelector("[data-movie='selected-wrapper-1'] [data-movie='boxoffice']").getAttribute("data-value"));
           let metascoreOne = document.querySelector("[data-movie='selected-wrapper-1'] [data-movie='metascore']");
           let metascoreOneVal = parseInt(document.querySelector("[data-movie='selected-wrapper-1'] [data-movie='metascore']").getAttribute("data-value"));
           let imdbratingOne = document.querySelector("[data-movie='selected-wrapper-1'] [data-movie='imdbrating']");
           let imdbratingOneVal = parseFloat(document.querySelector("[data-movie='selected-wrapper-1'] [data-movie='imdbrating']").getAttribute("data-value"));
           let imdbvoteOne = document.querySelector("[data-movie='selected-wrapper-1'] [data-movie='imdbvotes']");
           let imdbvoteOneVal = parseInt(document.querySelector("[data-movie='selected-wrapper-1'] [data-movie='imdbvotes']").getAttribute("data-value"));
        
        //! Second Player Stats
           let awardsTwo = document.querySelector("[data-movie='selected-wrapper-2'] [data-movie='awards']");
           let awardsTwoVal = parseInt(document.querySelector("[data-movie='selected-wrapper-2'] [data-movie='awards']").getAttribute("data-value"));
           let boxofficeTwo = document.querySelector("[data-movie='selected-wrapper-2'] [data-movie='boxoffice']");
           let boxofficeTwoVal = parseInt(document.querySelector("[data-movie='selected-wrapper-2'] [data-movie='boxoffice']").getAttribute("data-value"));
           let metascoreTwo = document.querySelector("[data-movie='selected-wrapper-2'] [data-movie='metascore']");
           let metascoreTwoVal = parseInt(document.querySelector("[data-movie='selected-wrapper-2'] [data-movie='metascore']").getAttribute("data-value"));
           let imdbratingTwo = document.querySelector("[data-movie='selected-wrapper-2'] [data-movie='imdbrating']");
           let imdbratingTwoVal = parseFloat(document.querySelector("[data-movie='selected-wrapper-2'] [data-movie='imdbrating']").getAttribute("data-value"));
           let imdbvoteTwo = document.querySelector("[data-movie='selected-wrapper-2'] [data-movie='imdbvotes']");
           let imdbvoteTwoVal = parseInt(document.querySelector("[data-movie='selected-wrapper-2'] [data-movie='imdbvotes']").getAttribute("data-value"));
            
          
           if(awardsOneVal > awardsTwoVal){
                   awardsTwo.classList.remove("critic");
                   awardsTwo.classList.add("boxoffice");
            }else{
                   awardsOne.classList.remove("critic");
                   awardsOne.classList.add("boxoffice");
            }
        
            if(boxofficeOneVal > boxofficeTwoVal){
                   boxofficeTwo.classList.remove("critic");
                   boxofficeTwo.classList.add("boxoffice");
            }else{
                   boxofficeOne.classList.remove("critic");
                   boxofficeOne.classList.add("boxoffice");
            }
            if(metascoreOneVal > metascoreTwoVal){
                   metascoreTwo.classList.remove("critic");
                   metascoreTwo.classList.add("boxoffice");
            }else{
                   metascoreOne.classList.remove("critic");
                   metascoreOne.classList.add("boxoffice");
            }
            if(imdbratingOneVal > imdbratingTwoVal){
                   imdbratingTwo.classList.remove("critic");
                   imdbratingTwo.classList.add("boxoffice");
            }else{
                   imdbratingOne.classList.remove("critic");
                   imdbratingOne.classList.add("boxoffice");
            }
            if(imdbvoteOneVal > imdbvoteTwoVal){
                   imdbvoteTwo.classList.remove("critic");
                   imdbvoteTwo.classList.add("boxoffice");
            }else{
                   imdbvoteOne.classList.remove("critic");
                   imdbvoteOne.classList.add("boxoffice");
            }
}
    //? Debouncing The Search Area To Minimize the number of calls to API
    Input.oninput = debounce(onInputSearch,500);
}

//! First Auto Complete
AutoComplete({
       Side: "left",
       PlayerContainer : document.querySelector("[data-player='1']"),
       renderOption : (movie) => {
           let src = movie.Poster === 'N/A' ? '' : movie.Poster; 
           return `<img src="${src}" alt="poster" style="width: 60px;">
                   <h3 class="movie-title">${movie.Title} (${movie.Year})</h3>
                   <input type="hidden" value=${movie.imdbID}>`;
       },
        renderSelected : (movie) => {
            let GenreArr = movie.Genre.split(",");
            let dollars = parseInt(movie.BoxOffice.replace(/\$/g,'').replace(/,/g,''));
            let metascore = parseInt(movie.Metascore);
            let imdbrating = parseFloat(movie.imdbRating);
            let imdbvotes = parseInt(movie.imdbVotes.replace(/,/g,''));

            let countAwards = movie.Awards.split(' ').reduce((prev,word)=>{
                    let value = parseInt(word);
                    return isNaN(value) ? prev : prev + value;
            },0);

            return `
            <div class="selected-container">
            <div data-movie="selected-description" class="selected-description">
                <img src="${movie.Poster}" alt="movie poster" style="width: 180px;" class="rounded-md">
                <article class="selected-wrapper flex">
                    <h3 class="selected-Title">${movie.Title} (${movie.Year})</h3>
                    <span class="selected-Text">${movie.Plot}</span>
                    <span class="genre-wrapper">
                        <span style="background-color: #FF0063;" class="genre">
                            ${GenreArr[0]}</span>
                        <span style="background-color: #3AB4F2;" class="genre">
                            ${GenreArr[1]}</span>
                        <span style="background-color: #F2DF3A;" class="genre">
                            ${GenreArr[2]}</span>
                    </span>
                </article>
            </div>
            <div data-value="${countAwards}" data-movie="awards" class="critic criteria">
                    <span> </span>
                    <span class="text-yellow-500 flex flex-row items-center gap-1">
                       <span>${movie.Awards}</span>
                    </span> 
            </div>
            <div data-value="${dollars}" data-movie="boxoffice" class="critic criteria">
                <span>BoxOffice : </span>
                <span class="text-yellow-500 flex flex-row items-center gap-1">
                    <span>${movie.BoxOffice}</span>
                    <svg class="fill-yellow-300 w-4 inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                        <path d="M381.2 150.3L524.9 171.5C536.8 173.2 546.8 181.6 550.6 193.1C554.4 204.7 551.3 217.3 542.7 225.9L438.5 328.1L463.1 474.7C465.1 486.7 460.2 498.9 450.2 506C440.3 513.1 427.2 514 416.5 508.3L288.1 439.8L159.8 508.3C149 514 135.9 513.1 126 506C116.1 498.9 111.1 486.7 113.2 474.7L137.8 328.1L33.58 225.9C24.97 217.3 21.91 204.7 25.69 193.1C29.46 181.6 39.43 173.2 51.42 171.5L195 150.3L259.4 17.97C264.7 6.954 275.9-.0391 288.1-.0391C300.4-.0391 311.6 6.954 316.9 17.97L381.2 150.3z"/>
                    </svg>
                    </span> 
            </div>
            <div data-value="${metascore}" data-movie="metascore" class="critic criteria">
            <span>Metascore : </span>
            <span class="text-yellow-500 flex flex-row items-center gap-1">
               <span>${movie.Metascore}</span>
               <svg class="fill-yellow-500 w-3 inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                <path d="M160 0C177.7 0 192 14.33 192 32V67.68C193.6 67.89 195.1 68.12 196.7 68.35C207.3 69.93 238.9 75.02 251.9 78.31C268.1 82.65 279.4 100.1 275 117.2C270.7 134.3 253.3 144.7 236.1 140.4C226.8 137.1 198.5 133.3 187.3 131.7C155.2 126.9 127.7 129.3 108.8 136.5C90.52 143.5 82.93 153.4 80.92 164.5C78.98 175.2 80.45 181.3 82.21 185.1C84.1 189.1 87.79 193.6 95.14 198.5C111.4 209.2 136.2 216.4 168.4 225.1L171.2 225.9C199.6 233.6 234.4 243.1 260.2 260.2C274.3 269.6 287.6 282.3 295.8 299.9C304.1 317.7 305.9 337.7 302.1 358.1C295.1 397 268.1 422.4 236.4 435.6C222.8 441.2 207.8 444.8 192 446.6V480C192 497.7 177.7 512 160 512C142.3 512 128 497.7 128 480V445.1C127.6 445.1 127.1 444.1 126.7 444.9L126.5 444.9C102.2 441.1 62.07 430.6 35 418.6C18.85 411.4 11.58 392.5 18.76 376.3C25.94 360.2 44.85 352.9 60.1 360.1C81.9 369.4 116.3 378.5 136.2 381.6C168.2 386.4 194.5 383.6 212.3 376.4C229.2 369.5 236.9 359.5 239.1 347.5C241 336.8 239.6 330.7 237.8 326.9C235.9 322.9 232.2 318.4 224.9 313.5C208.6 302.8 183.8 295.6 151.6 286.9L148.8 286.1C120.4 278.4 85.58 268.9 59.76 251.8C45.65 242.4 32.43 229.7 24.22 212.1C15.89 194.3 14.08 174.3 17.95 153C25.03 114.1 53.05 89.29 85.96 76.73C98.98 71.76 113.1 68.49 128 66.73V32C128 14.33 142.3 0 160 0V0z"/>
                </svg>
            </span> 
            </div>
            <div data-value="${imdbrating}" data-movie="imdbrating" class="critic criteria">
            <span>Imdb Rating : </span>
            <span class="text-yellow-500 flex flex-row items-center gap-1">
                <span>${movie.imdbRating}</span>
                <svg class="fill-yellow-300 w-4 inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                    <path d="M381.2 150.3L524.9 171.5C536.8 173.2 546.8 181.6 550.6 193.1C554.4 204.7 551.3 217.3 542.7 225.9L438.5 328.1L463.1 474.7C465.1 486.7 460.2 498.9 450.2 506C440.3 513.1 427.2 514 416.5 508.3L288.1 439.8L159.8 508.3C149 514 135.9 513.1 126 506C116.1 498.9 111.1 486.7 113.2 474.7L137.8 328.1L33.58 225.9C24.97 217.3 21.91 204.7 25.69 193.1C29.46 181.6 39.43 173.2 51.42 171.5L195 150.3L259.4 17.97C264.7 6.954 275.9-.0391 288.1-.0391C300.4-.0391 311.6 6.954 316.9 17.97L381.2 150.3z"/>
                </svg>
                </span> 
            </div>
            <div data-value = "${imdbvotes}" data-movie="imdbvotes" class="critic criteria">
            <span>Imdb Votes : </span>
            <span class="text-yellow-500 flex flex-row items-center gap-1">
               <span>${movie.imdbVotes}</span>
               <svg class="fill-yellow-500 w-3 inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                <path d="M160 0C177.7 0 192 14.33 192 32V67.68C193.6 67.89 195.1 68.12 196.7 68.35C207.3 69.93 238.9 75.02 251.9 78.31C268.1 82.65 279.4 100.1 275 117.2C270.7 134.3 253.3 144.7 236.1 140.4C226.8 137.1 198.5 133.3 187.3 131.7C155.2 126.9 127.7 129.3 108.8 136.5C90.52 143.5 82.93 153.4 80.92 164.5C78.98 175.2 80.45 181.3 82.21 185.1C84.1 189.1 87.79 193.6 95.14 198.5C111.4 209.2 136.2 216.4 168.4 225.1L171.2 225.9C199.6 233.6 234.4 243.1 260.2 260.2C274.3 269.6 287.6 282.3 295.8 299.9C304.1 317.7 305.9 337.7 302.1 358.1C295.1 397 268.1 422.4 236.4 435.6C222.8 441.2 207.8 444.8 192 446.6V480C192 497.7 177.7 512 160 512C142.3 512 128 497.7 128 480V445.1C127.6 445.1 127.1 444.1 126.7 444.9L126.5 444.9C102.2 441.1 62.07 430.6 35 418.6C18.85 411.4 11.58 392.5 18.76 376.3C25.94 360.2 44.85 352.9 60.1 360.1C81.9 369.4 116.3 378.5 136.2 381.6C168.2 386.4 194.5 383.6 212.3 376.4C229.2 369.5 236.9 359.5 239.1 347.5C241 336.8 239.6 330.7 237.8 326.9C235.9 322.9 232.2 318.4 224.9 313.5C208.6 302.8 183.8 295.6 151.6 286.9L148.8 286.1C120.4 278.4 85.58 268.9 59.76 251.8C45.65 242.4 32.43 229.7 24.22 212.1C15.89 194.3 14.08 174.3 17.95 153C25.03 114.1 53.05 89.29 85.96 76.73C98.98 71.76 113.1 68.49 128 66.73V32C128 14.33 142.3 0 160 0V0z"/>
                </svg>
            </span> 
            </div>
        </div>
        `;
       }
});

//! Second Auto Complete
AutoComplete({
       Side: "right",
       PlayerContainer : document.querySelector("[data-player='2']"),
       renderOption : (movie) => {
           let src = movie.Poster === 'N/A' ? '' : movie.Poster; 
           return `<img src="${src}" alt="poster" style="width: 60px;">
                   <h3 class="movie-title">${movie.Title} (${movie.Year})</h3>
                   <input type="hidden" value=${movie.imdbID}>`;
       },
        renderSelected : (movie) => {
            let GenreArr = movie.Genre.split(",");
            let dollars = parseInt(movie.BoxOffice.replace(/\$/g,'').replace(/,/g,''));
            let metascore = parseInt(movie.Metascore);
            let imdbrating = parseFloat(movie.imdbRating);
            let imdbvotes = parseInt(movie.imdbVotes.replace(/,/g,''));

            let countAwards = movie.Awards.split(' ').reduce((prev,word)=>{
                    let value = parseInt(word);
                    return isNaN(value) ? prev : prev + value;
            },0);

            return `
            <div class="selected-container">
            <div data-movie="selected-description" class="selected-description">
                <img src="${movie.Poster}" alt="movie poster" style="width: 180px;" class="rounded-md">
                <article class="selected-wrapper flex">
                    <h3 class="selected-Title">${movie.Title} (${movie.Year})</h3>
                    <span class="selected-Text">${movie.Plot}</span>
                    <span class="genre-wrapper">
                        <span style="background-color: #FF0063;" class="genre">
                            ${GenreArr[0]}</span>
                        <span style="background-color: #3AB4F2;" class="genre">
                            ${GenreArr[1]}</span>
                        <span style="background-color: #F2DF3A;" class="genre">
                            ${GenreArr[2]}</span>
                    </span>
                </article>
            </div>
            <div data-value="${countAwards}" data-movie="awards" class="critic criteria">
                    <span> </span>
                    <span class="text-yellow-500 flex flex-row items-center gap-1">
                       <span>${movie.Awards}</span>
                    </span> 
            </div>
            <div data-value="${dollars}" data-movie="boxoffice" class="critic criteria">
                <span>BoxOffice : </span>
                <span class="text-yellow-500 flex flex-row items-center gap-1">
                    <span>${movie.BoxOffice}</span>
                    <svg class="fill-yellow-300 w-4 inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                        <path d="M381.2 150.3L524.9 171.5C536.8 173.2 546.8 181.6 550.6 193.1C554.4 204.7 551.3 217.3 542.7 225.9L438.5 328.1L463.1 474.7C465.1 486.7 460.2 498.9 450.2 506C440.3 513.1 427.2 514 416.5 508.3L288.1 439.8L159.8 508.3C149 514 135.9 513.1 126 506C116.1 498.9 111.1 486.7 113.2 474.7L137.8 328.1L33.58 225.9C24.97 217.3 21.91 204.7 25.69 193.1C29.46 181.6 39.43 173.2 51.42 171.5L195 150.3L259.4 17.97C264.7 6.954 275.9-.0391 288.1-.0391C300.4-.0391 311.6 6.954 316.9 17.97L381.2 150.3z"/>
                    </svg>
                    </span> 
            </div>
            <div data-value="${metascore}" data-movie="metascore" class="critic criteria">
            <span>Metascore : </span>
            <span class="text-yellow-500 flex flex-row items-center gap-1">
               <span>${movie.Metascore}</span>
               <svg class="fill-yellow-500 w-3 inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                <path d="M160 0C177.7 0 192 14.33 192 32V67.68C193.6 67.89 195.1 68.12 196.7 68.35C207.3 69.93 238.9 75.02 251.9 78.31C268.1 82.65 279.4 100.1 275 117.2C270.7 134.3 253.3 144.7 236.1 140.4C226.8 137.1 198.5 133.3 187.3 131.7C155.2 126.9 127.7 129.3 108.8 136.5C90.52 143.5 82.93 153.4 80.92 164.5C78.98 175.2 80.45 181.3 82.21 185.1C84.1 189.1 87.79 193.6 95.14 198.5C111.4 209.2 136.2 216.4 168.4 225.1L171.2 225.9C199.6 233.6 234.4 243.1 260.2 260.2C274.3 269.6 287.6 282.3 295.8 299.9C304.1 317.7 305.9 337.7 302.1 358.1C295.1 397 268.1 422.4 236.4 435.6C222.8 441.2 207.8 444.8 192 446.6V480C192 497.7 177.7 512 160 512C142.3 512 128 497.7 128 480V445.1C127.6 445.1 127.1 444.1 126.7 444.9L126.5 444.9C102.2 441.1 62.07 430.6 35 418.6C18.85 411.4 11.58 392.5 18.76 376.3C25.94 360.2 44.85 352.9 60.1 360.1C81.9 369.4 116.3 378.5 136.2 381.6C168.2 386.4 194.5 383.6 212.3 376.4C229.2 369.5 236.9 359.5 239.1 347.5C241 336.8 239.6 330.7 237.8 326.9C235.9 322.9 232.2 318.4 224.9 313.5C208.6 302.8 183.8 295.6 151.6 286.9L148.8 286.1C120.4 278.4 85.58 268.9 59.76 251.8C45.65 242.4 32.43 229.7 24.22 212.1C15.89 194.3 14.08 174.3 17.95 153C25.03 114.1 53.05 89.29 85.96 76.73C98.98 71.76 113.1 68.49 128 66.73V32C128 14.33 142.3 0 160 0V0z"/>
                </svg>
            </span> 
            </div>
            <div data-value="${imdbrating}" data-movie="imdbrating" class="critic criteria">
            <span>Imdb Rating : </span>
            <span class="text-yellow-500 flex flex-row items-center gap-1">
                <span>${movie.imdbRating}</span>
                <svg class="fill-yellow-300 w-4 inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                    <path d="M381.2 150.3L524.9 171.5C536.8 173.2 546.8 181.6 550.6 193.1C554.4 204.7 551.3 217.3 542.7 225.9L438.5 328.1L463.1 474.7C465.1 486.7 460.2 498.9 450.2 506C440.3 513.1 427.2 514 416.5 508.3L288.1 439.8L159.8 508.3C149 514 135.9 513.1 126 506C116.1 498.9 111.1 486.7 113.2 474.7L137.8 328.1L33.58 225.9C24.97 217.3 21.91 204.7 25.69 193.1C29.46 181.6 39.43 173.2 51.42 171.5L195 150.3L259.4 17.97C264.7 6.954 275.9-.0391 288.1-.0391C300.4-.0391 311.6 6.954 316.9 17.97L381.2 150.3z"/>
                </svg>
                </span> 
            </div>
            <div data-value = "${imdbvotes}" data-movie="imdbvotes" class="critic criteria">
            <span>Imdb Votes : </span>
            <span class="text-yellow-500 flex flex-row items-center gap-1">
               <span>${movie.imdbVotes}</span>
               <svg class="fill-yellow-500 w-3 inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                <path d="M160 0C177.7 0 192 14.33 192 32V67.68C193.6 67.89 195.1 68.12 196.7 68.35C207.3 69.93 238.9 75.02 251.9 78.31C268.1 82.65 279.4 100.1 275 117.2C270.7 134.3 253.3 144.7 236.1 140.4C226.8 137.1 198.5 133.3 187.3 131.7C155.2 126.9 127.7 129.3 108.8 136.5C90.52 143.5 82.93 153.4 80.92 164.5C78.98 175.2 80.45 181.3 82.21 185.1C84.1 189.1 87.79 193.6 95.14 198.5C111.4 209.2 136.2 216.4 168.4 225.1L171.2 225.9C199.6 233.6 234.4 243.1 260.2 260.2C274.3 269.6 287.6 282.3 295.8 299.9C304.1 317.7 305.9 337.7 302.1 358.1C295.1 397 268.1 422.4 236.4 435.6C222.8 441.2 207.8 444.8 192 446.6V480C192 497.7 177.7 512 160 512C142.3 512 128 497.7 128 480V445.1C127.6 445.1 127.1 444.1 126.7 444.9L126.5 444.9C102.2 441.1 62.07 430.6 35 418.6C18.85 411.4 11.58 392.5 18.76 376.3C25.94 360.2 44.85 352.9 60.1 360.1C81.9 369.4 116.3 378.5 136.2 381.6C168.2 386.4 194.5 383.6 212.3 376.4C229.2 369.5 236.9 359.5 239.1 347.5C241 336.8 239.6 330.7 237.8 326.9C235.9 322.9 232.2 318.4 224.9 313.5C208.6 302.8 183.8 295.6 151.6 286.9L148.8 286.1C120.4 278.4 85.58 268.9 59.76 251.8C45.65 242.4 32.43 229.7 24.22 212.1C15.89 194.3 14.08 174.3 17.95 153C25.03 114.1 53.05 89.29 85.96 76.73C98.98 71.76 113.1 68.49 128 66.73V32C128 14.33 142.3 0 160 0V0z"/>
                </svg>
            </span> 
            </div>
        </div>
        `;
                    
       }
       

});
