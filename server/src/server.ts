import Fastify from "fastify"
import cors from "@fastify/cors"
import { appRoutes } from "./routes"
const app = Fastify()

app.register(cors)
app.register(appRoutes)

const PORT = 3333
app.listen({
  port: PORT,
  host: '0.0.0.0'
}).then((url) => {
  console.log('[FASTFY] SERVER RUNNING') 
  console.log('[FASTFY] PROCESS URL '.concat(url)) 
})