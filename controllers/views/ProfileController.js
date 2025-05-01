const renderProfile = async (req, res) => {
    try {
        res.render("profile", {
            pageTitle: "Perfil",
            cssPage: "profile",
        });
    } catch (error) {
        console.error("Erro:", error);
        res.status(500).render("error", { message: "Erro ao carregar perfil" });
    }
}

export default renderProfile;