const mongoose = require('mongoose')
const mongoUrl = process.env.MONGODB_URL

const connect = () => {mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(console.log('Database conectada com sucesso.'))
  .catch(err => console.err)
}

module.exports = { connect }