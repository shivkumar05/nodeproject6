const express = require("express")
const battingController = require("../Controllers/user")
const commnMid = require("../Middleware/Auth")
const Router = express.Router()


Router.post("/user", battingController.createUser)
Router.post("/userlogin", battingController.userLogin)
Router.post("/:userId/bow_batPost",commnMid.jwtValidation,commnMid.authorization, battingController.bow_bat)
Router.post("/:userId/batting",commnMid.jwtValidation,commnMid.authorization, battingController.createBattings)
Router.post("/:userId/bowling",commnMid.jwtValidation,commnMid.authorization, battingController.createBowlings)
Router.post("/:userId/wicket",commnMid.jwtValidation,commnMid.authorization, battingController.createWickets)
Router.post("/:userId/postBowlings",commnMid.jwtValidation,commnMid.authorization, battingController.postBowlings)
Router.get("/:userId/getBowlings",commnMid.jwtValidation,commnMid.authorization,battingController.getBowlings)
Router.post("/:userId/postBattings",commnMid.jwtValidation,commnMid.authorization, battingController.postBattings)
Router.get("/:userId/getBattings",commnMid.jwtValidation,commnMid.authorization,battingController.getBattings)
Router.post("/:userId/postDrills",commnMid.jwtValidation,commnMid.authorization, battingController.createDrills)
Router.get("/:userId/getRoutine",commnMid.jwtValidation,commnMid.authorization, battingController.getRoutine)


//************ checking your end point valid or not */
Router.all("/**", function (req, res) {
    res.status(404).send({
        status: false,
        message: "Make Sure Your Endpoint is Correct or Not!"
    })
})

module.exports = Router


