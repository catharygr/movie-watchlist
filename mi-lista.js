
const watchlistContainer = document.querySelector('#watchlist-container')
let watchList = []

// En esta funcion cargamos watchlist desde localstorage (si hay)
function loadWatchlisFromStorage() {
  const fromLocal = window.localStorage.getItem('myWatchlist')
  watchList = JSON.parse(fromLocal)
  // Llamamos la funcion que genera html pasando watchlist como argumento
  getHTML(watchList)
}

//Esta funcion sirve para generar html con el contenido de watchlist
function getHTML(watchList) {
  // Hacemos un .map sobre watchlist
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
  // Escribimos render Html en el navegador
  watchlistContainer.innerHTML = html
  // Despues de crear los botones de remove  from watclist les añadimos eventlistiner
  removeBtnEventListener()
}

//Añadir eventlist a los botones de remove
function removeBtnEventListener() {
  //Creamos una html coleecion
  const btnColection = document.querySelectorAll('#card-remove-btn')
  // La expandimos en un Array con spreed operator
  const btnArray = [...btnColection]
  btnArray.map( btn => {
    btn.addEventListener('click', () => {
      //Usamos el atributo HTML data- para eliminar la peli desde watchlist y localstorage
        const btnData = btn.getAttribute('data-movie-title')
        //Encontramos el indice de nuestra peli seleccionada
        const indice = watchList.findIndex( movie => movie.Title === btnData)
        //Eliminado la peli usando .splice
        watchList.splice(indice, 1)
        //Guardamos la nueva watchlist de nuevo en localstorage
        window.localStorage.setItem('myWatchlist', JSON.stringify(watchList))
        //Cargamos la watchlist del localstorage de nuevo 
      loadWatchlisFromStorage()
    })
  })
}


loadWatchlisFromStorage()