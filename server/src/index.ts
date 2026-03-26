import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "./config/db";
import todoRoutes from "./routes/todo.routes";
import { sign, verify } from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? process.env.CLIENT_URL : "http://localhost:5173",
  credentials:true
}));
app.use(express.json());
app.use(cookieParser());

// Serve static files from the React app build directory
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../client/dist')));
}


const JWT_SECRET_KEY = 'TEST_KEY';

//token generation
app.post("/login", (req, res) => {
    const {username, password} = req.body;

    if(username === "admin" && password === "admin") {
        const userData = {
            userId: 1,
            username: username,
            role: "admin"

        };

        const token = sign(userData, JWT_SECRET_KEY, { expiresIn: '1h' });

        //on successful login - set cookie in a dev-friendly way
        res.cookie('token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          //maxAge: 3600000 
        });

        console.log('Set auth cookie for user', username);

        return res.status(200).json({
          token
        });
    }

    return res.status(401)
})

// logout - clears the auth cookie
app.post('/logout', (req, res) => {
  res.clearCookie('token', { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production' });
  return res.sendStatus(200);
});


const authenticate = (req: Request, res: Response, next: NextFunction) => {
  //const authHeader = req.header('Authorization');
  // Authorization: Bearer [token]
  //const token = authHeader && authHeader.split(' ')[1];

  const token = req.cookies.token;

  if (!token) {
    return res.status(401).send("unauthenticated");
  }

  try {
    const verified = verify(token, JWT_SECRET_KEY);
    //@ts-ignore
    req.user = verified;
    next();
  } catch (error) {
    res.status(403).send("unauthorized")
  }

}


app.use("/todos", authenticate, todoRoutes);

// Catch all handler: send back React's index.html file for client-side routing
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

