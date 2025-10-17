import asyncHandler from "../utils/asyncHandler.js";

class ClawArmController {
  render = asyncHandler(async (req, res) => {
    const user = req.session.user;
    res.render("clawArm", {
      user,
      pageTitle: "Braço Mecânico",
      cssPage: "clawArm",
    });
  });
}

export default new ClawArmController();
