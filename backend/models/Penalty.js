import { model, Schema } from "mongoose";

const penaltySchema = new Schema({
    amount: {
        type: 'integer',
        required: true
      },
  
      unit: {
        type: 'string',
        enum: ['%', 'BAM'],
        defaultsTo: '%'
      },
  
      date: {
        type: 'date',
        required: true
      },
  
      description: {
        type: 'text'
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

export default model("penalty", penaltySchema);
