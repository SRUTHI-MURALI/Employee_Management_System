import { model, Schema } from "mongoose";

const employeeSchema = new Schema({
    name: {
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

export default model("employee", employeeSchema);
