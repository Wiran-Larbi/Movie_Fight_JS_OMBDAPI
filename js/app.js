

const searchWrapperOne = document.querySelector('[data-wrapper="search-wrapper-1"]');
const selectWrapperOne = document.querySelector('[data-wrapper="search-wrapper-1"]');
const searchWrapperTwo = document.querySelector('[data-wrapper="search-wrapper-2"]');
const selectWrapperTwo = document.querySelector('[data-wrapper="search-wrapper-2"]');
const MenuContainer = document.querySelector(".player-container");

//? Debounce Function helper
const debounce = (func, delay=1000) => {
      let TimeID;
     return (...args) => {
      if(TimeID)
      clearTimeout(TimeID)
      TimeID = setTimeout(()=> {
          func.apply(null,args);
      },delay) 
     }
}

//? Fetching Data From Omdbapi
const Moviefetch = async (movieSearch) => {
          const response = await axios.get("http://www.omdbapi.com/",{
            params: {
                      apikey: 'a7239057',
                      s: movieSearch
            }
          }); 
          
          if(response.data.Error) return [];
          return response.data.Search;
}

//! Handeling Selecting a Movie
const onMovieSelect = async movieID => {
  const response = await axios.get("http://www.omdbapi.com/",{
   params: {
             apikey: 'a7239057',
             i: movieID
   }
 }); 
      
  if(response.data.Error) return [];
  return response.data;

}





// <div data-search="result" class="search-result">
// <img src="/images/movies_img/Action Movie Poster.svg" alt="poster" class="w-16">
// <h3 class="movie-title">The Dark Knight (2012)</h3>
// <span class="movie-type">Movie</span>
// </div>