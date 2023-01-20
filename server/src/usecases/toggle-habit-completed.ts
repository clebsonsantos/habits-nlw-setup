import dayjs from "dayjs";
import { FastifyRequest } from "fastify";
import { z } from "zod"
import { prisma } from "../lib/prisma"

export async function toggleHabitCompleted(request: FastifyRequest) {
  const toggleHabitsParams = z.object({
    id: z.string().uuid()
  })
  const { id } = toggleHabitsParams.parse(request.params)

  const today = dayjs().startOf('day').toDate()

  let day = await prisma.day.findUnique({
    where: {
      date: today
    }
  })

  if (!day) {
    day = await prisma.day.create({
      data: {
        date: today
      }
    })
  }

  const dayHabit = await prisma.dayHabit.findUnique({
    where: {
      day_id_habit_id: {
        day_id: day.id,
        habit_id: id
      }
    }
  })

  if (dayHabit) {
    await prisma.dayHabit.delete({
      where: {
        id: dayHabit.id
      }
    })
  } else {
    await prisma.dayHabit.create({
      data: {
        day_id: day.id,
        habit_id: id
      }
    })
  }
}