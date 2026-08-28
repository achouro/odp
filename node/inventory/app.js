const express=require('express');
const path=require('path');

require('dotenv').config();

const item_router=require('./routes/item_router')
const category_router=require('./routes/category_router');

const app=express();

app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/items', item_router);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



app.get('/', (request, response)=>{
    response.redirect('/items');
})

app.use('/items', item_router);
app.use('/categories', category_router);

app.use((request, response)=>{
    response.status(404).render('404', { title: '404 Not Found', message: 'Page not found.' });
})

const PORT= process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`Server listening on http://localhost:${PORT}`)
})
