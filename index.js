const searchField = document.querySelector('#search-field')
const mainContainer =document.querySelector('#main-container')
const searchBtn = document.querySelector('#search-btn')
const cardRemoveBtn = document.querySelector('#card-remove-btn')
const modal = document.querySelector('#modal')
let watchlistArray = []

// Ver si hay data en localStorage y si es asi, cargar nuestro array con su contendido
const loadLocalStorage = JSON.parse(localStorage.getItem('myWatchlist'))
loadLocalStorage ? watchlistArray = loadLocalStorage : loadLocalStorage

// Esta función es para obtener el término de busqueda con eventlistener en el boton search
searchBtn.addEventListener('click', searchMovie)
function searchMovie() {
  const searchInput = searchField.value
  //Se llama la función fetchData para obtener resultado pasándole como argumnetos .value y tipo de busqueda 
  fetchData(searchInput, 's').then(
    data => {
      getSearchHTML(data.Search) // Pasar data de vuelta  a función de generar html
    }
  )
}

// Función que obtiene datos desde API utilizando fetch
async function fetchData(searchInput, type) {
  // Bloque try/catch
  try {
    const res = await fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=b4ee78c6&${type}=${searchInput}`)
    const data = await res.json()
    // Condicional que capta errores de busquedas devueltos por API
    if(data.Response === 'False') {
     mainContainer.innerHTML = `<p>${data.Error}</p>`
    } else {
      return data
    }
  } catch (err) { // Bloque catch para captar errores código 200
    mainContainer.innerHTML = `<p>Sorry looks like we have a following problem: ${err}</p>`
  }
}

// Función para generar código html para render data de la busqueda 
function getSearchHTML(data) {
  // Hacemos .map que devuelve el código de html en un array y con .join lo unimos en un string
  const searcHTML = data.map(
    singleMovie =>  {
      return ` <section class="search-card">
      <div>
        <div class="search-card-poster"><img src="${singleMovie.Poster}" alt="Movie Poster"></div>
      </div>
      <div class="search-card-meta">
        <button data-title="${singleMovie.Title}" class="search-card-btn" id="card-details-btn">Get details...</button>
        <h2>${singleMovie.Title}</h2>
        <p><span>${singleMovie.Type}</span> <span>${singleMovie.Year}</span></p>
      </div>
      </section>`
    }
    ).join('')
    // Llamamos función para render html en el navegador y le pasamos html como argumento 
    renderHTML(searcHTML)
    // Después de generar los botones llamamos esra funcion para añadir evenlistener(+ watchlist)
    addEventBtnDetails()
  }

  // Para render html en el navegador 
  function renderHTML(searcHTML) {
    mainContainer.innerHTML = searcHTML
  }


// Función que añade evenlistener a todos los botones (+ watchlist)
function addEventBtnDetails() {
  // Nos amarramos a los botones y html coleccion la convertimos en un array con un spreed operator
  const allDetailsBtn = document.querySelectorAll('#card-details-btn')
  const btnArray = [...allDetailsBtn]
// Hacemos un .map al array
  btnArray.map(
    btn => btn.addEventListener('click', () => {
      // FethData de servidor via titulo de la peli y el tipo de la busqueda como argumentos
      fetchData(btn.dataset.title, 't')
      .then(data => {
        // Llamamos la función que genera Html de la vista detallada
        getDetailsHTML(data)
        // Hacemos un modal y presentamos la vista detallada
        modal.showModal()
        const closeModalBtn = document.querySelector('#close-modal-btn')
        // Boton de cerrar el modal
        closeModalBtn.addEventListener('click', () => modal.close())
        // Boton de anadir la peli a wachtlist
        const cardAddBtn = document.querySelector('#card-add-btn')
        // Funcionalidad del mismo boton donde se empuja la peli en un array y luego se guarda en localStorage
        cardAddBtn.addEventListener('click', () => {
          watchlistArray.push(data)
          window.localStorage.setItem('myWatchlist', JSON.stringify(watchlistArray))
        })
      })
    })
  ) 
}

// Es para render en el navegador 
function getDetailsHTML(data) {
  modal.innerHTML = `
  <section class="card">
    <div class="card-poster"><img src="${data.Poster}" alt="Movie Poster"></div>
    <div class="card-meta">
      <div class="card-title">
        <h2>${data.Title}</h2>
        <p>⭐️ <span>${data.imdbRating}</span></p>
      </div>
      <div class="card-details">
        <p>${data.Runtime}</p>
        <p>${data.Genre}</p>
        <button id="card-add-btn"  class="card-btn"><span>+</span> Watchlist</button>
      </div>
      <div class="card-synopsis">
        <p>${data.Plot}</p>
      </div>
    </div>
    <button  id="close-modal-btn"  class="close-modal-btn">Close</button>
  </section>  
  `
}




  
 

  



