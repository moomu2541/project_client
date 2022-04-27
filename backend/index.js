const express = require('express'),
    app = express(),
    passport = require('passport'),
    port = process.env.PORT || 80,
    cors = require('cors'),
    cookie = require('cookie')

const bcrypt = require('bcrypt')

const db = require('./database.js')
let users = db.users

require('./passport.js')

const router = require('express').Router(),
    jwt = require('jsonwebtoken')

app.use('/api', router)
router.use(cors({ origin: 'http://localhost:3000', credentials: true }))
// router.use(cors())
router.use(express.json())
router.use(express.urlencoded({ extended: false }))

let products = {
    list: [
        { id: 1, name: 'Sushi', number: 5, price: 5000, imageurl: 'https://i.pinimg.com/564x/9a/00/3b/9a003b86ee819b3c99fd0c27fa0a0ab9.jpg' },
        { id: 2, name: 'Mumi', number: 4, price: 6500, imageurl: 'https://i.pinimg.com/564x/bd/9c/93/bd9c931ca152a2323a4293ff5ad9846b.jpg' },
        { id: 3, name: 'Picky', number: 6, price: 8000, imageurl: 'https://i.pinimg.com/564x/26/c7/35/26c7355fe46f62d84579857c6f8c4ea5.jpg' },
        { id: 4, name: 'Puifay', number: 5, price: 3000, imageurl: 'https://i.pinimg.com/564x/2b/9f/d9/2b9fd97e8850f72c6960e22c9de9408c.jpg' }
        
    ]
}
let income = 0

router.post('/login', (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        console.log('Login: ', req.body, user, err, info)
        if (err) return next(err)
        if (user) {
            const token = jwt.sign(user, db.SECRET, {
                expiresIn: '1d'
            })
            // req.cookie.token = token
            res.setHeader(
                "Set-Cookie",
                cookie.serialize("token", token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV !== "development",
                    maxAge: 60 * 60,
                    sameSite: "strict",
                    path: "/",
                })
            );
            res.statusCode = 200
            return res.json({ user, token })
        } else
            return res.status(422).json(info)
    })(req, res, next)
})

router.get('/logout', (req, res) => {
    res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", '', {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            maxAge: -1,
            sameSite: "strict",
            path: "/",
        })
    );
    res.statusCode = 200
    return res.json({ message: 'Logout successful' })
})

/* GET user profile. */
router.get('/profile',
    passport.authenticate('jwt', { session: false }),
    (req, res, next) => {
        res.send(req.user)
    });

;

router.route('/products')
    .get((req, res) => res.json(products.list))
    .post((req, res) => {
        console.log(req.body)
        let newproduct = {}
        newproduct.id = (products.list.length) ? products.list[products.list.length - 1].id + 1 : 1
        newproduct.name = req.body.name
        newproduct.number = req.body.number
        newproduct.price = req.body.price
        newproduct.imageurl = req.body.imageurl
        products = { "list": [...products.list, newproduct] }
        res.json(products.list)
    })

router.route('/products/:product_id')
    .get((req, res) => {
        const product_id = req.params.product_id
        const id = products.list.findIndex(item => +item.id === +product_id)
        res.json(products.list[id])
    })
    .put((req, res) => {
        const product_id = req.params.product_id
        const id = products.list.findIndex(item => +item.id === +product_id)
        products.list[id].id = req.body.id
        products.list[id].name = req.body.name
        products.list[id].number = req.body.number
        products.list[id].price = req.body.price
        products.list[id].imageurl = req.body.imageurl
        res.json(products.list)
    })
    .delete((req, res) => {
        const product_id = req.params.product_id
        products.list = products.list.filter(item => +item.id !== +product_id)
        res.json(products.list)
    })



router.route('/income')
    .get((req, res) => res.json(income))



router.route('/purchase/:product_id')
    .delete((req, res) => {
        const product_id = req.params.product_id
        const id = products.list.findIndex(item => +item.id === +product_id)
        console.log('productID: ', product_id, 'ID: ', id)
        if (id !== -1) {
            income += products.list[id].price
            products.list = products.list.filter(item => +item.id !== +product_id)
            res.json(products.list)
        }
        else {
            res.send('Not found')

        }
    })

router.post('/register',
    async (req, res) => {
        try {
            const SALT_ROUND = 10
            const { username, email, password } = req.body
            if (!username || !email || !password)
                return res.json({ message: "Cannot register with empty string" })
            if (db.checkExistingUser(username) !== db.NOT_FOUND)
                return res.json({ message: "Duplicated user" })

            let id = (users.users.length) ? users.users[users.users.length - 1].id + 1 : 1
            hash = await bcrypt.hash(password, SALT_ROUND)
            users.users.push({ id, username, password: hash, email })
            res.status(200).json({ message: "Register success" })
        } catch {
            res.status(422).json({ message: "Cannot register" })
        }
    })

router.put('/reproducts/:product_id',
    async (req, res) => {
        const product_id = req.params.product_id
        const id = products.list.findIndex(item => +item.id === +product_id)
        if (products.list[id].number > 0)
            products.list[id].number--
        res.json(req.products)

    })

router.put('/addproduct/:product_id',
    async (req, res) => {
        const product_id = req.params.product_id
        const id = products.list.findIndex(item => +item.id === +product_id)
        products.list[id].number++
        res.json(req.products)
    })


router.get('/alluser', (req, res) => res.json(db.users.users))

router.get('/', (req, res, next) => {
    res.send('Respond without authentication');
});

// Error Handler
app.use((err, req, res, next) => {
    let statusCode = err.status || 500
    res.status(statusCode);
    res.json({
        error: {
            status: statusCode,
            message: err.message,
        }
    });
});

// Start Server
app.listen(port, () => console.log(`Server is running on port ${port}`))