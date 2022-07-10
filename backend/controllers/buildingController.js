const Building = require('../models/buildingModel.js')

const getBuildings = async (req, res) => {
    const buildings = await Building.find()

    res.status(200).json(buildings)
}

const getBuilding = async (req, res) => {
    const building = await Building.findById(req.params.id)

    res.status(200).json(building)
}

const addBuilding = async (req, res) => {
    const building = await Building.create({
        type: req.body.buildingType,
        address: req.body.address,
        location:   {
                    type: req.body.locationType, 
                    coordinates: [
                        req.body.longitude,
                        req.body.latitude
                    ]}
    })

    res.status(200).json(building);
}

const updateBuilding = async (req, res) => {
    const building = await Building.findById(req.params.id)

    if(!building){
        throw new Error('Building of interest not found')
    }

    const updatedBuilding = await Building.findByIdAndUpdate(req.params.id, req.body, {new: true,})

    res.status(200).json(updatedBuilding)
}

const deleteBuilding = async (req, res) => {
    const building = await Building.findById(req.params.id)

    if(!building){
        throw new Error('Building of interest not found')
    }

    await building.remove()

    res.status(200).json({ id: req.params.id })
}


module.exports = {
    getBuildings,
    getBuilding,
    addBuilding,
    updateBuilding,
    deleteBuilding
}