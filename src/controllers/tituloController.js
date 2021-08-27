const mongoose = require('mongoose')
const Titulo = require('../models/titulo')
const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET

const getAll = async (req, res) => {
  const authHeader = req.get('authorization')
  const token = authHeader.split(' ')[1]

  if(!token){
    return res.status(403).send({message: "cadeee o tokiiinn"})
  }

  jwt.verify(token, SECRET, async (err) => {
    if(err){
      res.status(403).send({message: "token inválido"})
    }
    const titulos = Titulo.find()
    res.json(titulos)
  })
  const titulos = await Titulo.find().populate('estudio')
  res.status(200).json(titulos)
}

const createTitle = async (req, res) => {
  const titulo = new Titulo({
    _id: new mongoose.Types.ObjectId(),
    nome: req.body.nome,
    genero: req.body.genero,
    descricao: req.body.descricao,
    estudio: req.body.estudio,
    criadoEm: req.body.criadoEm
  })
  try {
    const novoTitulo = await titulo.save()
    res.status(201).json(novoTitulo)
  } catch (err) {
    res.status(400).json({ message: err.message})
  }
}

const deleteTitulo = async (req, res) => {
  const authHeader = req.get('authorization')
  const token = authHeader.split(' ')[1]

  if(!token){
    return res.status(403).send({message: "kd o token?"})
  }

  jwt.verify(token, SECRET, async (err) => {
    if(err){
      res.status(403).send({message: "token inválido"})
    }
    const titulos = await Titulo.find()
    res.json(titulos)
  })
  try{
      const titulo = await Titulo.findById(req.params.id)
      if(titulo == null){
          return res.status(404).json({message: "Id não encontrado"})
      }

      titulo.remove()
      res.status(200).json({"message": "Titulo removido"})

  } catch (err){
      res.status(500).json({message: err.message})
  }
}

module.exports = {
  getAll,
  createTitle,
  deleteTitulo
}