const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");

const dbConfig = require("./app/config/db");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "ejemplo-session",
    secret: "COOKIE_SECRET", // should use as secret environment variable
    httpOnly: true
  })
);

/**
 * database configuration
 */

 const db = require("./app/models");
 const Role = db.role;
 
 db.mongoose.connect('mongodb://' + dbConfig.USERNAME + ':' + dbConfig.PASSWORD + '@' + dbConfig.HOST +':' + dbConfig.PORT + '/' + dbConfig.DB + '?authSource=admin', {
     useNewUrlParser: true,
     useUnifiedTopology: true
   })
   .then(() => {
     console.log("Successfully connect to MongoDB.");
     initial();
   })
   .catch(err => {
     console.error("Connection error", err);
     process.exit();
   }); 

/**
 * restringir accesos
 */
const allowlist = [''];

const corsOptionsDelegate = (req, callback) => {
    let corsOptions;

    let isDomainAllowed = allowlist.indexOf(req.header('Origin')) !== -1;
    if (isDomainAllowed) {
        // Enable CORS for this request
        corsOptions = { origin: true }
    } else {
        // Disable CORS for this request
        corsOptions = { origin: false }
    }
    callback(null, corsOptions)
}

app.use(cors(corsOptionsDelegate));

/**
 * lista de rutas
 */
 require("./app/routes/auth")(app);
 require("./app/routes/user")(app);

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Bienvenidos al ejemplo" });
});

// set port, listen for requests
const PORT = process.env.PORT || 9090;
app.listen(PORT, () => {
  console.log('Ejecutandose en el puerto ' + PORT);
});


function initial() {
    Role.estimatedDocumentCount((err, count) => {
      if (!err && count === 0) {
        new Role({
          name: "user"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'user' to roles collection");
        });
  
        new Role({
          name: "moderator"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'moderator' to roles collection");
        });
  
        new Role({
          name: "admin"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'admin' to roles collection");
        });
      }
    });
  }