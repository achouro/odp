
export default function menu_load(){

    const content=document.querySelector(".content");
    content.innerHTML="";

    const menu=document.createElement("div");
    menu.classList.add("menu")
    menu.style="display:flex; flex-direction:column; align-items:center; justify-content:center;"


    const title=document.createElement("h1");
    title.classList.add("title")
    title.textContent="Pick and Choose your formula!"
    title.style="color: white;"

    const subtitle=document.createElement("h3");
    subtitle.classList.add("subtitle")
    subtitle.textContent="Our variety of bases, toppings and meals is now yours!"
    subtitle.style="color: white;"

    const themenu=document.createElement("div");
    themenu.classList.add("themenu")
    themenu.innerHTML=`<div class="left">
                            <h4>Juices 5$</h4>
                            <hr>
                            <div class="juice">
                                <div class="name">Vitality &nbsp<img src="${require('../images/strawberry.png')}"></div>
                                <div class="description">Strawberries, Apples, Orange Base</div>
                            </div>
                            <div class="juice">
                                <div class="name">Health Mix &nbsp<img src="${require('../images/fruit.png')}"></div>
                                <div class="description">Seasonal Fruits Mix</div>
                            </div>
                            <div class="juice">
                                <div class="name">Detox &nbsp<img src="${require('../images/apple.png')}"></div>
                                <div class="description">Apple, Kale, Kiwi, Cucumber</div>
                            </div>
                            <div class="juice">
                                <div class="name">Immunity &nbsp<img src="${require('../images/blueberry.png')}"></div>
                                <div class="description">Blueberries, Ginger, Tumeric, Orange Base </div>
                            </div>
                            <div class="juice">
                                <div class="name">The Goods &nbsp<img src="${require('../images/avocado.png')}"></div>
                                <div class="description">Avocado, Dried Nuts, Dates, Milk Base</div>
                            </div>


                        </div>
                        <div class="add"><img src="${require('../images/add.png')}"></div>
                       <div class="right">
                            <h4>Sides 8$</h4>
                            <hr>
                            <div class="side">
                                    <div class="name">Chicken Skewers &nbsp<img src="${require('../images/skewer.png')}"></div>
                                    <div class="description">3X Delicious Chicken skewers</div>
                                </div>
                                <div class="side">
                                    <div class="name">Meat Skewers &nbsp<img src="${require('../images/tikka.png')}"></div>
                                    <div class="description">3X Delicious Meat skewers</div>
                                </div>
                                <div class="side">
                                    <div class="name">Rice Side&nbsp<img src="${require('../images/rice.png')}"></div>
                                    <div class="description">Bowl of Thai Rice</div>
                                </div>
                                <div class="side">
                                    <div class="name">Deli Sandwich &nbsp<img src="${require('../images/sandwich.png')}"></div>
                                    <div class="description">Turkey, Cheese and Eggs Breafast Sandwich</div>
                                </div>
                                <div class="side">
                                    <div class="name">Dried Nuts &nbsp<img src="${require('../images/dried-fruits.png')}"></div>
                                    <div class="description">Mixed Bag Almonds, Walnuts, Dried Raisins</div>
                                </div>

                            </div>
                       `

    themenu.style="display:flex; flex-direction:row; align-items:center; justify-content:space-between;"

    menu.append(title, subtitle, themenu)

    content.append(menu)



}