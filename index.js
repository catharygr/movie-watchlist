const searchField = document.querySelector('#search-field')
const mainContainer =document.querySelector('#main-container')
const searchBtn = document.querySelector('#search-btn')
const cardRemoveBtn = document.querySelector('#card-remove-btn')
const cardAddBtn = document.querySelector('#card-add-btn')
const modal = document.querySelector('#modal')
searchBtn.addEventListener('click', searchMovie)

async function fetchData(searchInput, type) {
  const res = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=b4ee78c6&${type}=${searchInput}`)
  const data = await res.json()
  return data
}

function addEventBtnDetails() {
  const allDetailsBtn = document.querySelectorAll('#card-details-btn')
  const btnArray = [...allDetailsBtn]
  btnArray.map(
    btn => btn.addEventListener('click', () => {
      fetchData(btn.dataset.title, 't')
      .then(data => {
        getDetailsHTML(data)
        modal.showModal()
        const closeModalBtn = document.querySelector('#close-modal-btn')
        closeModalBtn.addEventListener('click', () => modal.close())
      })
    })
  )
  
}

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



function getSearchHTML(data) {
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
    renderHTML(searcHTML)
    addEventBtnDetails()
  }
  
  function renderHTML(searcHTML) {
    mainContainer.innerHTML = searcHTML
  }

  
  function searchMovie() {
    const searchInput = searchField.value
    fetchData(searchInput, 's').then(
      data => {
        getSearchHTML(data.Search)
      }
      )
  
}

// http://www.omdbapi.com/?i=tt3896198&apikey=b4ee78c6
