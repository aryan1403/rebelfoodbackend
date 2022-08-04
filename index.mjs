import sendM from "./sendMail.mjs";
import express from "express";
import {SaveUserCreds, isLogin} from "./db.mjs";

const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.post('/register', async (req, res) => {
    const body = req.body;
    
    await sendM('aryankumar14032006@gmail.com', 12345).then((data) => {
        console.log(data);
        res.end(JSON.stringify(data));
    });
});

app.post('/login', async (req, res) => {
    const body = req.body;

    await isLogin(body.email, body.pass).then(data => {
        console.log(data);
        res.end(JSON.stringify(data));
    });
})

app.post('/saveCreds', async (req, res) => {
    const body = req.body;
    await SaveUserCreds(body.email, body.pass).then(() => {
        console.log('Saved Credentials successfully!');
        res.end(JSON.stringify({
            status: 200,
            msg: 'Saved Credentials successfully!',
        }));
    });
});

app.listen(PORT, () => console.log(`Server Started on PORT:${PORT}`));