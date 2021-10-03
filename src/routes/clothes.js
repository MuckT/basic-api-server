'use strict';

const express = require('express')

const { Clothes } = require('../models/index')

const router = express.Router()

// Restful Route Declarations
router.get('/clothes', getClothes)
router.get('/clothes/:id', pieceOfClothing)
router.post('/clothes', createPieceOfClothing)
router.put('/clothes/:id', updatePieceOfClothing)
router.delete('/clothes/:id', deletePieceOfClothing)

// Restful Router Handlers
async function getClothes(req, res) {
  let allClothes = await Clothes.findAll()
  res.status(200).json(allClothes)
}

async function pieceOfClothing(req, res) {
  const id = ~~req.params.id
  let piece = await Clothes.findOne({ where: {id: id}})
  res.status(200).json(piece)
}

async function createPieceOfClothing(req, res) {
  let pieceOfClothingData = req.body
  let pieceOfClothing = await Clothes.create(pieceOfClothingData)
  res.status(200).json(pieceOfClothing)
}

async function updatePieceOfClothing(req, res) {
  const id = ~~req.params.id
  const pieceOfClothingData = req.body
  let pieceOfClothing = await Clothes.findOne({ where: {id: id}})
  let updatedPieceOfClothing = await pieceOfClothing.update(pieceOfClothingData)
  res.status(200).json(updatedPieceOfClothing)
}

async function deletePieceOfClothing(req, res) {
  const id = ~~req.params.id
  let deletedPieceOfClothing = await Clothes.destroy({ where: {id:id}})
  res.status(200).json(deletedPieceOfClothing)
}

module.exports = router
