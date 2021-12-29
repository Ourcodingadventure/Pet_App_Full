const express = require("express");
const morgan = require(`morgan`);
const cors = require(`cors`);
const socketIo = require("socket.io");
const { authenticateAdmin, sessionAuth } = require(`./middleware`);
const validatePetProperties = require(`./middleware/addpet/validatePetProperties`);
const getPets = require(`./controller/getPets`);
const createPet = require("./controller/createPet");
const cookieParser = require("cookie-parser");
const editPet = require(`./controller/editPet`);
const logout = require(`./controller/logout`);
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/userRoutes");
const { PORT } = require("./config");
const getPetById = require("./controller/getPetById");
const getUsers = require("./controller/getUsers");
const multer = require("multer");
const http = require("http");
const fs = require("fs");
const path = require("path");
const socketApp = require("./web-socket");

//make into function and export/import
const storage = multer.diskStorage({
  // https://www.npmjs.com/package/multer#diskstorage
  destination: "./uploads/",
  filename: function (req, file, cb) {
    cb(
      null,
      `${new Date().getTime()}-${file.filename}.${file.mimetype.split("/")[1]}`
    );
  },
});
let upload = multer({ storage: storage });

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: ["http://localhost:3000", "https://jordans-pet-agency.herokuapp.com"],
});
module.exports = { io };
const petRoutes = require("./routes/petRoutes");
const { MessageModel } = require("./models");

app.use("/", express.static(path.resolve(path.join(__dirname, "./uploads"))));

//middlewares
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://jordans-pet-agency.herokuapp.com",
    ],
    credentials: true,
  })
);

socketApp(io);

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
//anyone can use these
app.get("/messages", (req, res) => {
  MessageModel.find({}, (err, messages) => {
    if (!err && messages) {
      res.status(200).send({
        message: "message successfully",
        messages,
      });
    } else {
      res.status(500).send({
        message: "server error" + err,
      });
    }
  });
});
app.use("/auth", authRoutes);
app.get("/pets", getPets);
app.get("/pet/:id", getPetById);
//starts authentication
app.use(sessionAuth);

//pet routes
app.use(petRoutes);
//user Routes
app.use(userRoutes);

//todo admin router?
app.post(
  "/add-pet",
  authenticateAdmin,
  upload.any(),
  // validatePetProperties,
  createPet
);
app.put("/edit-pet/:id", authenticateAdmin, upload.any(), editPet);
app.get("/users", getUsers);
app.post("/logout", logout);
server.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});

//depricated
// app.get("/user/:id/full", getUserAndCart);

//Todo notes from code review
// imagekit-- for files cdn
