const renderClawArm = async (req, res) => {
  try {
    res.render("clawArm", {
      pageTitle: "Braço Mecânico",
      cssPage: "clawArm",
    });
  } catch (error) {
    console.error("Erro:", error);
    res.status(500).render("error", { message: "Erro ao carregar braço" });
  }
};

export default renderClawArm;