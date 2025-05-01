import asyncHandler from "../../utils/asyncHandler.js";

class ClawArmController {
  render = asyncHandler(async (req, res) => {
    res.render("clawArm", {
      pageTitle: "Braço Mecânico",
      cssPage: "clawArm",
    });
  });
}

export default new ClawArmController();
