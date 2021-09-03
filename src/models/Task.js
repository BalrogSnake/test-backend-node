import { Schema, model } from "mongoose";

const taskSchema = new Schema(
  {
    id_user: String,
    name: String,
    state: Boolean,
    description: String,
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export default model("Task", taskSchema);