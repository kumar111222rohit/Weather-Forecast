var fs = require('fs');
var jsonCityData = JSON.parse(fs.readFileSync('./daily_14.json').toString());

let cityList=[]
jsonCityData.map(item=>{
    cityList.push(item.city.name)
})
let data = JSON.stringify(cityList);
fs.writeFileSync('./src/cityMetadata.json', data);
