console.log("hola mundo!");
const noCambia = "Leonidas";

let cambia = "@LeonidasEsteban";

function cambiarNombre(nuevoNombre) {
  cambia = nuevoNombre;
}

/* Promesas */

const getUser = new Promise(function (okok, malmal) {
  setTimeout(function () {
    okok("Se acabó el tiempo 😮");
  }, 5000);
});
const getUserAll = new Promise(function (okok, malmal) {
  setTimeout(function () {
    okok("Se acabó el tiempo 😮 🥇");
  }, 3000);
});

getUser
  .then(function () {
    console.log("😀");
  })
  .catch(function (message) {
    console.log(message);
  });

Promise.race([getUser, getUserAll])
  .then(function (message) {
    console.log(message);
  })
  .catch(function (message) {
    console.log(message);
  });

fetch("https://randomuser.me/api/")
  .then(function (response) {
    /*     console.log(response);
     */
    return response.json();
  })
  .then(function (user) {
    console.log("user es", user.results[0].name.first);
  })
  .catch(function () {
    console.log("Algo salió mal ⏰");
  });

async function load() {
  // await
  // action
  // drama
  // animation
  async function getData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data; //Me devuelve un objeto
    //debugger
  }

  //BUSCAR PELICULA ///
  const $form = document.getElementById("form")
  const $home = document.getElementById("home")
  const $featuringContainer = document.getElementById("featuring")
  function setAttribute($element, attributes) {
    for (const attribute in attributes) {
      $element.setAttribute(attribute, attributes[attribute])

    }
  }
  const BASE_API = "https://yts.mx/api/v2/"
  function featuringTemplate(peli) {
    return (` <div class="featuring">
        <div class="featuring-image">
          <img src="${peli.medium_cover_image}" width="70" height="100" alt="">
        </div>
        <div class="featuring-content">
          <p class="featuring-title">Pelicula encontrada</p>
          <p class="featuring-album">${peli.title}</p>
        </div>
      </div>`)
  }


  $form.addEventListener("submit", async (event) => {
    event.preventDefault()
    $home.classList.add("search-active")
    const $loader = document.createElement("img")
    setAttribute($loader, {
      src: "src/images/loader.gif",
      height: 50,
      width: 50,
    })

    $featuringContainer.append($loader)
    const data = new FormData($form)
    const {
      data: {
        movies: pelis
      }
    } = await getData(`${BASE_API}list_movies.json?limit=2&query_term=${data.get("name")}`)

    const HTMLString = featuringTemplate(pelis[0]);
    $featuringContainer.innerHTML = HTMLString;


  })



  ///LISTAS///

  /*   const actionList = await getData(
      `${BASE_API}list_movies.json?genre=action`
    ); */  //LISTAS EN PRIMERA INSTANCIA 
  //debugger

  const { data: { movies: actionList } } = await getData(
    `${BASE_API}list_movies.json?genre=action`
  );
  const { data: { movies: dramaList } } = await getData(
    `${BASE_API}list_movies.json?genre=drama`
  );
  const { data: { movies: animationList } } = await getData(
    `${BASE_API}list_movies.json?genre=animation`
  );
  //console.log(actionList, dramaList, animationList);

  function createTemplate(HTMLString) {
    const html = document.implementation.createHTMLDocument()
    html.body.innerHTML = HTMLString;
    return html.body.children[0]
  }

  function addClick($element) {
    $element.addEventListener("click", () => {
      showModal($element)
    })
  }


  function renderMovies(list, $containers, category) {

    $containers.children[0].remove();
    list.forEach((movie) => {

      const HTMLstring = videoItemTemplate(movie, category)
      const movieElement = createTemplate(HTMLstring)
      $containers.append(movieElement)
      addClick(movieElement)


    })
    //$containers.innerHTML += HTMLstring
  }


  ///CONTAINERS////
  const $actionContainer = document.querySelector("#action")
  renderMovies(actionList, $actionContainer, "action")

  const $dramaContainer = document.getElementById("drama")
  renderMovies(dramaList, $dramaContainer, "drama")

  const $animationContainer = document.getElementById("animation")
  renderMovies(animationList, $animationContainer, "animation")

  function videoItemTemplate(movie, category) {
    return `<div class="primaryPlaylistItem"  data-id="${movie.id}" data-category="${category}" >
        <div class="primaryPlaylistItem-image">
   
          <img src="${movie.medium_cover_image}">
        </div>
        <h4 class="primaryPlaylistItem-title" style="color:red">
          ${movie.title} 
        </h4>
     
      </div>`
  }





  const $modal = document.getElementById("modal")
  const $overlay = document.getElementById("overlay")
  const $hideModal = document.getElementById("hide-modal")

  const $modalTitle = $modal.querySelector('h1');
  const $modalImage = $modal.querySelector('img');
  const $modalDescription = $modal.querySelector('p')
    ;
  //console.log($modal, $actionContainer, $dramaContainer, $animationContainer)



  function findById(list, id) {
    //debugger
    return list.find(movie => movie.id === parseInt(id, 10))
  }


  function findMovie(id, category) {
    switch (category) {
      case 'action': {
        return findById(actionList, id)
      }
      case 'drama': {
        return findById(dramaList, id)
      }
      default: {
        return findById(animationList, id)
      }
    }
  }

  function showModal($element) {
    $overlay.classList.add('active');
    $modal.style.animation = 'modalIn .8s forwards';
    //debugger
    const id = $element.dataset.id;
    const category = $element.dataset.category;
    const data = findMovie(id, category);

    $modalTitle.textContent = data.title;
    $modalImage.setAttribute('src', data.medium_cover_image);
    $modalDescription.textContent = data.description_full
  }


  $hideModal.addEventListener('click', hideModal);
  function hideModal() {
    $overlay.classList.remove('active');
    $modal.style.animation = 'modalOut .8s forwards';

  }
}




load()
