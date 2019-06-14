import '../scss/styles.scss';
let url = 'https://rickandmortyapi.com/api/character';
let urlNext = null;
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

function ImportData(url) {
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // console.log(data);
            urlNext = data.info.next;
            if (urlNext) {
                ImportData(urlNext)
                console.log(urlNext);

            }
            cards(data.results);
        });
};

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
        htmlObject.classList.add('col-3');

        document.getElementById('content-card').appendChild(htmlObject);
        let id = element.id;
        document.getElementById(`tarjeta${id}`).onclick = function () {
            localStorage.setItem('id', id);
        };

    });

}



function character() {
    let url = 'https://rickandmortyapi.com/api/character/' + localStorage.id;
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            card(data);
        });
    console.log('id', localStorage.id);

}

function card(data) {
    let carta = `
            <div class="row">
            <div class="col-md-4">
            <img src="${data.image}" class="card-img" alt="...">
            </div>
            <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title">${data.name}</h5>
                <p class="card-text">Estado: ${data.status}</p>
                <p class="card-text">Especie: ${data.species}</p>
                <p class="card-text">Tipo: ${data.type}</p>
                <p class="card-text">Genero: ${data.gender}</p>
                <p class="card-text">Origen: ${data.origin.name}</p>
                <p class="card-text">Ubicacion: ${data.location.name}</p>
                <p class="card-text">: ${data.origin.name}</p>
                <div class="text-center" id="episodes">
                </div>
                <p class="card-text"><small class="text-muted">Creado: ${data.created}</small></p>
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
        <a class="card-text" id="${Eid}" href="episode.html">Episode: ${Eid}</a><span> / </span>
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

function episode() {
    console.log('EID', localStorage.Eid);
    let url = 'https://rickandmortyapi.com/api/character/' + localStorage.Eid;
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            card(data);
        });
        });
    console.log('id', localStorage.Eid);


}