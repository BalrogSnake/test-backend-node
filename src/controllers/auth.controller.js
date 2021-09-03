import User from "../models/User";

import jwt from "jsonwebtoken";
import config from "../config";

export const signUp = async (req, res) => {
  try {
    // Obtener request body
    const { name, username, password } = req.body;

    // Creando un nuevo usuario
    const newUser = new User({
      name,
      username,
      password: await User.encryptPassword(password),
    });

    // Guardar el usuario en mongoDB
    const savedUser = await newUser.save();

    // Crear un token
    const token = jwt.sign({ id: savedUser._id }, config.SECRET, {
      expiresIn: 86400, // 24 horas de expiracion
    });

    return res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const signin = async (req, res) => {
  try {
    // Buscar si hay un username repetido
    const userFound = await User.findOne({ username: req.body.username })

    if (!userFound) return res.status(400).json({ message: "User Not Found" });

    //buscar si las passwords coinciden
    const matchPassword = await User.comparePassword(
      req.body.password,
      userFound.password
    );

    if (!matchPassword)
      return res.status(401).json({
        token: null,
        message: "Invalid Password",
      });

    const token = jwt.sign({ id: userFound._id }, config.SECRET, {
      expiresIn: 86400, // 24 horas
    });

    const data = {
      _id: userFound._id,
      name: userFound.name,
      username: userFound.username,
      token
    }

    res.json(data);
  } catch (error) {
    console.log(error);
  }
};
