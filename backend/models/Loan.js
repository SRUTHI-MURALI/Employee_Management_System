import { model, Schema } from "mongoose";

const loanSchema = new Schema({
    amount: {
        type: 'integer',
        required: true
      },
  
      installment: {
        type: 'integer',
        required: true
      },
  
      date: {
        type: 'date',
        required: true
      },
  
      description: {
        type: 'text',
        defaultsTo: 'N/A'
      },
  
      unit: {
        type: 'string',
        enum: ['BAM', '$'],
        defaultsTo: 'BAM'
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

export default model("loan", loanSchema);
