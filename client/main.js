const figuresContainer = document.querySelector('#figures-container')
const form = document.querySelector('form')

const complimentBtn = document.getElementById("complimentButton")
const fortuneCookieBtn = document.getElementById("fortuneCookieButton")

const figuresCallback = ({ data }) => displayFigures(data)
const errCallback = err => console.log(err.response.data)

const getCompliment = () => {
    axios.get("http://localhost:4000/api/compliment")
        .then(res => {
            const data = res.data;
            alert(data);
    }); 
};
const getFortuneCookie = () => {
    axios.get("http://localhost:4000/api/fortune/")
        .then(res => {
            const data = res.data;
            alert(data);
        });
};
complimentBtn.addEventListener('click', getCompliment)
fortuneCookieBtn.addEventListener('click', getFortuneCookie)

const getFigures = () => axios.get(`http://localhost:4000/api/figures`).then(figuresCallback).catch(errCallback)
const createFigure = body => axios.post(`http://localhost:4000/api/figures`, body).then(figuresCallback).catch(errCallback)
const deleteFigure = id => axios.delete(`http://localhost:4000/api/figures/:id`).then(figuresCallback).catch(errCallback)
const updateFigure = (id, type) => axios.put(`http://localhost:4000/api/figures/:id`, {type}).then(figuresCallback).catch(errCallback)

function submitHandler(e) {
    e.preventDefault()

    let figure = document.querySelector('#figure')
    let rating = document.querySelector('input[name="ratings"]:checked')
    let imageURL = document.querySelector('#img')

    let bodyObj = {
        figure: figure.value,
        rating: rating.value, 
        imageURL: imageURL.value
    }

    createFigure(bodyObj)

    figure.value = ''
    rating.checked = false
    imageURL.value = ''
}
function createFigureCard(figure) {
    const figureCard = document.createElement('div')
    figureCard.classList.add('figure-card')

    figureCard.innerHTML = `<img alt='figure cover' src=${figure.imageURL} class="figure-cover"/>
    <p class="figure-title">${figure.title}</p>
    <div class="btns-container">
        <button onclick="updateFigure(${figure.id}, 'minus')">-</button>
        <p class="figure-rating">${figure.rating} stars</p>
        <button onclick="updateFigure(${figure.id}, 'plus')">+</button>
    </div>
    <button onclick="deleteFigure(${figure.id})">delete</button>
    `


    figuresContainer.appendChild(figureCard)
}

function displayFigures(arr) {
    figuresContainer.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createFigureCard(arr[i])
    }
}

form.addEventListener('submit', submitHandler)

getFigures()
