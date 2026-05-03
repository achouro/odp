///github exercices 
///ex12 
const add = function(a,b) {
	return a+b;
};

const subtract = function(a,b) {
	return a-b;
};

const sum = function(list) {
	let a=0;
	for(let i=0; i<list.length; i++){ a+=list[i];}
	return a;
};

const multiply = function(list) {
	let a=1;
	for(let i=0; i<list.length; i++){ a*=list[i];}
	return a;
};

const power = function(a,b) {
	return a^b;
};

const factorial = function(a) {
	let b=1;
	while(a>0) {b*=a; a--;}
	return b;
};

//console.log(factorial(5))

//ex13 palyindromes

function is_palyndrome(str){
	if(str===reverse(str)){ return true;}
	else{ return false;}
}

function reverse(str){
	rev="";
	n=str.length;
	for(let i=0; i<n; i++){
		rev+=str.charAt(n-i-1);
	}
	return rev;
}
//console.log(is_palyndrome("libil"))

///

function fibonacci(n){
	let list=[0,1];
	for(let i=2; i<=n;i++){ list[i]= list[i-1]+ list[i-2]; }
	return list[n];
}
//console.log(fibonacci(7))

//ex14

const books = [
  {
    title: 'Book',
    author: 'Name'
  },
  {
    title: 'Book2',
    author: 'Name2'
  }
]

function get_titles(input){
	return input.map( (element) => element.title )
}

//console.log(get_titles(books))

//ex16 find oldest

    const people = [
      {
        name: "Carly",
        yearOfBirth: 1942,
        yearOfDeath: 1970,
      },
      {
        name: "Ray",
        yearOfBirth: 1962,
        yearOfDeath: 2011,
      },
      {
        name: "Jane",
        yearOfBirth: 1912,
        yearOfDeath: 1941,
      },
    ]

function find_oldest(input){
	
	now=2020;
	
	input.map((element)=> {
		if(element.yearOfDeath){element.age= element.yearOfDeath - element.yearOfBirth}
		else{element.age= now - element.yearOfBirth}
	})
	//console.log(input)

	input.sort( (a,b) => b.age -a.age )
	
	//age=age.sort((a,b)=>b-a)

	return input[0].name;
}

//console.log(find_oldest(people))


