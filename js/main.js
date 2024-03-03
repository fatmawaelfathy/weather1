 let search = document.getElementById("search")
//today
let todayDate = document.getElementById("today-date")
let todayDateDayName = document.getElementById("today_date_day_name")
let todayDateDayNumber= document.getElementById("today_date_day_number")
let todayDateMonth= document.getElementById("today_date_month")
let today =document.getElementById("today")
let todayLocation = document.getElementById("today_location")
let todayTemp = document.getElementById("today_temp")
let todayConditionImg = document.getElementById("today_condition_img")
let todayConditionText = document.getElementById("today_condition_text")
let humidity = document.getElementById("humidity")
let wind = document.getElementById("wind")
let windDirection =document.getElementById("wind_direction")

///
let next_day_name = document.getElementsByClassName("next_day_name")
let next_condition_img = document.getElementsByClassName("next_condition_img")
let next_max_temp  = document.getElementsByClassName("next_max_temp")
let  next_min_temp = document.getElementsByClassName("next_min_temp")
let next_condition_text = document.getElementsByClassName("next_condition_text")

let date = new Date()




async function getData(cityName) {
    let DataUrl = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=149d826f834d461ab92134841231608&q=${cityName}&days=3`)
    
    let Data =  await DataUrl.json()
    
    return  Data
    
}



 // disblay dayData

 function disblayData(data) {
    let toDayDate = new Date()
    todayDateDayName.innerHTML = toDayDate.toLocaleDateString("en-US",{weekday:"long"})
    todayDateDayNumber.innerHTML = toDayDate.getDate()
    todayDateMonth.innerHTML= toDayDate.toLocaleDateString("en-US",{month:"long"})
    todayLocation.innerHTML= data.location.name
    todayTemp.innerHTML = data.current.temp_c
    todayConditionText.innerHTML = data.current.condition.text
    todayConditionImg.setAttribute("src",data.current.condition.icon)
    humidity.innerHTML = data.current.humidity
    wind.innerHTML = data.current.wind_kph
    windDirection .innerHTML = data.current.wind_dir
    
 }


 function disblaymansday(data) {
    let forecast = data.forecast.forecastday
   for(let i=0 ; i<2 ; i++){
    let maxData = new Date(forecast[i+1].date)
    next_day_name[i].innerHTML=maxData.toLocaleDateString("en-US",{weekday:"long"})
     next_max_temp[i].innerHTML = forecast[i+1].day.maxtemp_c
     next_min_temp[i].innerHTML= forecast[i+1].day.mintemp_c
     next_condition_text[i].innerHTML = forecast[i+1].day.condition.text
     next_condition_img[i].setAttribute("src",forecast[i+1].day.condition.icon)

   }
    
 }

 //start Add

 async function startAdd(city="cairo") {
    let Data  = await getData(city)
    disblayData(Data)
    
    disblaymansday(Data)
    
 }

 startAdd() 

 search.addEventListener("input",function () {
startAdd(search.value)
 })