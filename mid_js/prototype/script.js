function Book(title, author, pages, read){
    if(!new.target){throw Error("Mate! Use new!")}

    this.title=title;
    this.author=author;
    this.pages=pages;
    this.read=read;

    this.info=function(){
        console.log(`${this.title} written by ${this.author} has ${this.pages} pages.`);

        if(this.read){ return `Book read! Keep it up!`;}

        else { return `This book has not been read by the user.` ;}   
    };
}

Book.prototype.rating=function(){
    this.rating=rating;
}

const hobbit= new Book("The Hobbit", "J.R.R Tolkien", 295, true)

hobbit.rating=5;

console.log(hobbit.info())
console.log(`This books' rating is: ${hobbit.rating}`)

console.log(hobbit.valueOf())


