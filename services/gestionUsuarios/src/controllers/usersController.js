
const createUser = async (req, res) => {
    res.send("Usuario creado");
};

const getUser = async (req, res) => {
    res.send("Usuario obtenido");
}

const updateUser = async (req, res) => {
    res.send("Usuario actualizado");
}

const deleteUser = async (req, res) => {
    res.send("Usuario eliminado");
}

module.exports = { createUser, getUser, updateUser, deleteUser };