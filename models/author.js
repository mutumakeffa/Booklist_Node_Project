const mongoose = require('mongoose')

/**
 * Let's create a new schema or table or normal sql database
 */

 const authorSchema = new mongoose.Schema({
     name : {
         type: String,
         required: true
     }
 })

/**
 * Create  
 */
 module.exports = mongoose.model('Author', authorSchema)