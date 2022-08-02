
const watchlistContainer = document.querySelector('#watchlist-container')

function loadWatchlisFromStorage() {
  const watchlist = window.localStorage.getItem('myWatchlist')
  console.log(JSON.parse(watchlist))
}
loadWatchlisFromStorage()