const searchField = document.querySelector('#search-field')
const mainContainer =document.querySelector('#main-container')
const searchBtn = document.querySelector('#search-btn')
const cardRemoveBtn = document.querySelector('#card-remove-btn')
const cardAddBtn = document.querySelector('#card-add-btn')
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
      .then(data => console.log(data))
    })
  )
  // console.log([btnArray])
}

function getSearchHTML(data) {
  const searcHTML = data.map(
    singleMovie =>  {
      return ` <section class="search-card">
      <div>
        <div class="search-card-poster"><img src="${singleMovie.Poster}" alt="Algo asi"></div>
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
