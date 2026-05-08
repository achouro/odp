const my_library=[];

function Book(id,  title, author, pages, rating, read){
    this.id=id;
    //this.name=name;
    this.title=title;
    this.author=author;
    this.pages=pages;
    this.rating=rating;
    this.read=read;
}

//if book constructed thourgh book= new Book()

//
function add_book(book){

    my_library.push(book);
}

function mark_read(book){
    book.read=true;
}

function rate(book, ratin){
    book.rating= ratin;
}
//if constructing book directly
function add_to_library(title, author, pages, rating, read ){

    const already=my_library.some((book)=>book.title===title);

    if(already){return;}

    else{
        id=crypto.randomUUID();

        let book= new Book( id, title, author, pages, rating, read );

        my_library.push(book);
    }
}


function create_id(){
    crypt_id=crypto.randomUUID()
    this.id=crypt_id;
}


add_to_library("The Hobbit", "J.R.R. Tolkien", 295, 5, false)
add_to_library("Don Quixote", "Miguel Cervantes", 1072, 5, false)
add_to_library("To Kill a Mockingbird", "Harper Lee", 281, 4, false)




//Displaying the book on the card



function display_book(book){

    const cards=document.querySelectorAll(".card")

    let filled=false;

    cards.forEach((card) => {

        const title=card.querySelector(".input.title")
        
        if(title.innerHTML || filled){return;}
        //console.log(title)
        

        const author=card.querySelector(".input.author")
        const pages=card.querySelector(".input.pages")
        const rating=card.querySelector(".input.rating")
        const read=card.querySelector(".input.read")

        title.textContent=book.title;
        author.textContent=book.author;
        pages.textContent=book.pages;
        rating.textContent=book.rating;
        read.textContent=book.read;

        filled=true;

        
    });
}


for(let i=0; i<my_library.length; i++){
    
    
    display_book(my_library[i]);
    
}

let id1=crypto.randomUUID()

let book1= new Book(id1,"A Game of Thrones", "George R.R. Martin", 694, 5, false )

add_book(book1);

console.log(my_library)

display_book(book1);

function open_sidebar(){
    const sidebar=document.querySelector(".sidebar")
    sidebar.classList.toggle("open");
    const nav=document.querySelector(".nav");
    nav.classList.toggle("open");
    const content=document.querySelector(".content");
    content.classList.toggle("open");
    const button=document.querySelector(".nav button");
    button.classList.toggle("open");



}

function close_sidebar(){
    const sidebar=document.querySelector(".sidebar");
    sidebar.classList.toggle("closed");
    const nav=document.querySelector(".nav");
    nav.classList.toggle("closed");
    const content=document.querySelector(".content");
    content.classList.toggle("closed");
}

function add_from_form(){
    const form= document.querySelector("form")
    
    form.addEventListener("submit",(event)=>{
    
        event.preventDefault();
    
        const form_data= new FormData(event.target);
        const data= Object.fromEntries(form_data.entries());
        console.log(data)
        
        const id_add=crypto.randomUUID();
        const book_add=new Book(id_add, data.title, data.author, data.pages, data.rating, data.read)
    
        add_book(book_add);
    
        display_book(book_add)
    })
    
}

add_from_form()

function add_from_suggestion(){

    const suggestions=document.querySelectorAll(".suggestion")
    
    suggestions.forEach((suggestion)=>{
    
        suggestion.addEventListener("click", (event)=>{
    
            const title=suggestion.querySelector(".title").textContent;
            const author=suggestion.querySelector(".author").textContent;
            const pages=suggestion.querySelector(".pages").textContent;
            console.log(title,author, pages);
            
            add_to_library(title, author, pages, 5, false);
    
            console.log(my_library);
        
            display_book(my_library[my_library.length -1]) 
            
        })
    })
    
}

add_from_suggestion()


function remove_from_library(titel){

    book=my_library.filter((book)=> book.title===titel);
    
    index=my_library.indexOf(book);
    my_library.splice(index,1);
}

function delete_card(){
    const delete_buttons=document.querySelectorAll(".card .buttons .delete")

    delete_buttons.forEach((button)=>{

        button.addEventListener("click", (event)=>{

            const card=event.target.closest(".card");

            const title=card.querySelector(".input.title");
            const title_name=title.textContent;

            remove_from_library(title_name);

            console.log(my_library);
            
            const author=card.querySelector(".input.author");
            const pages=card.querySelector(".input.pages");
            const rating=card.querySelector(".input.rating");
            const read=card.querySelector(".input.read");

            title.textContent="";
            author.textContent="";
            pages.textContent="";
            rating.textContent="";
            read.textContent="";
        })
    })
}

delete_card()

function mark_as_read(){
    const read_buttons=document.querySelectorAll(".card .buttons .view")

    read_buttons.forEach((button)=>{
        button.addEventListener("click", (event)=>{

            const card=event.target.closest(".card");

            const read=card.querySelector(".input.read");

            if(read.textContent="false"){
                read.textContent="";
                read.textContent="true";}

        })
    })
        
}
mark_as_read()






function arrange_cards(){
    const cards=document.querySelectorAll(".card")

    cards.forEach((card)=>{
        const title=card.querySelector(".input.title").textContent;
        
        if(title){return;}

        
        const next_card=card.nextSibling();
        const next_title=next_card.querySelector(".input.title").textContent;

        while(next_card){
            if(!next_title){
                next_card=next_card.nextSibling() ; return;}
            
            card.childNodes=next_card.childNodes;
            next_card.childNodes="";
            next_card=next_card.nextSibling();

            }

    })
        

}

arrange_cards()


    
    










