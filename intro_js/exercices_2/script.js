///ex1 map to name
let john = { name: "John", age: 25 };
let pete = { name: "Pete", age: 30 };
let mary = { name: "Mary", age: 28 };

let users = [ john, pete, mary ];
//console.log(users)
let names= users.map( (item)=>item.name );

//console.log(names)



///ex2 map to object
john = { name: "John", surname: "Smith", id: 1 };
pete = { name: "Pete", surname: "Hunt", id: 2 };
mary = { name: "Mary", surname: "Key", id: 3 };

users = [ john, pete, mary ];
//console.log(users.length)

users_mapped=users.map((user)=>({
    full_name: `${user.name} ${user.surname}`,
    id: user.id,
}));
    
//console.log(users_mapped)


///ex3 sort by age
john = { name: "John", age: 25 };
pete = { name: "Pete", age: 30 };
mary = { name: "Mary", age: 28 };

users = [ john, pete, mary ];

function sort_by_age(input){
    input.sort((a,b)=>(a.age-b.age))
    
}
sorted=users.sort((a,b)=> a.age -b.age)
//console.log(sorted)

///ex4 average age

function avg_age(input){
    input.reduce((acc, a)=> acc += a.age, 0 )/input.length; 

}
avg=users.reduce((total,user)=> total+= user.age, 0)/users.length;
//console.log(Math.round(avg, 3))

///ex5 keyed object from array

 let usors = [
  {id: 'john', name: "John Smith", age: 20},
  {id: 'ann', name: "Ann Smith", age: 24},
  {id: 'pete', name: "Pete Peterson", age: 31},
];

function group_by_id(input){
    new_one={}
    for( user in input.length) {
        name=user.id;
        new_one.name=name;
        new_one.info=user;
    }     
}

users_by_id=group_by_id(usors)
function group_by_id(input){
    return input.reduce((grouped,user)=>{
    grouped[user.id]= user;
    return grouped;
}, {}) }
console.log(users_by_id)

