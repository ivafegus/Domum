const Apartment = require('../models/apartmentModel')
const Building = require('../models/buildingModel')
const scrapFunction = require('../scrap.js')
const nearBuildingsConstructor = require('../nearBuildings.js')
const e = require('express')

const getApartments = async (req, res) => {
    const apartments = await Apartment.find().populate("closeBuildings")
    
    res.status(200).json(apartments)
}

const getFilteredApartments = async (req, res) => {
    // console.log(req.query)

    let query = {}; // Query that will be used to filter the apartments

    // Adds type to query
    (req.query.type) ? (query.type = req.query.type) : ""; 

    // Adds price to query
    if (req.query.highPrice) {
        if (req.query.lowPrice) {
            query.price = { $lt: req.query.highPrice, $gt: req.query.lowPrice } // Both prices are provided
        } else {
            query.price = { $lt: req.query.highPrice} // Only high price is provided
        }
    } else {
        if (req.query.lowPrice) {
            query.price = { $gt: req.query.lowPrice } // Only low price is provided
        } else {
            // Price is not provided, so query.size should be null
        }
    }

    // Adds size to query
    if (req.query.highSize) {
        if (req.query.lowSize) {
            query.size = { $lt: req.query.highSize, $gt: req.query.lowSize } // Both sizes are provided
        } else {
            query.size = { $lt: req.query.highSize} // Only high size is provided
        }
    } else {
        if (req.query.lowSize) {
            query.size = { $gt: req.query.lowSize } // Only low size is provided
        } else {
            // Size is not provided, so query.size should be null
        }
    }

    // Adds amountOfRooms to query
    (req.query.amountOfRooms1) ? ((query.amountOfRooms) ? query.amountOfRooms.push('1'): query.amountOfRooms = ['1']): "";
    (req.query.amountOfRooms2) ? ((query.amountOfRooms) ? query.amountOfRooms.push('2'): query.amountOfRooms = ['2']): "";
    (req.query.amountOfRooms3) ? ((query.amountOfRooms) ? query.amountOfRooms.push('3'): query.amountOfRooms = ['3']): "";
    (req.query.amountOfRooms4) ? ((query.amountOfRooms) ? query.amountOfRooms.push('4'): query.amountOfRooms = ['4']): "";
    (req.query.amountOfRooms5) ? ((query.amountOfRooms) ? query.amountOfRooms.push('5'): query.amountOfRooms = ['5']): "";

    // Adds amountOfRooms to query
    (req.query.amountOfRooms) ? (query.amountOfRooms = req.query.amountOfRooms.split(',')) : "";

    // console.log(query)

    let filteredApartments = await Apartment.find(query)

    res.status(200).json(filteredApartments)
}

const rateApartment = async(apartment) => {
    try {
        let rated = 0;
        let pricePerSquareM = 0;

        // Points are added depending on the price of a squared meter
        if (apartment.type == "OWNED") {
            pricePerSquareM = apartment.price / apartment.size
            if (pricePerSquareM < 1000) { rated = rated + 100; }
            else if (pricePerSquareM < 1500) { rated = rated + 70; }
            else if (pricePerSquareM < 2000) { rated = rated + 50; }
            else { rated = rated + 40; }
        } else {
            pricePerSquareM = apartment.price / apartment.size
            if (pricePerSquareM < 10) { rated = rated + 100; }
            else if (pricePerSquareM < 15) { rated = rated + 70; }
            else if (pricePerSquareM < 20) { rated = rated + 50; }
            else { rated = rated + 40; }
        }

        // Points are added depending on the building type close to the apartment
        const buildings = await Building.findById(apartment.closeBuildings)

        if (buildings != null) {
            buildings.type.forEach((buildingType) => {
                if (buildingType == "transit_station" || buildingType == "food" || buildingType == "store" || buildingType == "restaurant" || buildingType == "grocery_or_supermarket" || buildingType == "bakery" || buildingType == "school") {
                    rated = rated + 5;
                } else if (buildingType == "health" || buildingType == "doctor" || buildingType == "dentist") {
                    rated = rated + 4;
                } else if (buildingType == "gym" || buildingType == "hair_care" || buildingType == "accounting" || buildingType == "finance" || buildingType == "bar") {
                    rated = rated + 2;
                } else {
                    rated = rated + 1;
                }
            })
        }
        
        // Points are added depending on the amount of rooms
        rated += apartment.amountOfRooms * 30;
        return rated;
    } catch (error) {
        console.log(error)
        return 0
    }   
}

