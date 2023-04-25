import express, { Request, Response } from "express";
import mongoose, { Document, Model } from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

interface ITodo extends Document {
  title: string;
  completed: boolean;
}

const app = express();
const port = 8000;

// Todo model
const todoSchema = new mongoose.Schema({
  title: String,
  completed: Boolean,
});

const Todo: Model<ITodo> = mongoose.model<ITodo>("Todo", todoSchema);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/todos", async (req: Request, res: Response): Promise<void> => {
  const todos: ITodo[] = await Todo.find();
  res.json(todos);
});

app.post("/todos", async (req: Request, res: Response): Promise<void> => {
  const { todo } = req.body;
  console.log(todo);
  const newTodo: ITodo = new Todo({ title: todo });
  await newTodo.save();
  res.json(newTodo);
});

app.delete("/todos/:id", async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  await Todo.findByIdAndDelete(id);
  res.json({ message: "Todo deleted successfully" });
});

mongoose.set("strictQuery", true);
// connect to the database
mongoose
  .connect(`${process.env.MONGO_URI}`)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server started at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
