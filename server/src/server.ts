import Fastify from "fastify"
import cors from "@fastify/cors"
import { appRoutes } from "./routes"
const app = Fastify()

app.register(cors)
app.register(appRoutes)

const PORT = 3333
app.listen({
  port: PORT
}).then(() => {
  console.log('[FASTFY] SERVER RUNNING') 
  console.log('[FASTFY] PROCESS PORT '.concat(PORT.toString())) 
})