
const express =require("express")
const app=express();
const PORT=3000;

app.set("view engine", "ejs")

app.use(express.urlencoded({extended:true}))
app.use(express.static('public'));

const messages=require('./messages.js')

app.get('/',(request, response)=>{

    const data={title: "Mini Message Board", 
                messages:messages}

    response.render("index", data)
})


app.get('/new',(request, response)=>{

    response.render("new", {title: "New Message Form"})
})

app.post('/new',(request, response)=>{

    const {message_user, message_text}=request.body;

    messages.push({
        text:message_text,
        user:message_user,
        date: new Date()
    })

    response.redirect('/')

})


app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
})