const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

app.get("/api", (req, res) => {
    res.json({
        message: "Hello from backend"
    })
})

app.get('*', (req, res) => {                       
    res.sendFile(path.resolve(__dirname, '../public', 'index.html'));                               
});

app.post("/upload", (req, res) => {
    setTimeout(() => {
        console.log('file uploaded')
        return res.status(200).json({ result: true, msg: 'file uploaded' });
    }, 3000);
});

app.delete("/upload", (req, res) => {
    console.log(`File deleted`)
    return res.status(200).json({ result: true, msg: 'file deleted' });
});

app.listen(3001, () => {
    console.log(`Server running on port 3001`)
});