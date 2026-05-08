let user={
    name:"John",
    surname:"Smith",
    set full_name(value){
        [this.name, this.surname]=value.split(" ");
    },
    get full_name(){
        return`${this.name} ${this.surname}`;
    }
}
let admin={
    __proto__:user,
    is_admin:true,
}

//console.log(admin.full_name)

admin.full_name="Alice Cooper";

console.log(admin.full_name);
console.log(user.full_name)