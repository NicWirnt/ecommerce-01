import express from "express";
import { encryptPassword } from "../helpers/bcrypthelper.js";
import { newAdminValidation } from "../middlewares/joi-validation/joiHelper.js";
import { insertAdmin } from "../models/admin/Admin.models.js";
import { v4 as uuidv4 } from 'uuid';
import { sendMail } from "../helpers/mailHelper.js";


const router = express.Router();

//get admin
router.get("/", (req, res) => {
    res.json({
        status: "success",
        messaege: "GET method caled",
    })
})

router.post("/", newAdminValidation, async (req, res, next) => {
    try {
        const hashPassword = encryptPassword(req.body.password);
        req.body.password = hashPassword;

        req.body.emailVerification = uuidv4();

        const result = await insertAdmin(req.body);

        console.log(result);

        if (result?._id) {
            const url = `${process.env.ROOT_URL}/admin/verify-email/?c=${result.emailVerification}&e=${result.email}`;
            console.log(url);

            sendMail({ fName: result.fName, url })

            res.json({
                status: "success",
                messaege: "Admin created successfully",
            })
        } else {
            res.json({
                status: "error",
                message: "unable to create new admin, please try again later or contact admin"
            })
        }

    } catch (error) {
        error.status = 500;
        if (error.message.includes("E11000 duplicate key")) {

            error.message = "Email already exist"
            error.status = 200;

        }

        next(error);

    }

})

router.patch("/", (req, res) => {
    res.json({
        status: "success",
        messaege: "Patch method called",
    })
})

export default router;