import menu_html from './menu.js'
import {setOptions, importLibrary} from '@googlemaps/js-api-loader'

let search_city={
    
    get city() {return (localStorage.getItem("city"))||"London";},
    set city(value){localStorage.setItem("city", String(value))},

    get lat() {return parseFloat(localStorage.getItem("lat"))||51.5074;},
    set lat(value){localStorage.setItem("lat", parseFloat(value))},

    get lng() {return parseFloat(localStorage.getItem("lng"))||-0.1278;},
    set lng(value){localStorage.setItem("lng", parseFloat(value))},
    

}

export function update_city(city, lat, lng){

    search_city.city=city;
    search_city.lat=lat;
    search_city.lng=lng;

    console.log(localStorage)

}

export function load_html(){

    const content=document.querySelector(".content");
    content.innerHTML="";

    const todo=document.createElement("div");
    todo.classList.add("todo")
    todo.style="display:flex; flex-direction:column; align-items:center; justify-content:center;"


    const subtitle=document.createElement("h3");
    subtitle.classList.add("subtitle")
    subtitle.textContent="Check Your Location Weather Previsions and More!"


    const themenu=document.createElement("div");
    themenu.classList.add("themenu")
    themenu.innerHTML= menu_html;

    themenu.style="display:flex; flex-direction:row; align-items:center; justify-content:space-between;"

    todo.append(subtitle, themenu)

    content.append(todo)

}


export async function set_up_search(){
    const box=document.querySelector(".right .box")
    const space=document.querySelector(".right .box .city")
    const search=document.querySelector("input.city")

    const suggestions=document.createElement("ul")
    //suggestions.classList.add("suggestions")
    suggestions.id="suggestions";
        
    space.append(suggestions)

    if(!search){console.log("Search not found!")}

    search.addEventListener("input", async (event)=>{

        const query=search.value.trim();

        if(query.length<2){suggestions.innerHTML=''; return;}

        try{

            const url = `https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=5&language=en&format=json`;
            const response= await fetch(url)   

            const data= await response.json()

            console.log(data.results)

            const full_cities=[]
            
            suggestions.innerHTML='';

            if(!data.results){return;}

            console.log(data.results)

            for(let i=0; i<data.results.length; i++){
                
                const city=data.results[i].name  

                const latitude=data.results[i].latitude 
                const longitude=data.results[i].longitude 
                
                const region=data.results[i].admin1                
                const country=data.results[i].country 
                const country_code=data.results[i].country_code

                let full_name=`${city}, ${region}, ${country_code}`

                full_cities.push(full_name)

                const list_item=document.createElement("li");
                list_item.id=`suggestion-${i}`;
                
                list_item.textContent=full_name;

                suggestions.append(list_item);

                list_item.addEventListener("click", async ()=>{
                    search.value=city; 
                    update_city(city, latitude, longitude)
                    //get_weather();
                    
                    await show_weather();
                    
                    console.log(search_city)
                    suggestions.innerHTML='';
                    search.style.border="2px black lightblue";
                } )

            }

            console.log(full_cities)
        
        }
        catch(error){
            console.log("Error loading API:", error)
            
        }
    })

    

}

export async function set_up_map(){
    
    const map_loc=document.querySelector(".box.map")

    let city

    await setOptions({
         
        key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        version: "weekly"
    })

    try{
        
        const {Map}= await importLibrary("maps");
        const {Geocoder}= await importLibrary("geocoding")

        let map = new Map(map_loc, 
                          {center:{lat:search_city.lat,lng:search_city.lng},
                           zoom:4,
                           disableDefaultUI: true,
                          })


        map.addListener('click',async (event)=>{

            const latitude=event.latLng.lat();
            const longitude=event.latLng.lng();
            
            const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
            console.log(url)
            
            const response= await fetch( url,{
                headers: { 'User-Agent': 'MyMappingApp/1.0'}
            })

            const data=await response.json();

            console.log(data)

            city= data.address.city || data.address.town || data.address.village || "Unknown Location";

            update_city(city, latitude, longitude)
            await show_weather();

            console.log(city);


        })



    }
    catch(error){
        throw("Problem loading data: ",error)
    }

}

