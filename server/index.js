const express = require('express')
const path = require('path')

const app = express()
const port = 3000 || process.env.PORT
const buildPath = path.join(__dirname, '../build')

app.use(express.static(buildPath))
app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.all('*', (req,res) => {
    res.sendFile(buildPath)
})

app.listen(port, () => {
    console.log('Listering at PORT', port)
})