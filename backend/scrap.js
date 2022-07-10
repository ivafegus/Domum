const nepremicnineWebScraper = require("nepremicnine-web-scraper")
const Apartment = require('./models/apartmentModel')

async function scrap(apiKey, parameter, getBuildingsNearApartment, rateApartment) {
    const webScraper = new nepremicnineWebScraper.WebScraper(apiKey)
    const apartments = await webScraper.scrape(parameter)

    if (apartments) console.log(`apartments length is : ${apartments.length}`)
  
    for(const ap of apartments){
        let location = {
            body: {
                longitude: ap.location[0],
                latitude: ap.location[1]
            }
        }

        const nearBuildings = await getBuildingsNearApartment(location);
        ap.closeBuildings = nearBuildings;

        const rated = await rateApartment(ap)

        const re = /([^\s]+)/
        const price = parseFloat(String(re.exec(ap.price)).replace(".", "").replace(",", "."))
        const size = parseFloat(re.exec(ap.size))

        Apartment.exists({
            type: ap.type,
            price: price,
            size: size,
            amountOfRooms: ap.amountOfRooms,
            address: ap.address,
            location: {
                $geoIntersects: {
                    $geometry: {
                       type: "Point" ,
                       coordinates: ap.location
                    }
                }
            },
        }, async function(err, result){
            if(!result){
                const apartment = await Apartment.create({
                    type: ap.type,
                    price: price,
                    size: size,
                    amountOfRooms: ap.amountOfRooms,
                    roomImages: {
                                "other.images": ap.roomImages,
                                },
                    address: ap.address,
                    location:   {
                                type: 'Point', 
                                coordinates: ap.location
                            },
                    closeBuildings: nearBuildings,
                    rated: rated
                })
            }else{
                console.log("apartment already in db")
            }
        })
    }

    return apartments
}

module.exports = scrap