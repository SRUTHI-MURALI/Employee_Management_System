import { model, Schema } from "mongoose";

const bonusSchema = new Schema({
    amount: {
        type: 'integer',
        required: true
      },
  
      date: {
        type: 'date',
        required: true
      },
  
      description: {
        type: 'text'
      },
  
      isRepeating: {
        type: 'boolean',
        required: true,
        defaultsTo: false
      },
  
      employeeJMBG: {
        type: 'string',
        required: true
      },
      createdAt: {
        type: Date,
        required: true,
        default: Date.now,
      },
      updatedAt: {
        type: Date,
        required: true,
        default: Date.now,
      },
});

export default model("bonus", bonusSchema);
