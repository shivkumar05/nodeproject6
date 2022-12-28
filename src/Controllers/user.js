const battingModel = require("../Models/battingModel")
const bowlingModel = require("../Models/bowlingModel")
const wicketModel = require("../Models/wicketModel")
const filterBowling = require("../Models/filterBowling")
const filterBatting = require("../Models/filterBatting")
const bow_batModel = require("../Models/bow_batModel")
const userModel = require("../Models/userModel")
const drillModel = require("../Models/drillsModel")
const profileModel = require("../Models/profile")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")


const createUser = async function (req, res) {
    try {
        let data = req.body;
        let { name, phone, join_as, signup_as, email, password } = data

        if (await userModel.findOne({ phone: phone }))
            return res.status(400).send({ message: "Phone already exist" })

        if (await userModel.findOne({ email: email }))
            return res.status(400).send({ message: "Email already exist" })

        const encryptedPassword = bcrypt.hashSync(password, 12)
        req.body['password'] = encryptedPassword;

        let savedData = await userModel.create(data)
        res.status(201).send({ status: true, data: savedData })
    }
    catch (err) {
        res.status(500).send({ status: false, error: err.message })
    }
};

const userLogin = async function (req, res) {
    try {
        let data = req.body
        let { email, password } = data

        let user = await userModel.findOne({ email: email })
        if (!user) {
            return res.status(400).send({
                status: false,
                msg: "Email and Password is Invalid"
            })
        }

        let compared = await bcrypt.compare(password, user.password)
        if (!compared) {
            return res.status(400).send({
                status: false,
                message: "Your password is invalid"
            })
        };
        // let getStatus = await profileModel.findOne();
        // if(getStatus == 0){
        //    result = "No"
        // }
        // else{
        //    result= "Yes"
        // };

        let token = jwt.sign({
            userId: user._id,
        }, "project",

        )
        return res.status(200).send({
            status: true,
            msg: "User login successfull",
            data: {
                userId: user._id,
                name: user.name,
                phone: user.phone,
                join_as: user.join_as,
                signup_as: user.signup_as,
                email: user.email,
                password: user.password,
                token: token
            }
        })
    }
    catch (error) {
        return res.status(500).send({
            status: false,
            msg: error.message
        })
    }
};

const createBattings = async function (req, res) {
    try {
        let data = req.body
        //***********check if the body is empty**************//
        if (Object.keys(data).length == 0) {
            return res.status(400).send({
                status: false,
                message: "Body should  be not Empty please enter some data to create batting"
            })
        }
        const battingCreated = await battingModel.create(data)

        return res.status(201).send({
            status: true,
            message: "Battings created successfully",
            data: battingCreated
        })
    }
    catch (error) {
        return res.status(500).send({
            status: false,
            message: error.message
        })
    }
};
// ========================================================================================

const createBowlings = async function (req, res) {
    try {

        let data = req.body
        //***********check if the body is empty**************//
        if (Object.keys(data).length == 0) {
            return res.status(400).send({
                status: false,
                message: "Body should  be not Empty please enter some data to create Bowlings"
            })
        }
        const bowlingCreated = await bowlingModel.create(data)

        return res.status(201).send({
            status: true,
            message: "Bowling created successfully",
            data: bowlingCreated
        })
    }
    catch (error) {
        return res.status(500).send({
            status: false,
            message: error.message
        })
    }
};
// ==============================================================================
const createWickets = async function (req, res) {
    try {

        let data = req.body
        //***********check if the body is empty**************//
        if (Object.keys(data).length == 0) {
            return res.status(400).send({
                status: false,
                message: "Body should  be not Empty please enter some data to create Wickets"
            })
        }
        const wicketCreated = await wicketModel.create(data)
        return res.status(201).send({
            status: true,
            message: "Wicket created successfully",
            data: wicketCreated
        })
    }
    catch (error) {
        return res.status(500).send({
            status: false,
            message: error.message
        })
    }
};
//=============================================================================

const postBowlings = async function (req, res) {
    try {
        let data = req.body;

        const filterBow = await filterBowling.create(data)
        return res.status(201).send({
            status: true,
            message: "filterbowling created successfully",
            data: filterBow
        })
    }
    catch (error) {
        return res.status(500).send({
            status: false,
            message: error.message
        })
    }
};

const getBowlings = async function (req, res) {
    try {
        let body = req.query
        const getBow = await filterBowling.find(body)
        return res.status(200).send({
            status: true,
            message: 'Success',
            data: getBow
        })
    }
    catch (error) {
        return res.status(500).send({
            status: false,
            message: error.message
        })
    }
};
//========================================================================

const postBattings = async function (req, res) {
    try {
        let data = req.body;

        const filterBat = await filterBatting.create(data)
        return res.status(201).send({
            status: true,
            message: "filterbatting created successfully",
            data: filterBat
        })
    }
    catch (error) {
        return res.status(500).send({
            status: false,
            message: error.message
        })
    }
};

const getBattings = async function (req, res) {
    try {
        let body = req.query
        const getBat = await filterBatting.find(body)
        return res.status(200).send({
            status: true,
            message: 'Success',
            data: getBat
        })
    }
    catch (error) {
        return res.status(500).send({
            status: false,
            message: error.message
        })
    }
};

const bow_bat = async function (req, res) {
    try {
        let data = req.body;
        data = JSON.parse(JSON.stringify(data));

        const actionCreated = await bow_batModel.create(data)

        return res.status(201).send({
            status: true,
            message: "Success",
            data: actionCreated
        })
    }
    catch (error) {
        return res.status(500).send({
            status: false,
            message: error.message
        })
    }
};

const createDrills = async function (req, res) {
    try {
        let data = req.body;

        let { drills, date, time } = data;

        if (await drillModel.findOne({ date: date, time: time }))
            return res.status(400).send({ status: false, message: "You already have a routine set for this time" })

        const drillsCreated = await drillModel.create(data)

        return res.status(201).send({
            message: "Success",
            data: drillsCreated
        })
    }
    catch (error) {
        return res.status(500).send({
            status: false,
            message: error.message
        })
    }
};

const getRoutine = async function (req, res) {
    try {
        let data = req.body;

        const getDrills = await drillModel.find(data).sort({ time: data.time })

        return res.status(200).send({
            status: true,
            data: getDrills
        })
    }
    catch (error) {
        return res.status(500).send({
            status: false,
            message: error.message
        })
    }
};

module.exports = { createUser, userLogin, createBattings, createBowlings, createWickets, postBowlings, getBowlings, postBattings, getBattings, bow_bat, createDrills, getRoutine }