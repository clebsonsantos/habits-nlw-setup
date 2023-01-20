import { FastifyInstance } from "fastify"
import { createHabit } from "./usecases/create-habit"
import { getHabitsDay } from "./usecases/get-habits-day"
import { toggleHabitCompleted } from "./usecases/toggle-habit-completed"
import { summary } from "./usecases/summary"

export async function appRoutes(app: FastifyInstance) {
  app.post("/habits", createHabit)

  app.get("/day", getHabitsDay)

  app.patch("/habits/:id/toggle", toggleHabitCompleted)

  app.get("/summary", summary)
}