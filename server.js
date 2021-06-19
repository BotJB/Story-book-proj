const express=require('express')
const dotenv=require('dotenv')
const connectDB=require('./config/db')
const morgan=require('morgan')
const routes=require('./routes/index')
const exphbs=require('express-handlebars')

// Load the config file
dotenv.config({path:'./config/config.env'});
// Connecting to the database
connectDB()
const app=express();
if(process.env.NODE_ENV==='development'){
    app.use(morgan('dev'))
}
//Setting up the handlebars
app.engine('.hbs', exphbs({extname: '.hbs',defaultLayout:'main'}));
app.set('view engine', '.hbs');
//Basic Routes 
app.use('/',routes)
const PORT=process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log(`Server is up and running on ${PORT}`)
})