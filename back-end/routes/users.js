const express = require("express");
const router = express.Router();
const User = require("../models/User");


// Log in:
router.post("/login", async (req, res) => {
    console.log("user trying to login");
    console.log("nationalId", req.body.nationalId, ", password: ", req.body.password);

    await User.findOne({ nationalId: req.body.nationalId, password: req.body.password }
        , (err, user) => {

            console.log("user ", user)
            if (err) {
                console.log("err ", err);

                res.json({ succeed: false, user: "user not found" })
            }
            else if (user) {
                console.log("usesr", user);

                res.json({ succeed: true, user: user })
            } else {
                res.json({ succeed: false, user: "user not found" })
            }
        })
});

//Get All
router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//Get One
router.get("/:id", getUser, (req, res) => {
    res.json(res.user);
});

//Create One
router.post("/", async (req, res) => {
    // const { firstname, lastname, nationalId, assaignHostpital, password, radiusInMeter, } = req.body;
    const user = new User(req.body);
    try {
        const newUser = await user.save();
        res.status(201).json({ newUser });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//Patch One
router.patch("/:id", getUser, async (req, res) => {
    if (req.body.firstname != null) {
        res.user.firstname = req.body.firstname;
    }
    if (req.body.lastname != null) {
        res.user.lastname = req.body.lastname;
    }
    try {
        const updatedUser = await res.user.save();
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//Put One
router.put("/:id", getUser, async (req, res) => {
    try {
        const updatedUser = await res.user.set(req.body);
        res.user.save()
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//Delete One
router.delete("/:id", getUser, async (req, res) => {
    try {
        await res.user.deleteOne();
        res.json({ message: "User has been deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add violation
router.patch('/:id/violations', getUser, async (req, res) => {
    try {
        res.user.violations.push(req.body.violations);
        await res.user.save();
        return res.json(req.user.violations)
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
})

// Delete Violation by id.
router.delete("/:id/:violationId", getUser, async (req, res) => {
    console.log("req.params.violationId ", req.params.violationId);
    try {
        res.user.violations = res.user.violations.filter(violation => violation._id != req.params.violationId)

        res.user.save()
        return res.json(res.user)
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
})

// Add user temperature record.
router.patch('/:id/temperature', getUser, async (req, res) => {
    try {
        res.user.userTemperature.push(req.body.userTemperature);
        await res.user.save();
        return res.json(res.user.userTemperature)
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
})

//getUser middleware
async function getUser(req, res, next) {
    let user;
    try {
        user = await User.findById(req.params.id);
        if (user == null) {
            return res.status(404).json({ message: "Cannot find User" });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.user = user;
    next();
}

module.exports = router;