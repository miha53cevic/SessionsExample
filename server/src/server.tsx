import express from 'express';
import session from 'express-session';
import cors from 'cors';

const app = express();

// Bitno dodati jer je prek heroku ima proxy ispred koji je https, a sa node serverom
// razgovara sa http, pa je bitno staviti jer inace ne mozemo cookie slat
app.set("trust proxy", 1);
// Bitno jer frontend i backend nisu na istoj domeni (cross-site)
app.use(cors({ origin: true, credentials: true }));
// Use new express middleware instead of bodyParser package (for reqeust.body - json data), inace je body prazan uvijek
app.use(express.json());

app.use(session({
    name: 'sid',    // cookie se salje s vrijednosti sid(session id)
    secret: 'the greatest secret of them all',
    resave: false,  // uvijek ponovno spremi session iako se nije promjenil nijedan podatak
    saveUninitialized: false,   // spremi session iako jos nije nista promjenjeno na njoj, primjer korisnik se jos nije logiral, a i dalje ga pratimo prije
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // cookie is valid for 24h
        secure: false,    // secure mora biti https konekcija
        httpOnly: process.env.NODE_ENV === 'production',  // don't allow cookies to be read with javascript on the client
    }
}));

// Index route
app.get('/', (req, res) => {
    res.send(`<h1>Running on port: ${port}</h1>`);
});

// Usersi koji postoje u "bazi"
const users = [
    { username: "Bob" },
    { username: "User" },
    { username: "Mihael" },
];

// Login route
app.post('/login', (req, res) => {
    const data = req.body;

    if (!data || !data.username)
        return res.status(422).send({ error: "Missing username property on body!" });

    // Check if user exists
    if (!users.some(user => user.username === data.username))
        return res.sendStatus(401);

    req.session.username = data.username;    // create session
    return res.sendStatus(200);
});

// User route
app.get('/user', (req, res) => {
    if (!req.session.username) 
        return res.status(401).send({ error: "Not logged in!" });
    else return res.send({ username: req.session.username });
});

// Logout route
app.get('/logout', (req, res) => {
    if (!req.session.username) {
        res.status(401).send({ error: "Not logged in!" });
        return;
    } else {
        req.session.destroy((err) => {
            console.log(err);
            res.sendStatus(200);
        })
    };
});

// Default route (404 not found)
app.use((req, res) => {
    res.sendStatus(404);
})

// Slusaj na port koji je dan od heroku ili na 3001 ako je development ili nije unaprijed zadano od servera
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Running on port ${port}`);
});