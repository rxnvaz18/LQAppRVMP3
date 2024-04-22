import { cleanEnv } from "envalid"
import { port, str } from "envalid/dist/validators"

export default cleanEnv(process.env, {
    REACT_APP_MONGODB_URI: str(),
    PORT: port(),
    SESSION_SECRET: str(),
    GOOGLE_BOOKS_API_KEY: str()
})