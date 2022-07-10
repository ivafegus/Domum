var express = require('express');
var router = express.Router();
var electricityController = require('../controllers/electricityController.js');

/*
 * GET
 */
router.get('/', electricityController.list);

/*
 * GET
 */
router.get('/:id', electricityController.show);

/*
 * POST
 */
router.post('/', electricityController.create);

/*
 * PUT
 */
router.put('/:id', electricityController.update);

/*
 * DELETE
 */
router.delete('/:id', electricityController.remove);

module.exports = router;
