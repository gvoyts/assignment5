// Create express app
//https://developerhowto.com/2018/12/29/build-a-rest-api-with-node-js-and-express-js/
var express = require("express")
var app = express()
var db = require("./database.js")
var flowers = require('./flowersDB.js')
var md5 = require("md5")
var cors = require("cors");

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Server port
var HTTP_PORT = 8000 
// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});
// Root endpoint
app.get("/", (req, res, next) => {
    res.json({"message":"Ok"})
});

app.get("/api/users", (req, res, next) => {
    var sql = "select * from user"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
});

app.get("/api/user/:id", (req, res, next) => {
    var sql = "select * from user where id = ?"
    var params = [req.params.id]
    db.get(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":row
        })
      });
});

app.post("/api/user/", (req, res, next) => {
    console.log("post recdeived");
    console.log(req.body);
    var errors=[]
    if (!req.body.password){
        errors.push("No password specified");
    }
    if (!req.body.email){
        errors.push("No email specified");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }
    var data = {
        name: req.body.name,
        email: req.body.email,
        password : md5(req.body.password)
    }
    var sql ='INSERT INTO user (name, email, password) VALUES (?,?,?)'
    var params =[data.name, data.email, data.password]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id" : this.lastID
        })
    });
})

app.patch("/api/user/:id", (req, res, next) => {
    var data = {
        name: req.body.name,
        email: req.body.email,
        password : req.body.password ? md5(req.body.password) : null
    }
    db.run(
        `UPDATE user set 
           name = COALESCE(?,name), 
           email = COALESCE(?,email), 
           password = COALESCE(?,password) 
           WHERE id = ?`,
        [data.name, data.email, data.password, req.params.id],
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({
                message: "success",
                data: data,
                changes: this.changes
            })
    });
})

app.delete("/api/user/:id", (req, res, next) => {
    db.run(
        'DELETE FROM user WHERE id = ?',
        req.params.id,
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({"message":"deleted", changes: this.changes})
    });
})

app.get("/flowers", (req, res, next) => {
    flowers.all("select distinct comname as name from flowers", (err, rows) => {
        console.log(rows);
        const allsightings = rows.map(e => e.name);
        console.log(allsightings);
        res.send(allsightings);
      });
    // var sql = "select distinct comname as name from flowers"
    // var params = []
    // flowers.all(sql, params, (err, rows) => {
    //     if (err) {
    //       res.status(400).json({"error":err.message});
    //       return;
    //     }
    //     res.json({
    //         "message":"success",
    //         "data":rows
    //     })
    //   });
    //   console.log(res);
});

app.get("/sightings/:name", (req, res, next) => {


});


app.get("/sightings", (req, res, next) => {
    // replace Draperia with the input from the user about which flower they want sightings information on
    var sql = "select * from sightings s WHERE s.name = ? ORDER BY s.sighted DESC LIMIT 10" // will eb a problem if not in date order? sort by?
    var params = 'Draperia'; //[req.body.name]
    console.log("sightings/name has been used");
    flowers.all(sql, params, (err, rows) => {
        rows.forEach((row) => {
            console.log(row);
          });
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        // res.json({
        //     "message":"success",
        //     "data":rows
        // })
        res.send(rows);
      });
});

app.post("/flowers", (req, res, next) => {
    console.log("post received");
    console.log(req.body);
    var errors=[]   
    // will be set to question marks after to take in user input from front end
    // needs to be tested 
    
    // [req.param.genus, req.param.species, req.param.comname]; // have hardcode for testing purposes then change to user input after
    var data = {
        name: "req.body.name,",
        person: "mm",
        location: "nn",
        sighted: "date"
    }

    var sql ='INSERT INTO sightings (name, person, location, sighted) VALUES (?,?,?,?)';
    var params = [data.name, data.person, data.locationm, data.sighted];

    flowers.run(sql, params, function (err, result) {
            if (err){
                res.status(400).json({"error": err.message})
                return;
            }
            res.json({
                "message": "success",
                "data": data,
                "id" : this.lastID
            })
        });
    });

    // update flowers table, not tested
    app.patch("/flowers", (req, res, next) => {
        console.log("patch received");
        console.log(req.body);
        var errors=[]   
        // will be set to question marks after to take in user input from front end
        // needs to be tested 
     
        var data = { 
            genus: "A",
            species: "B",
            comname: "death camas" //req.body.comname
        }
        var sql = 'UPDATE flowers set genus = ?, species = ? WHERE comname LIKE ?';
        var params = [data.genus, data.species, data.comname];

        flowers.run(sql, params, function (err, result) {
                if (err){
                    res.status(400).json({"error": err.message})
                    return;
                }
                res.json({
                    "message": "success",
                    "data": data,
                    "id" : this.lastID
                })
            });
        });

// Insert here other API endpoints

// Default response for any other request
app.use(function(req, res){
    res.status(404);
});
