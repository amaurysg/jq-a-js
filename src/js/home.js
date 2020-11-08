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

  const actionList = await getData(
    "https://yts.mx/api/v2/list_movies.json?genre=action"
  );
  //debugger
  const dramaList = await getData(
    "https://yts.mx/api/v2/list_movies.json?genre=drama"
  );
  const animationList = await getData(
    "https://yts.mx/api/v2/list_movies.json?genre=animation"
  );
  console.log(actionList, dramaList, animationList);


  const $actionContainer = document.querySelector("#action")
  const $dramaContainer = document.getElementById("drama")
  const $animationContainer = document.getElementById("animation")


  function videoItemTemplate(movie) {
    return `<div class="primaryPlaylistItem">
        <div class="primaryPlaylistItem-image">
          <img src="${movie.medium_cover_image}">
        </div>
        <h4 class="primaryPlaylistItem-title" style="color:red">
          ${movie.title}
        </h4>
        <h5> Rating Imdb ${movie.rating} </h5>
      </div>`
  }


  function addClick($element) {
    $element.addEventListener("click", function () {
      alert("Hola ")
    })
  }



  function renderMovies(list, $containers) {
    $containers.children[0].remove(); //Borrar primer elemento
    list.data.movies.forEach((movie) => {
      //debugger
      const HTMLstring = videoItemTemplate(movie)
      // $containers.innerHTML += HTMLstring

      //
      const html = document.implementation.createHTMLDocument()
      html.body.innerHTML = HTMLstring
      //debugger
      $containers.append(html.body.children[0])
      addClick(movie)
      //console.log(HTMLstring)
    })
  }
  renderMovies(actionList, $actionContainer)
  renderMovies(dramaList, $dramaContainer)
  renderMovies(animationList, $animationContainer)

  const $featuringContainer = document.getElementById("featuring")
  const $form = document.getElementById("form")
  const $home = document.getElementById("home")



  const $modal = document.getElementById("modal")
  const $overlay = document.getElementById("overlay")
  const $hideModal = document.getElementById("hide-modal")

  const $modalImg = $modal.querySelector("img")
  const $modalTitle = $modal.querySelector("h1")
  const $modalDescription = $modal.querySelector("p")

  //console.log($modal, $actionContainer, $dramaContainer, $animationContainer)


  var title = "Amaury"
  var src = "Hola"

  //console.log("videoTemplate", videoItemTemplate(src, title))

}
load()
