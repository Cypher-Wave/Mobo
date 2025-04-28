import UserService from "../../services/UserService.js";

const renderUser = async(req, res) => {
    try {
        res.render("login", {
            pageTitle: "Login / Cadastro",
            cssPage: "login",
        });
    } catch (error) {
        console.error("Erro:", error);
        res.status(500).render("error", { message: "Erro ao carregar página de login / cadastro" });
    }
}

const registerUser = async(req, res) => {
  try {
    const { userName, userEmail, userPassword, userPhone, userRole, company, farmerDetails } = req.body;
    const userData = {
      userName,
      userEmail,
      userPassword,
      userPhone,
      userRole,
      company,
      farmerDetails,
    };
    const newUser = await UserService.register(userData);
    res.status(201).json({ message: "Usuário registrado com sucesso!", user: newUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const loginUser = async(req, res) => {
    try {
        const { userEmail, userPassword } = req.body;
        const user = await UserService.login(userEmail, userPassword);
        res.status(200).json({ message: "Login realizado com sucesso!", user });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
}

export default { renderUser, registerUser, loginUser };