var ElectricityModel = require('../models/electricityModel.js');

/**
 * electricityController.js
 *
 * @description :: Server-side logic for managing electricitys.
 */
module.exports = {

    /**
     * electricityController.list()
     */
    list: function (req, res) {
        ElectricityModel.find(function (err, electricitys) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting electricity.',
                    error: err
                });
            }

            return res.json(electricitys);
        });
    },

    /**
     * electricityController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        ElectricityModel.findOne({_id: id}, function (err, electricity) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting electricity.',
                    error: err
                });
            }

            if (!electricity) {
                return res.status(404).json({
                    message: 'No such electricity'
                });
            }

            return res.json(electricity);
        });
    },

    /**
     * electricityController.create()
     */
    create: function (req, res) {
        var electricity = new ElectricityModel({
			price : req.body.price
        });

        electricity.save(function (err, electricity) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating electricity',
                    error: err
                });
            }

            return res.status(201).json(electricity);
        });
    },

    /**
     * electricityController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        ElectricityModel.findOne({_id: id}, function (err, electricity) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting electricity',
                    error: err
                });
            }

            if (!electricity) {
                return res.status(404).json({
                    message: 'No such electricity'
                });
            }

            electricity.price = req.body.price ? req.body.price : electricity.price;
			
            electricity.save(function (err, electricity) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating electricity.',
                        error: err
                    });
                }

                return res.json(electricity);
            });
        });
    },

    /**
     * electricityController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        ElectricityModel.findByIdAndRemove(id, function (err, electricity) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the electricity.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
