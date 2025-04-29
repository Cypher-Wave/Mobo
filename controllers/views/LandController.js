const renderLand = async (req, res) => {
    try {
        res.render("land", {
            pageTitle: "Cadastro de Terreno",
            cssPage: "land",
        });
    } catch (error) {
        console.error("Erro:", error);
        res.status(500).render("error", { message: "Erro ao carregar cadastro de plantação" });
    }
};
  
export default renderLand;