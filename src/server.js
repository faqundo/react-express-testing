require ("babel-register")({
    presets: ["react"]
})

const express = require("express");
const mysql = require("mysql");
const app = express();


const React = require("react"); 
const ReactDOMServer = require("react-dom/server");

const component = require("./component.jsx"); // normalmente la llamamos App ( es REACT)

app.get("/",(req,res)=>{
    var html = ReactDOMServer.renderToString(
        React.createElement(component)
    );
    res.send(html);
});

app.get("/usuarios",(req,res)=>{
    let conexion = mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"",
        database:"cookipad",
        port: 3306
    });
    conexion.connect((err)=>{
        if (err) throw err;
        res.send("Conexión exitosa");
        conexion.query("SELECT * FROM usuarios", (err,result,filds)=>{
            if (err) throw err;
            console.log(result);
        })
    })
});


app.listen(3001, ()=>{
    console.log("Escuchando desde el puerto: 3001");
});