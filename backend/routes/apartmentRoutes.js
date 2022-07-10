const express = require('express')
const router = express.Router()
const authenticateToken = require('../authenticate.js');
const authorizeAdmin = require('../authorize.js');
const apartmentController = require('../controllers/apartmentController')

router.post('/scrap', authenticateToken, authorizeAdmin, apartmentController.scrap)

// Get all apartments
router.get('/', authenticateToken, apartmentController.getApartments)
router.get('/filteredApartments', authenticateToken, apartmentController.getFilteredApartments)

// Get apartment by id
router.get('/:id', authenticateToken, apartmentController.getApartment)

// Add apartment
router.post('/', authenticateToken, apartmentController.addApartment)

// Update apartment by id
router.put('/:id', authenticateToken, apartmentController.updateApartment)

// Delete apartment by id
router.delete('/:id', authenticateToken, apartmentController.deleteApartment)



module.exports = router
