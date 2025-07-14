import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {

    title: { type: String, required: true },
    description: { type: String },
    group: { type: mongoose.Schema.Types.ObjectId, ref: "Group", required: true },
    dueDate: { type: Date, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Admin
  },
  { timestamps: true }
);

export const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);

