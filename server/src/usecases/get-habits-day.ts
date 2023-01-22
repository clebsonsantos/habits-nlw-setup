import dayjs from "dayjs";
import { FastifyRequest } from "fastify";
import { z } from "zod"
import { prisma } from "../lib/prisma"

export async function getHabitsDay(request: FastifyRequest) {
  const getDayParams = z.object({
    date: z.coerce.date()
  })
  const { date } = getDayParams.parse(request.query)
  const parseDate = dayjs(date).startOf("day")
  const weekDay = parseDate.get("day")

  const possibleHabits = await prisma.habit.findMany({
    where: {
      created_at: {
        lte: date
      },
      weekDays: {
        some: {
          week_day: weekDay
        }
      }
    }
  })

  const day = await prisma.day.findUnique({
    where: {
      date: parseDate.toDate()
    },
    include: {
      dayHabits: true
    }
  })
  
  const completedHabits = day?.dayHabits.map(habit => {
    return habit.habit_id
  }) ?? []

  return {
    possibleHabits,
    completedHabits
  }
}