export function handle_time(){
    
    const date= new Date()
    
    const today=date.toISOString().split('T')[0];

    date.setDate(date.getDate() +1)
    
    const tomorrow=date.toISOString().split('T')[0];
    
    const this_week=[];
    const this_week_days=[];

    const days=["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    
    let end_of_week=today;
    
    for(let i=2; i<=8;i++){

        const loop_date=new Date();

        loop_date.setDate(loop_date.getDate()+i); 
        
        this_week.push(loop_date.toISOString().split('T')[0])

        const day=days[loop_date.getDay()];

        this_week_days.push(day)
        

        //console.log(day)
        
        if(i===8){ 
            end_of_week= loop_date.toISOString().split('T')[0];

            //console.log(end_of_week)
        }
    
    }   
    

    return {today, tomorrow, this_week, end_of_week, this_week_days}
    
    
} 



export async function get_weather(){

    console.log(search_city)
    console.log()
    const dates= handle_time();
    
    const parameters={
        latitude:search_city.lat,
        longitude:search_city.lng,
        daily: ["sunrise","sunset","precipitation_sum","temperature_2m_max","temperature_2m_min"], //,"cloud_cover"],
        hourly: ["temperature_2m","cloud_cover"],
    	start_date: dates.today,
    	end_date: dates.end_of_week,
    }

    const url_parameters= new URLSearchParams(parameters);

    const url= `https://api.open-meteo.com/v1/forecast?${url_parameters}`

    try{

        const response= await fetch(url);

        const data= await response.json()

        console.log(data)


        const temperature= data.hourly.temperature_2m;
        const time= data.hourly.time;
        //console.log(search_city,temperature[0],time[0])

        return data;

    }
    
    catch(err){
        console.error("Failed to fetch weather data", err)
        return null;
    }
    
}

import sunny from '../images/sun.png';
import cloudy_25 from'../images/cloudy_25.png';
import cloudy_75 from'../images/cloudy_75.png';
import cloudy_100 from'../images/cloudy_100.png';

export function handle_cloud(image, daily_cloud){

    
    
    if(0<=daily_cloud && daily_cloud<25){
            image.src=sunny;
        }
        else if(25<=daily_cloud && daily_cloud<50){
            image.src=cloudy_25;
        }
        else if(50<=daily_cloud & daily_cloud<75){
            image.src=cloudy_75;
        }
        else if(75<=daily_cloud && daily_cloud<=100){
            image.src=cloudy_100;
        }
}


export async function handle_city(){
    const city=document.querySelector(".left .title .city")
    city.textContent=search_city.city 
}

export async function show_weather(){

    handle_city();

    const containers={
        today:document.querySelector(".box.today"), 
        tomorrow:document.querySelector(".box.tomorrow"),
        this_week:document.querySelector(".box.this_week"),
    }    

    if(containers.today){containers.today.innerHTML=''}
    if(containers.tomorrow){containers.tomorrow.innerHTML=''}
    if(containers.this_week){containers.this_week.innerHTML=''}
    const weather= await get_weather();

    if(!weather) return;

    const dates=handle_time();
    
    let cum_cloud=0;
    let daily_cloud=[];
    let daily_cloud_i=0;
    
    for(let i=0; i<weather.hourly.time.length; i++){
        
        const full_time=weather.hourly.time[i];
        const date=weather.hourly.time[i].split("T")[0];
        const time=weather.hourly.time[i].split("T")[1];
        const hour=weather.hourly.time[i].split("T")[1].split(":")[0];

        const temperature=Math.round(weather.hourly.temperature_2m[i]);
        const cloud=weather.hourly.cloud_cover[i];

        cum_cloud+=cloud;
        
        if((i+1)%24===0){
           daily_cloud_i=Math.round(cum_cloud/24);
           cum_cloud=0;
           daily_cloud.push(daily_cloud_i)
            
        }
        
        let target_box=null;


        if(dates.this_week.includes(date)){
            target_box=containers.this_week;
        }

        if(date===dates.tomorrow){
            target_box=containers.tomorrow;
        }

        if(date===dates.today){
            target_box=containers.today;
        }

        if(!target_box){ continue;}

        const target_date=target_box.classList[1];
        //console.log(target_date)


        const tyme=document.createElement("div")
        tyme.classList.add("time")
        tyme.textContent= hour

        
        const temp=document.createElement("div")
        temp.classList.add("temp")
        temp.textContent= temperature +"°"
        
        const icon=document.createElement("div")
        icon.classList.add("icon")

        let image=document.createElement("img")

        handle_cloud(image, cloud)

        icon.append(image)

        const hourly=document.createElement("div")
        hourly.classList.add("hourly")
        hourly.append(tyme, icon, temp)

        
        const box=document.createElement("div")
        box.classList.add("box")

        box.append(hourly)
        
        if(target_box===containers.today || target_box===containers.tomorrow){
            target_box.append(box); 
            continue;  
        }
    }
    //console.log(daily_cloud)
    
    
    for(let j=0; j<weather.daily.time.length; j++){

        

        const date=weather.daily.time[j]
        //console.log(date)

        let sunrise=weather.daily.sunrise[j]
        let sunset=weather.daily.sunset[j]

        const daily_temp_max=weather.daily.temperature_2m_max[j]
        const daily_temp_min=weather.daily.temperature_2m_min[j]

        const day_cloud=daily_cloud[j]

        const temp=document.createElement("div")
        temp.classList.add("temp")
        temp.textContent= Math.round(daily_temp_min) +"°" +" | " + Math.round(daily_temp_max) +"°"

        const icon=document.createElement("div")
        icon.classList.add("icon")

        let image=document.createElement("img")

        handle_cloud(image, day_cloud)
        icon.append(image)

        const daily=document.createElement("div")
        daily.classList.add("daily")
        daily.append(icon, temp)

        const day=document.createElement("div")
        day.classList.add("day")
        day.textContent=dates.this_week_days[j%7]
        
        const row_box=document.createElement("div")
        row_box.classList.add("row_box")

        row_box.append(day, daily)


        let target_box=containers.this_week
        target_box.append(row_box)
        
        
    }                
}

