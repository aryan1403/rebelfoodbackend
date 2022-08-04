import sendM from "./sendMail.mjs";
import express from "express";
import {SaveUserCreds, isLogin} from "./db.mjs";

const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post('/register', async (req, res) => {
    const body = JSON.parse(JSON.stringify(req.body));
    res.header("Access-Control-Allow-Origin", "*");
    await sendM(body.email, 12345).then((data) => {
        console.log(data);
        res.end(JSON.stringify(data));
    });
});

app.post('/login', async (req, res) => {
    const body = req.body;
    res.header("Access-Control-Allow-Origin", "*");

    await isLogin(body.email, body.pass).then(data => {
        console.log(data);
        res.end(JSON.stringify(data));
    });
})

app.post('/saveCreds', async (req, res) => {
    const body = req.body;
    res.header("Access-Control-Allow-Origin", "*");
    await SaveUserCreds(body.email, body.pass).then(() => {
        console.log('Saved Credentials successfully!');
        res.end(JSON.stringify({
            status: 200,
            msg: 'Saved Credentials successfully!',
        }));
    });
});

app.listen(PORT, () => console.log(`Server Started on PORT:${PORT}`));