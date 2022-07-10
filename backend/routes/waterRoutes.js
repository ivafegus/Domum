var express = require('express');
var router = express.Router();
var waterController = require('../controllers/waterController.js');

/*
 * GET
 */
router.get('/', waterController.list);

/*
 * GET
 */
router.get('/:id', waterController.show);

/*
 * POST
 */
router.post('/', waterController.create);

/*
 * PUT
 */
router.put('/:id', waterController.update);

/*
 * DELETE
 */
router.delete('/:id', waterController.remove);

module.exports = router;
