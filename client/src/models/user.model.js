const mongoose = require ('mongoose');
const { Schema } = mongoose;
const bcrypt = require ("bcryptjs");

const userSchema = new Schema({
  
  name: {
    type: String,
    trim: true,
    required: "Se requiere el nombre"
  },

  email: {
        type: String,
        trim: true,
        unique: "El Email ya existe",
        match: [/.+\@.+\..+/, "Por favor ofrezca un correo valido"],
        required: true
      },
 password:  {
        type: String,
        required: true,
        minLength: 6
      },
  seller: {
    type: Boolean,
    default: false
  },
  created: {
    type: Date,
    default: Date.now
  }
    
});

userSchema.pre('save', function(next) {                                                                                                                                       
  if(this.password && this.isModified('password')) {                                                                                                                                                     
      var salt = bcrypt.genSaltSync(10)                                                                                                                                     
      this.password  = bcrypt.hashSync(this.password, salt)                                                                                                                
  }                                                                                                                                                                          
  next()                                                                                                                                                                     
})                     

userSchema.statics.comparePassword = async (password, receivedPassword) => {
  return await bcrypt.compare(password, receivedPassword)
}

module.exports = mongoose.model('users', userSchema);