
const watchlistContainer = document.querySelector('#watchlist-container')
let watchList = []

function getHTML(watchList) {
  const html = watchList.map(movie => {
    return `
    <section class="card-watchlist-page">
    <div class="card-poster"><img src="${movie.Poster}" alt="Movie Poster"></div>
    <div class="card-meta">
      <div class="card-title">
        <h2>${movie.Title}</h2>
        <p>⭐️ <span>${movie.imdbRating}</span></p>
      </div>
      <div class="card-details">
        <p>${movie.Runtime}</p>
        <p>${movie.Genre}</p>
        <button id="card-remove-btn" data-movie-title="${movie.Title}" class="card-btn"><span class="red">-</span> Remove</button>
      </div>
      <div class="card-synopsis">
        <p>${movie.Plot}</p>
      </div>
    </div>
  </section>
    <hr>
    `
  }).join('')
  watchlistContainer.innerHTML = html
  removeBtnEventListener()
}

function removeBtnEventListener() {
  const btnColection = document.querySelectorAll('#card-remove-btn')
  const btnArray = [...btnColection]
  btnArray.map( btn => {
    btn.addEventListener('click', () => {
        const btnData = btn.getAttribute('data-movie-title')
        const indice = watchList.findIndex( movie => movie.Title === btnData)
        watchList.splice(indice, 1)
        window.localStorage.setItem('myWatchlist', JSON.stringify(watchList))
      loadWatchlisFromStorage()
    })
  })
}

function loadWatchlisFromStorage() {
  const fromLocal = window.localStorage.getItem('myWatchlist')
  watchList = JSON.parse(fromLocal)
  getHTML(watchList)
}
loadWatchlisFromStorage()