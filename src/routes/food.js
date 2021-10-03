'use strict';

const express = require('express')

const { Food } = require('../models/index')

const router = express.Router()

// Restful Route Declarations
router.get('/food', getFoods)
router.get('/food/:id', getFood)
router.post('/food', createFood)
router.put('/food/:id', updateFood)
router.delete('/food/:id', deleteFood)

// Restful Router Handlers
async function getFoods(req, res) {
  let foods = await Food.findAll();
  res.status(200).json(foods)
}

async function getFood(req, res) {
  const id = ~~req.params.id
  let food = await Food.findOne({where:{ id:id}})
  res.status(200).json(food)
}

async function createFood(req, res) {
  let foodData = req.body
  let food = await Food.create(foodData)
  res.status(200).json(food)
}

async function updateFood(req, res) {
  const id = ~~req.params.id
  const foodData = req.body
  let food = await Food.findOne({where:{id:id}})
  let updatedFood = await Food.update(foodData)
  res.status(200).json(updatedFood)
}

async function deleteFood(req,res) {
  const id = ~~req.params.id
  let deleteFood = await Food.destroy({where:{id:id}})
  res.status(200).json(deleteFood)
}

module.exports = router
