const renderHarvestForecast = async (req, res) => {
    try {
        res.render("harvestForecast", {
            pageTitle: "Previsão de Colheita",
            cssPage: "harvestForecast",
        });
    } catch (error) {
        console.error("Erro:", error);
        res.status(500).render("error", { message: "Erro ao carregar previsão de colheita" });
    }
};
  
export default renderHarvestForecast;