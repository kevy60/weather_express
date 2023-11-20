const express = require('express')
const app = express()
const path = require('path')
const fetch= require('node-fetch')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))








app.get('/', function (req, res) {
	fetch('https://api.openweathermap.org/data/2.5/weather?q=Tallinn&appid=8bda5516ecfbb26eeebdc1bdebd15076')
	.then((responce) => {
		return responce.json()
	})
	.then((data) => {
		let description = data.weather[0].description
		let city = data.name
		let temp = Math.round(parseFloat(data.main.temp))
	    res.render('index', {
	    	description: description,
	    	city: city,
	    	temp: temp
	    })
	})
})


app.post('/', function(req, res){
	fetch('https://api.openweathermap.org/data/2.5/weather?q=Tallinn&appid=8bda5516ecfbb26eeebdc1bdebd15076')
	.then((responce) => {
		return responce.json()
	})
	.then((data) => {
		let description = data.weather[0].description
		let city = data.name
		let temp = Math.round(parseFloat(data.main.temp))
	    res.render('index', {
	    	description: description,
	    	city: city,
	    	temp: temp
	    })
	})
})




app.listen(3002)