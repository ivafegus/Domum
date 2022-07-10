const mongoose = require('mongoose');
var Schema   = mongoose.Schema;

const apartmentSchema = mongoose.Schema({
    /* 
      An apartment can either be rented or owned
    */
    type: {
      type: String,
      enum: ['RENT', 'OWNED'],
      default: 'RENT'
    },

    /* 
      Price can either be monthly rent, or the full price of an apartment
    */
    price: {
      type: mongoose.Schema.Types.Decimal128,
      required: true
    },

    /*
      Sie of the apartment in m2
    */
    size: {
      type: Number,
      required: true
    },

    /*
      All materials listed when renting an apartment
    */
   /*
    priceOfMaterials: {
      electricity: {
        type: Schema.ObjectId,
        ref: 'Electricity'
      },
      water: {
        type: Schema.ObjectId,
        ref: 'Water'
      },
      gas: {
        type: Schema.ObjectId,
        ref: 'Gas'
      },
    },
    */

    /*
      Amount of rooms an apartment has. Balcony also counts as a room.
    */
    amountOfRooms: {
      type: Number,
      required: true
    },

    /* 
      Using web scraping and AI, avaliable images of the apartment will be automatically categorized and put here
    */
    roomImages: {
      kitchen: {
        images: Array
      },
      
      bathRoom: {
        images: Array
      },

      livingRoom: {
        images: Array
      },

      balcony: {
        images: Array
      },

      other: {
        images: Array
      },
    },

    /*
      Address of the apartment
    */
    address: {
      type: String,
      // required: true,
    },

    /*
      GeoJSON object Point, for Geospatial queries,
      Contains coordinates of the location
    */
    location: {
      type: {
        type: String,
        enum: ['Point'],
        required: true
      },
      
      coordinates: {
        type: [Number],
        required: true
      }
    },

    /*
      Buildings that are close to the apartment
    */
    closeBuildings: [{
      type: Schema.ObjectId,
      ref: 'Building'
    }],

    rated: {
      type: Number
    }
})

module.exports = mongoose.model('Apartment', apartmentSchema)