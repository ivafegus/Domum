var GasModel = require('../models/gasModel.js');

/**
 * gasController.js
 *
 * @description :: Server-side logic for managing gass.
 */
module.exports = {

    /**
     * gasController.list()
     */
    list: function (req, res) {
        GasModel.find(function (err, gass) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting gas.',
                    error: err
                });
            }

            return res.json(gass);
        });
    },

    /**
     * gasController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        GasModel.findOne({_id: id}, function (err, gas) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting gas.',
                    error: err
                });
            }

            if (!gas) {
                return res.status(404).json({
                    message: 'No such gas'
                });
            }

            return res.json(gas);
        });
    },

    /**
     * gasController.create()
     */
    create: function (req, res) {
        var gas = new GasModel({
			price : req.body.price
        });

        gas.save(function (err, gas) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating gas',
                    error: err
                });
            }

            return res.status(201).json(gas);
        });
    },

    /**
     * gasController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        GasModel.findOne({_id: id}, function (err, gas) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting gas',
                    error: err
                });
            }

            if (!gas) {
                return res.status(404).json({
                    message: 'No such gas'
                });
            }

            gas.price = req.body.price ? req.body.price : gas.price;
			
            gas.save(function (err, gas) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating gas.',
                        error: err
                    });
                }

                return res.json(gas);
            });
        });
    },

    /**
     * gasController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        GasModel.findByIdAndRemove(id, function (err, gas) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the gas.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
