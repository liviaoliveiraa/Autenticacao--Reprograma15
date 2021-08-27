const mongoose = require('mongoose')
const Estudio = require('../models/estudio')
const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET

const getAll = async (req, res) => {
  const authHeader = req.get('authorization');
  const token = authHeader.split(' ')[1]

  if(!token){
    return res.status(403).send({
      message: "kd a autorizationnn"
    })
  }
  //verificação do token com o secret do projeto
  jwt.verify(token, SECRET, async (err) => {
    if(err){
      res.status(403).send({message: "token não válido", err}) 
    }
    const estudios = await Estudio.find()
    res.json(estudios)
  })

  
}

const createStudio = async (req, res) => {
  const authHeader = req.get('authorization');
  const token = authHeader.split(' ')[1]

  if(!token){
    return res.status(403).send({message: "manda a autorizationnn"})
  }

  jwt.verify(token, SECRET, async (err) => {
    if(err){
      res.status(403).send({message: "token inválido", err})
    }
    const estudios = await Estudio.find()
  })

  const estudio = new Estudio({
    _id: new mongoose.Types.ObjectId(),
    nome: req.body.nome,
    criadoEm: req.body.criadoEm,
  })
  const estudioJaExiste = await Estudio.findOne({nome: req.body.nome})
  if (estudioJaExiste) {
    return res.status(409).json({error: 'Estudio ja cadastrado.'})
  }
  try{
    const novoEstudio = await estudio.save()
    res.status(201).json(novoEstudio)
  } catch(err) {
    res.status(400).json({ message: err.message})
  }
}

const deleteEstudio = async(req, res) => {
  const authHeader = req.get('authorization');
  const token = authHeader.split(' ')[1]

  if(!token){
    return res.status(403).send({message: "kd o tokeeeenn??"})
  }

  jwt.verify(token, SECRET, async (err)=> {
    if(err){
      res.status(403).send({message: "token inválido"})
    }
    const estudios = await Estudio.find()
    res.json(estudios)
  })
  try{
    const estudio = await Estudio.findById(req.params.id)
    if(estudio == null){
      return res.status(404).json({message: "Estudio não encontrado"})
    }

    estudio.remove()
    res.status(200).json({message: "Estudio removido com sucesso"})


  } catch (err){
    res.status(500).json({message: err.message})
  }
}



module.exports = {
  getAll,
  createStudio,
  deleteEstudio
}