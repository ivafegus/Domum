var express = require('express');
var router = express.Router();
var gasController = require('../controllers/gasController.js');

/*
 * GET
 */
router.get('/', gasController.list);

/*
 * GET
 */
router.get('/:id', gasController.show);

/*
 * POST
 */
router.post('/', gasController.create);

/*
 * PUT
 */
router.put('/:id', gasController.update);

/*
 * DELETE
 */
router.delete('/:id', gasController.remove);

module.exports = router;
