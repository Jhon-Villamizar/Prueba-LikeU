// imports and global variables
import '../scss/styles.scss';
let url = 'https://rickandmortyapi.com/api/character';
let urlNext = null;

// method document ready
document.addEventListener('DOMContentLoaded', function () {
    if (window.location.pathname == '/') {
        ImportData(url);
    }
    if (window.location.pathname == '/characters.html') {
        character();
    }
    if (window.location.pathname == '/episode.html') {
        episode();
    }
})

// method import data of characters
function ImportData(url) {
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            urlNext = data.info.next;
            if (urlNext) {
                ImportData(urlNext)
            }
            cards(data.results);
        });
};

// build cards of characters
function cards(data) {
    data.forEach(element => {
        let tarjeta = `
        <a id="tarjeta${element.id}" href=characters.html>
        <img src="${element.image}" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title text-center">${element.name}</h5>
        </div>
        </a>
        `;
        let htmlObject = document.createElement('a');
        htmlObject.innerHTML = tarjeta;
        htmlObject.classList.add('card');
        htmlObject.classList.add('col-xl-2');
        htmlObject.classList.add('col-lg-2');
        htmlObject.classList.add('col-md-3');
        htmlObject.classList.add('col-sm-4');
        htmlObject.classList.add('col-6');
        document.getElementById('content-card').appendChild(htmlObject);
        let id = element.id;
        document.getElementById(`tarjeta${id}`).onclick = function () {
            localStorage.setItem('id', id);
        };
    });
}

// method import data of character
function character() {
    let url = 'https://rickandmortyapi.com/api/character/' + localStorage.id;
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            card(data);
        });
}

// build card of character
function card(data) {
    let carta = `
                <div class="card">
                <div class="card-header">
                <h3>${data.name}</h3>
                </div>
                <div class="row no-gutters">
                    <div class="col-md-4">
                    <img src="${data.image}" class="card-img" alt="...">
                    </div>
                    <div class="card-body">
                    <h5 class="card-text"><b>Estado:</b> ${data.status}</h5>
                    <h5 class="card-text"><b>Especie:</b> ${data.species}</h5>
                    <h5 class="card-text"><b>Tipo:</b> ${data.type}</h5>
                    <h5 class="card-text"><b>Genero:</b> ${data.gender}</h5>
                    <h5 class="card-text"><b>Origen:</b> ${data.origin.name}</h5>
                    <h5 class="card-text"><b>Ubicacion:</b> ${data.location.name}</h5>
                    <h5 class="card-text"><b>Creado:</b> ${data.created.split('T')[data.created.split('T').length - 2]}</h5>
                    </div>
                </div>
                <div class="card-footer text-muted">
                <h5 class=""text-center><b>Episodios</b></h5>
                <div class="row text-center" id="episodes">
                </div>
                </div>
                </div>
          `;
    let htmlObject = document.createElement('div');
    htmlObject.innerHTML = carta;
    htmlObject.classList.add('no-gutters');
    document.getElementById('character-card').appendChild(htmlObject);
    data.episode.forEach(element => {
        var Eid = element.split('/')[element.split('/').length - 1];
        var personal = `
        <a class="card-text" id="${Eid}" href="episode.html">Episode: ${Eid}</a>
        `;
        let htmlObjectp = document.createElement('p');
        htmlObjectp.innerHTML = personal;
        htmlObjectp.classList.add(`${Eid}`);
        document.getElementById('episodes').appendChild(htmlObjectp);
        document.getElementById(`${Eid}`).onclick = function () {

            localStorage.setItem('Eid', Eid);
        };
    });

}

// method import data of episode
function episode() {
    console.log('EID', localStorage.Eid);
    let url = 'https://rickandmortyapi.com/api/episode/' + localStorage.Eid;
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            cardEpi(data);
        });
}

// build jumbotron of episode
function cardEpi(data) {
    let tarjeta = `
            <div class="jumbotron w-100">
            <h1 class="display-4">${data.name}</h1>
            <p class="lead">Episode: ${data.episode}</p>
            <p class="lead">Al Aire: ${data.air_date}</p>
            <hr class="my-4">
            <p>Creado: ${data.created.split('T')[data.created.split('T').length - 2]}</p>
            </div>
          `;
    let htmlObjectE = document.createElement('div');
    htmlObjectE.innerHTML = tarjeta;
    htmlObjectE.classList.add('text-center');
    htmlObjectE.classList.add('info-episode');

    document.getElementById('episode-card').appendChild(htmlObjectE);
}