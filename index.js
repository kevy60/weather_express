const express = require('express')
const app = express()
const path = require('path')
const fetch= require('node-fetch')
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))





const getWeatherDataPromise = (url) => {
	return new Promise((resolve, reject) => {
		fetch(url)
		.then(responce => {
			return responce.json()
		})
		.then(data => {
			let description = data.weather[0].description
			let city = data.name
			let temp = Math.round(parseFloat(data.main.temp))
			let result = {
				description: description,
				city : city,
				temp: temp
			}
			resolve(result)
		})
		.catch(error => {
			reject(error)
		})
	})
}


app.all('/', function (req, res) {
	let city
	if(req.method == 'GET'){
		city = 'Tartu'
	}
	if(req.method == 'POST'){
		city = req.body.cityname
	}
	let url = 'https://api.openweathermap.org/data/2.5/weather?q=Tartu&appid=8bda5516ecfbb26eeebdc1bdebd15076'
    getWeatherDataPromise(url)
    .then(data => {
    	res.render('index', data)
    })
})





app.listen(3002)