const chalk = require("chalk");
const request = require("request");
var IPGeolocationAPI = require('ip-geolocation-api-javascript-sdk');

const city = process.argv[2];
if (city) {
    getData(city);
}
else {
    var ipgeolocationApi = new IPGeolocationAPI("85c4e3caca5c4d8abcd4bca8173284d7", false); 
    ipgeolocationApi.getGeolocation((res) => {
            if(res){
                getData(res.city)
            }
            else{
                console.log(chalk.bold.red("Sorry, something went wrong!"))
            }
    });
}



function getData(city) {
    const options = {
        url: ` https://api.apixu.com/v1/current.json?key=f3202b9d9ea34f868f3120440180206&q=${city}`,
        json: true,
    }
    request(options, (err, response) => {
        console.log(chalk`
{bold.white.bgBlack Country Name:} {green ${response.body.location.country}}`)
        console.log(chalk`
{bold.white.bgBlack Region:} {yellow ${response.body.location.region}}`)
        console.log(chalk`
        {underline.magenta.italic Weather}
        `)
        console.log(chalk`
{bold.white.bgBlack Temperature In Celisus:} {blueBright.bold ${response.body.current.temp_c}} {red C} `)
        if (response && response.body.location.country) {
            const newAPIKey = "89b7784face7425d8fd5a69979a3bbfa"
            const newsLink = `https://newsapi.org/v2/top-headlines?q=${response.body.location.country}&
            sources=bbc-news&apiKey=${newAPIKey}`
            const optionsForNews = {
                url: newsLink,
                method: "GET",
                json: true,
            }
            request(optionsForNews, (err, res) => {
                if (res && res.body.status === "ok") {
                    if (res.body.totalResults !== 0) {
                        console.log(chalk`


                            {bold.redBright.underline Top News of ${response.body.location.country}:} 
                            `)
                        res.body.articles.map((v, i) => {

                            console.log(chalk`
{white ${i+1}.} {bold.magentaBright Title}: 
        `+ v.title);
                            console.log(chalk`
{bold.yellow Source: }
        `+ v.source.name);
                            console.log(chalk`
{bold.blue Discription: } 
            ${v.description}
            
            
            `)
                        })
                    }
                    else {
                        console.log(chalk.bold.bgYellow.white("Sorry, No Top News"))
                    }
                }
                else {
                    console.log(chalk.bold.red("Sorry, something went wrong!"))
                }
            })
        }
        else {
            cconsole.log(chalk.bold.red("Sorry, something went wrong!"))
        }
    })
}