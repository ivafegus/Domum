var WaterModel = require('../models/waterModel.js');

/**
 * waterController.js
 *
 * @description :: Server-side logic for managing waters.
 */
module.exports = {

    /**
     * waterController.list()
     */
    list: function (req, res) {
        WaterModel.find(function (err, waters) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting water.',
                    error: err
                });
            }

            return res.json(waters);
        });
    },

    /**
     * waterController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        WaterModel.findOne({_id: id}, function (err, water) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting water.',
                    error: err
                });
            }

            if (!water) {
                return res.status(404).json({
                    message: 'No such water'
                });
            }

            return res.json(water);
        });
    },

    /**
     * waterController.create()
     */
    create: function (req, res) {
        var water = new WaterModel({
			price : req.body.price
        });

        water.save(function (err, water) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating water',
                    error: err
                });
            }

            return res.status(201).json(water);
        });
    },

    /**
     * waterController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        WaterModel.findOne({_id: id}, function (err, water) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting water',
                    error: err
                });
            }

            if (!water) {
                return res.status(404).json({
                    message: 'No such water'
                });
            }

            water.price = req.body.price ? req.body.price : water.price;
			
            water.save(function (err, water) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating water.',
                        error: err
                    });
                }

                return res.json(water);
            });
        });
    },

    /**
     * waterController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        WaterModel.findByIdAndRemove(id, function (err, water) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the water.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
