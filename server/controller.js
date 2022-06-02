const figure = require('./db.json')
let globalId = 3

module.exports = {
    getCompliment: (req, res) => {
        const compliments = ["Gee, you're a smart cookie!", "Cool shirt!", "Your Javascript skills are stellar."];
      
        // choose random compliment
        let randomIndex = Math.floor(Math.random() * compliments.length);
        let randomCompliment = compliments[randomIndex];
      
        res.status(200).send(randomCompliment);
    },
    getFortuneCookie: (req, res) => {
        const fortunes = ["A faithful friend is a strong defense.", "A fresh start will put you on your way.", 
        "A friend is a present you give yourself.", "A lifetime friend shall soon be made.", "A friend is a present you give yourself."];
        
        let fortuneIndex = Math.floor(Math.random() * fortunes.length);
        let randomFortune = fortunes[fortuneIndex]

        res.status(200).send(randomFortune);
    },
    getFigures: (req, res) => res.status(200).send(figure),
    deleteFigure: (req, res) => {
        let index = figure.findIndex(elem => elem.id === +req.params.id)
        figure.splice(index, 1)
        res.status(200).send(figure)
    },
    createFigure: (req, res) => {
        let { rating, imageURL } = req.body
        let newFigure = {
            id: globalId,
            figure: req.body.figure, 
            rating,
            imageURL
        }
        figure.push(newFigure)
        res.status(200).send(figure)
        globalId++
    },
    updateFigure: (req, res) => {
        let { id } = req.params
        let { type } = req.body
        let index = figure.findIndex(elem => +elem.id === +id)
console.log(id);
console.log(type);
console.log(index);

        if (figure[index].rating === 5 && type === 'plus') {
            res.status(400).send('cannot go above 5')
        } else if (figure[index].rating === 0 && type === 'minus') {
            res.status(400).send('cannot go below 0')
        } else if (type === 'plus') {
            figure[index].rating++
            res.status(200).send(figure)
        } else if (type === 'minus') {
            figure[index].rating--
            res.status(200).send(figure)
        } else {
            res.sendStatus(400)
        }
    }
}