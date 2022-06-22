const express = require('express')
const app = express()
const router = require('./router/index.js')
const db = require('./db/config')
const cors = require('cors')
const path = require('path');
const multer = require("multer");

//engine
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use("/images", express.static(path.join(__dirname, "public/images")));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  })

const upload = multer({ storage: storage });

app.post("/book/upload", upload.single("file")
, (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.status(200).json("File has been uploaded");
}
);
//init router
router(app)

//connect mongodb
db.connect()


//listen port
app.listen(5000, () => {
    console.log("Server is running at 8000")
})