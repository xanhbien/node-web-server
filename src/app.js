const path = require('path')
const hbs  = require('hbs')
const express = require('express')
const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const rootDirectory = path.join(__dirname, '../public')
const viewDirectory = path.join(__dirname, '../templates/views')
const partialsPath  = path.join(__dirname, '../templates/partials')

hbs.registerPartials(partialsPath)
app.use(express.static(rootDirectory))


app.set('views', viewDirectory)
app.set('view engine', 'hbs')

app.get('', (req, res) => {
    res.render('index', {
        title: 'home page',
        content: 'this is home page',
        info: 'Footer home page'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'help page',
        content: 'this is help page',
        info: 'Footer hel[] page'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about page',
        content: 'this is about page',
        info: 'Footer about page'
    })
})



app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: "Please input your address"
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, placeName} = {} ) => {
        if(error){
            return res.send({
                error
            })
        }
        forecast(latitude, longitude, (error, response) => {
            if(error){
                return res.send({
                    error
                })
    
            }
            res.send([
                {
                  placeName  
                },
                {
                    response
                }
            ])
        })
    })

    
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 page',
        content: 'Help page not found!!, please try again!'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 page',
        content: 'Page not found!!, please try again!'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000 ')
})