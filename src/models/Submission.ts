import mongoose from "mongoose";
const submissionSchema = new mongoose.Schema(
  {
    task: { type: mongoose.Schema.Types.ObjectId, ref: "Task", required: true },
    student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    admin: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }],

    pdfUrl: { type: String, required: true },
    submittedAt: { type: Date, default: Date.now },
    points: { type: Number, min: 0, max: 10 },
    feedback: { type: String },
  },
  { timestamps: true }
);

export const Submission =
  mongoose.models.Submission || mongoose.model("Submission", submissionSchema);
