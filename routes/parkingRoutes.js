const express = require("express");
const router = express.Router();

const {
    entryParking,
    exitParking,
    getParkingLogs
} = require("../controllers/parkingController");


router.post("/entry", entryParking);

router.put("/exit/:uid", exitParking);

router.get("/", getParkingLogs);


module.exports = router;