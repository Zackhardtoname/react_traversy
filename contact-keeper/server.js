//node not supporting ES6 so using 'common JA' yet (alternatively use a transpiler)
const express = require("express")

const app = express()
app.get("/", (req, res) => res.json({msg: "hello world"}))

app.use("/api/users", require("./routes/users"))
app.use("/api/auth", require("./routes/auth"))
app.use("/api/contacts", require("./routes/contacts"))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))