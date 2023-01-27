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

app.post("/select", (req, res) => {
    return res.status(200).json({ result: true, msg: 'file selected'});
});

app.post("/upload", (req, res) => {
        let fileIndex = 1;
        console.log(req.files.file)
        // if (fs.existsSync(`img/${req.body.name}${req.files.file.name}`)) {
        //     fs.rmdir(`img/${req.body.name}${req.files.file.name}`, err => {
        //         if(err) throw err;
        //         console.log('Folder deleted');
        //     });
        // };

        // fs.mkdir(`img/${req.body.name}${req.files.file.name}`, err => {
        //     if(err) throw err; 
        //     console.log('Folder created');
        // });

        function fileRecorder () {
            if (fs.existsSync(`img/${req.files.file.name}File${fileIndex}.${req.files.file.mimetype.slice(req.files.file.mimetype.lastIndexOf('/') + 1)}`)) {
                fileIndex++
                fileRecorder ()
            } else {
                fs.appendFile(`img/${req.files.file.name}File${fileIndex}.${req.files.file.mimetype.slice(req.files.file.mimetype.lastIndexOf('/') + 1)}`, req.files.file.data, function(){})
            }
        }

        fileRecorder ();

        // fs.appendFile(`img/${req.body.name}File${fileIndex}.${req.files.file.mimetype.slice(req.files.file.mimetype.lastIndexOf('/') + 1)}`, req.files.file.data, function(){})
        return res.status(200).json({ result: true, msg: 'file uploaded'});
});

app.delete("/upload", (req, res) => {
    console.log(`File deleted`)
    return res.status(200).json({ result: true, msg: 'file deleted' });
});

app.listen(process.env.PORT || 3001, () => {
    console.log(`Server running on port 3001`)
});