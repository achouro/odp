function Hero(name, level){
    this.name=name;
    this.level=level;
}

let bjorne= new Hero("Bjorn", 1)

Hero.prototype.greet= function(){
    return `${this.name} speaking! How is it going?`;
}
//console.log(bjorn.greet())
//console.log(Object.getPrototypeOf(bjorn));
//console.log(Hero.prototype)

function Warrior(name, level, weapon){

    Hero.call(this, name, level);
    this.weapon=weapon;

}
Object.setPrototypeOf(Warrior.prototype, Hero.prototype);

Warrior.prototype.attack=function(){
    return`Attack! ${this.name} attacks with an ${this.weapon}.`
}

function Healer(name, level, tool){
    Hero.call(this, name, level);
    this.tool=tool;
    
}
Object.setPrototypeOf(Healer.prototype, Hero.prototype);

Healer.prototype.heal= function(){
    return `Peaceand healing! ${this.name} heals with ${this.tool}.`
}

const bjorn= new Warrior("Bjorn", 1, "axe")
const kanin= new Healer("Kanin", 1, "cure")


//console.log(bjorn)
//console.log(bjorn.attack())

//console.log(kanin.greet())

for(prop in bjorn){
    let is_own=bjorn.hasOwnProperty(prop);
    if(is_own){
       console.log("Own:",prop) 
    }
    else{
        console.log("Inherited:",prop)
    }
    
}
    