const getApartment = async (req, res) => {
    const apartment = await Apartment.findById(req.params.id).populate("closeBuildings")

    res.status(200).json(apartment)
}

const getBuildingsNearApartment = async(req) => {
    let nearBuildingsFunction = new nearBuildingsConstructor(req.body.latitude, req.body.longitude, process.env.SCRAPER_API_KEY)
    let buildings = await nearBuildingsFunction.buildings() // Gets all the buildings

    for(let building of buildings) {
        Building.exists({
            type: building.types,
            address: building.vicinity,
            name: building.name,
            location:   {
                type: "Point", 
                coordinates: [
                    building.geometry.location.lat,
                    building.geometry.location.lng
            ]},
        }, async function(err, result){
            if(!result){
                const nearBuilding = await Building.create({ // Adds them to the database
                    type: building.types,
                    address: building.vicinity,
                    name: building.name,
                    location:   {
                        type: "Point", 
                        coordinates: [
                            building.geometry.location.lat,
                            building.geometry.location.lng
                        ]},
                })
            }else{
                // console.log("building already in db")
            }
        })
    }

    // Finds and returns all buildings, that are closer than maxDistance meters away from the given GeoPoint
    return nearBuildings = Building.find(
        { location: { $near: { $maxDistance: 100, $geometry: { type:"Point", coordinates:[req.body.longitude, req.body.latitude] } } } },
        { _id: 1 }
    )
} 

const addApartment = async (req, res) => {
    const nearBuildings = await getBuildingsNearApartment(req);

    const apartment = await Apartment.create({
        type: req.body.type,
        price: req.body.price,
        size: req.body.size,
        priceOfMaterials:   { 
                            "electricity.price": req.body.electricityPrice, 
                            "water.price": req.body.waterPrice,
                            "gas.price": req.body.gasPrice 
                            },
        amountOfRooms: req.body.amountOfRooms,
        roomImages: {   
                    "kitchen.images": req.body.kitchenImages,
                    "bathRoom.images": req.body.bathRoomImages,
                    "livingRoom.images": req.body.livingRoomImages,
                    "balcony.images": req.body.balconyImages,
                    "other.images": req.body.otherImages,
                    },
        address: req.body.address,
        location:   {
                    type: req.body.locationType, 
                    coordinates: [
                        req.body.longitude,
                        req.body.latitude
                    ]},
        closeBuildings: nearBuildings
    })

    res.status(200).json(apartment)
}

const updateApartment = async (req, res) => {
    const apartment = await Apartment.findById(req.params.id)

    if(!apartment){
        throw new Error('Apartment not found')
    }

    const updatedApartment = await Apartment.findByIdAndUpdate(req.params.id, req.body, {new: true,})

    res.status(200).json(updatedApartment)
}

const deleteApartment = async (req, res) => {
    const apartment = await Apartment.findById(req.params.id)

    if(!apartment){
        throw new Error('Apartment not found')
    }

    await apartment.remove()

    res.status(200).json({ id: req.params.id })
}

const scrap = async (req, res) => {
    var apartments
    if(req.body.parameter && req.body.parameter != ""){
        console.log("Scraping: " + req.body.parameter)
        apartments = await scrapFunction(process.env.SCRAPER_API_KEY, req.body.parameter, getBuildingsNearApartment, rateApartment)
    } else {
        console.log("Scraping: podravska/maribor/stanovanje/")
        apartments = await scrapFunction(process.env.SCRAPER_API_KEY, "podravska/maribor/stanovanje/", getBuildingsNearApartment, rateApartment)
    }

    if(!apartments){
        throw new Error('No matching apartments')
    }

    if (res) return res.json({ message: "scrapping successful" }) // If the function is manually called through a http request
    console.log("Končan scrap") // If the function is automatically called at midnight
}

module.exports = {
    getApartments,
	getFilteredApartments,
    rateApartment,
    getApartment,
    addApartment,
    updateApartment,
    deleteApartment,
    scrap
}
