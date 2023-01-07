const express = require('express');
const fileupload = require("express-fileupload");
const cors = require('cors');
const fs = require("fs");

const app = express();

app.use(fileupload());
app.use(cors());

app.get("/api", (req, res) => {
    res.json({
        message: "Hello from backend"
    })
})

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../img', 'index.html'));
});

app.post("/upload", (req, res) => {
    setTimeout(() => {
        console.log('file uploaded')
        return res.status(200).json({ result: true, msg: 'file uploaded' });
    }, 3000);
});

app.post("/select", (req, res) => {
    setTimeout(() => {
        console.log('file selected')
        console.log(req.body.name);
        fs.appendFile(`img/${req.body.name}`, req.files.file.data, function(){})
        return res.status(200).json({ result: true, msg: 'file selected' });
    }, 3000);
});

app.delete("/upload", (req, res) => {
    console.log(`File deleted`)
    return res.status(200).json({ result: true, msg: 'file deleted' });
});

app.listen(process.env.PORT || 3001, () => {
    console.log(`Server running on port 3001`)
});