const express = require('express');
var router = express.Router();
var con = require('../db')

// => localhost:3000/students/
router.get('/', (req, res) => {
    con.connect(function(error){
        if(error) throw error;
        
        con.query("SELECT * FROM students",(err, doc) => {
            if (!err) { res.send(doc); }
            else { console.log('Error in retrieving Students:' + JSON.stringify(err, undefined, 2)); }
        });
    });
});

router.get('/:id', (req, res) => {
    const studentId = req.params.id;
    var q = "SELECT * FROM students WHERE id = ?"
        con.query(q,[studentId], (err, doc) => {
            if (!err) { res.send(doc); }
            else { console.log('Error in retrieving Students:' + JSON.stringify(err, undefined, 2)); }
    });
});

router.post('/', (req, res) => {
         
    const q = "INSERT INTO students (`id`, `name`, `class`) VALUES (?)"

    const values =[
        req.body.id,
        req.body.name,
        req.body.class]
    con.query(q,[values], (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Students insert :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.put('/:id', (req, res) => {
    const studentId = req.params.id;
    
    var q = "UPDATE students SET `name` = ?, `class` = ? WHERE id = ?";

        values = [
            req.body.name,
            req.body.class
        ]

   
        con.query(q, [...values, studentId], (err, data) => {
            if (err) return res.json(err);
            return res.json("Student has been updated successfully.")
    });
});
router.delete('/:id', (req, res) => {
    
        const studentId = req.params.id;

        var q = "DELETE FROM students where id=?";

   
        con.query(q, [studentId], (err, data) => {
            if (err) return res.json(err);
            return res.json("Student has been deleted successfully.")
    });
});

router.delete('/', (req, res) => {
    con.connect(function(error){
        if(error) throw error;
        console.log('connected...');
    var q = "TRUNCATE TABLE students ";

    con.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json("Student has been truncated successfully.")
    });
});
});


module.exports = router;