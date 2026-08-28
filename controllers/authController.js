const db = require("../config/db");


const adminLogin = async (req, res) => {

    try {

        const { username, password } = req.body;


        const [admin] = await db.query(
            "SELECT * FROM admins WHERE username=? AND password=?",
            [username, password]
        );


        if (admin.length === 0) {

            return res.status(401).json({
                error: "Invalid username or password"
            });

        }


        res.json({

            message: "Login Successful",

            admin: {
                id: admin[0].id,
                username: admin[0].username
            }

        });


    } catch(error) {

        res.status(500).json({
            error: error.message
        });

    }

};


module.exports = {
    adminLogin
};