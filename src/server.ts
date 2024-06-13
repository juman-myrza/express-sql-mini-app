import App from './app'
import AuthRoute from './routes/authRoutes'
import FileRoute from './routes/fileRoutes'

const app = new App([new AuthRoute(), new FileRoute()])

app.listen()
