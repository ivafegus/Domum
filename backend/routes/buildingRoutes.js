const express = require('express');
const router = express.Router()
const authenticateToken = require('../authenticate.js');
const buildingController = require('../controllers/buildingController')

// Get all buildings
router.get('/', authenticateToken, buildingController.getBuildings)

// Get building by id
router.get('/:id', authenticateToken, buildingController.getBuilding)

// Add building
router.post('/', authenticateToken, buildingController.addBuilding)

// Update building by id
router.put('/:id', authenticateToken, buildingController.updateBuilding)

// Delete building by id
router.delete('/:id', authenticateToken, buildingController.deleteBuilding)


module.exports = router
