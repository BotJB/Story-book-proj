const express=require('express')
const path=require('path')
const dotenv=require('dotenv')
const connectDB=require('./config/db')
const morgan=require('morgan')
const routes=require('./routes/index')
const exphbs=require('express-handlebars')
const googleAuth=require('./config/passport')
const passport=require('passport')
const authRoutes=require('./routes/auth')
const session=require('express-session')
const mongoose=require('mongoose')
const MongoStore=require('connect-mongo')
const stroyRoutes=require('./routes/storyRoutes')

// Load the config file
dotenv.config({path:'./config/config.env'});
// Connecting to the database
connectDB()
//Calling the passport method
googleAuth(passport)
//setting the app
const app=express();
//adding the body parser for the forms
app.use(express.urlencoded({extended:false}))
app.use(express.json())
if(process.env.NODE_ENV==='development'){
    app.use(morgan('dev'))
}
//Setting up the handlebars
app.engine('.hbs', exphbs({extname: '.hbs',defaultLayout:'main'}));
app.set('view engine', '.hbs');
//static folder
app.use(express.static(path.join(__dirname,'public')))
//Setting up the session with express session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store:MongoStore.create({
        mongoUrl:process.env.MONGO_URI
    })
    
  }))
//Passport Config the rest here
app.use(passport.initialize())
app.use(passport.session())
//Basic Routes 
app.use('/',routes)
//authRoutes
app.use('/auth',authRoutes)
//Story routes 
app.use('/stories',stroyRoutes)
const PORT=process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log(`Server is up and running on ${PORT}`)
})