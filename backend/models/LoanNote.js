import { model, Schema } from "mongoose";

const loanNoteSchema = new Schema({
    date: {
        type: 'date',
        required: true
      },
  
      description: {
        type: 'text',
        defaultsTo: ''
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

export default model("loanNote", loanNoteSchema);
