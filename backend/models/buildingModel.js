const mongoose = require('mongoose');

const buildingSchema = mongoose.Schema({
  /* 
    Buildings can be of type Hospital, School, Shop
  */
  type: {
    type: ['Hospital', 'School', 'Shop'],
    required: true
  },

  /* 
    Address of the building
  */
  address: {
    type: String,
    // required: true
  },

  name: {
    type: String,
    // required: true
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
  }
})

module.exports = mongoose.model('Building', buildingSchema)