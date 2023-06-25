const express = require('express');
const fileupload = require("express-fileupload");
const cors = require('cors');
const fs = require("fs");
const { response } = require('express');

const app = express();

app.use(fileupload());
app.use(cors());

app.get("/api", (req, res) => {
    res.json({
        message: "Hello from backend"
    })
})

app.get("/getinfo", (req, res) => {
    return res.sendFile(path.resolve(__dirname, '../img', 'Project0Task3File1'));
    // return res.send({text: 'connected '})
});

app.post("/select", (req, res) => {
    return res.status(200).json({ result: true, msg: 'file selected'});
});

app.post("/upload", (req, res) => {
        let fileIndex = 1;
        let fileName = req.files.file.name;
        let fileExtension = req.files.file.name.slice(req.files.file.name.lastIndexOf('.'));
        let fileExtensionIndex = req.files.file.name.lastIndexOf(fileExtension);

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
            fileName = fileName.split('').slice(0, fileExtensionIndex).join('') + `File${fileIndex}` + fileExtension
            if (fs.existsSync(`img/${fileName}`)) {
                fileIndex++
                fileRecorder ()
            } else {
                fs.appendFile(`img/${fileName}`, req.files.file.data, function(){})
            }
        }

        fileRecorder ();
        return res.status(200).json({ result: true, msg: 'file uploaded'});
});

app.delete("/upload", (req, res) => {
    console.log(`File deleted`)
    return res.status(200).json({ result: true, msg: 'file deleted' });
});

app.listen(process.env.PORT || 3001, () => {
    console.log(`Server running on port 3001`)
});