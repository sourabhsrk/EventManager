const mongoose = require('mongoose');
const { Schema } = mongoose;

const EventSchema = new Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  eid:{
    type: Number,
    require: true,
    unique: true
  },
  title:{
    type: String,
    require: true
  },
  description:{
    type: String,
    require: true
  },
  tag:{
    type: String,
    default: 'cultural'
  },
  dateTime:{
    type: Date,
    default: Date.now
  },
  venue:{
    type: String,
    require: true
  },
  image:{
    data: Buffer, 
    contentType: String 
  }
});

module.exports  = mongoose.model('events', EventSchema);