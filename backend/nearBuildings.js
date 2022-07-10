const axios = require('axios')

function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
}

/*
    There are a maximum of 60 results returned from the Google Places API.
    If there are 60, they are returned in 3 pages, with 20 results each.
    Each page also contains a next_page_token, which lets you see the next page of the results.
    next_page_token needs to be added to the end of the url as such: &pagetoken=next_page_token
*/

let getBuildings = async (url) => {
    let buildings = []
    let nextPageToken = ""                                                              // If there are more than 20 requests, the response contains a next_page_token
    const firstResponse = await axios.get(url)                                          // API request
    for(let building of firstResponse.data.results) buildings.push(building)            // Adds the buildings to an array
    if (firstResponse.data.next_page_token) {                                           // Checks for the next_page_token
        await sleep(2000)                                                               // Google API Places doesn't allow requests in less than 2 second intervals, so this waits a bit
        nextPageToken = firstResponse.data.next_page_token                              // Sets the new nextPageToken
        const secondResponse = await axios.get(url + `&pagetoken=${nextPageToken}`)     // Sends a request with the new next_page_token
        for(let building of secondResponse.data.results) buildings.push(building)       // Adds the buildings to an array
        if (secondResponse.data.next_page_token) {                                      // Checks for the next_page_token
            await sleep(2000)                                                           // Google API Places doesn't allow requests in less than 2 second intervals, so this waits a bit
            nextPageToken = secondResponse.data.next_page_token                         // Sets the new nextPageToken
            const thirdResponse = await axios.get(url + `&pagetoken=${nextPageToken}`)  // Sends a request with the new next_page_token
            for(let building of thirdResponse.data.results) buildings.push(building)    // Adds the buildings to an array
            return buildings                                                            
        } else return buildings                                                         
    } else return buildings                                                             
}

class NearBuildings {
    constructor(latitude, longitude, apiKey) {
        this.latitude = latitude
        this.longitude = longitude
        this.apiKey = apiKey
    }

    buildings() {
        let url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${this.longitude}%2C${this.latitude}&radius=100&key=${this.apiKey}`
        return getBuildings(url)
    }
}

module.exports = NearBuildings
