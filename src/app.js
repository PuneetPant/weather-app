const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('../src/utils/geocode');
const forecast = require('../src/utils/forecast');
const app = express();

// Define paths for Express config
const directoryPath = path.join(__dirname, '../template/views');
console.log(directoryPath);
 
const publicDirectoryPath = path.join(__dirname , '../public');
app.use(express.static(publicDirectoryPath))

const partialsPath = path.join(__dirname , '../template/partials');
console.log("partialsPath: ",partialsPath);
hbs.registerPartials(partialsPath);

// Setup handlebars engine and views locatuon
app.set('views',directoryPath);
app.set('view engine','hbs');

// Setting up of routes
app.get('/',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Puneet Pant'
    });
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Page',
        name:'Puneet Pant'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name:'Puneet Pant'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error:'You must provide an address'
        })
    }
    console.log(req.query.address);
    geocode(req.query.address,(error , data={})=>{
        console.log('data: ',data);
        if(error){
            return res.send({
                error:error
            })
        }
        console.log('data: ',data);
        console.log('data.latitude: ',data.latitude);
        forecast(data.latitude , data.longitude , (error , forecastData)=>{
            if(error){
                return res.send({
                    error:error
                })
            }
            res.send({
                forecastData:forecastData,
                location : data.location,
                address:req.query.address
            })
        })
    });
})
app.get('/products',(req,res)=>{
    // Now to access the query string
    if(!req.query.search){
        return res.send({
            error:'search parameter not provided'
        })
    }
    console.log(req.query);
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404 Page',
        name:'Puneet Pant',
        errorMessage:'Help article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Puneet Pant',
        errorMessage:'Not Found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})