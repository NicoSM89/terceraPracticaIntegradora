import jwt from 'jsonwebtoken';
import config from "../config/config.js";
import User from "../dao/dbManagers/users.js";
import MailingService from "../services/mailing.js";

const userService = new User();

export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await userService.getBy({ email });
        if (!user) {
            return res.status(404).send({ status: "error", message: "User not found" });
        }
        const token = jwt.sign({ email }, config.jwt.SECRET, { expiresIn: '1h' });
        // Envía el token de restablecimiento de contraseña por correo electrónico
        const mailingService = new MailingService();
        await mailingService.sendPasswordResetEmail(email, token);
        res.send({ status: "success", message: "Password reset email sent successfully" });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send({ status: "error", message: "Internal server error" });
    }
};

export const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;
        // Verifica el token
        jwt.verify(token, config.jwt.SECRET, async (err, decoded) => {
            if (err) {
                return res.status(400).send({ status: "error", message: "Invalid or expired token" });
            }
            const { email } = decoded;
            const user = await userService.getBy({ email });
            if (!user) {
                return res.status(404).send({ status: "error", message: "User not found" });
            }
            // Verifica si la nueva contraseña es la misma que la anterior
            if (await userService.isValidPassword(user, password)) {
                return res.status(400).send({ status: "error", message: "New password cannot be the same as the old one" });
            }
            // Actualiza la contraseña del usuario
            await userService.updatePassword(user._id, password);
            res.send({ status: "success", message: "Password reset successfully" });
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send({ status: "error", message: "Internal server error" });
    }
};

export const register = (req,res)=>{
    res.send({status:"success",message:"User registered",payload:req.user._id});
}

export const failedRegister = (req,res)=>{
    res.send("failed Register");
}

export const login = (req,res)=>{
    //serializedUser podrá convertirse en un DTO más adelante.
    const serializedUser = {
        id : req.user._id,
        name : `${req.user.first_name} ${req.user.last_name}`,
        role: req.user.role,
        email: req.user.email
    }
    const token = jwt.sign(serializedUser, config.jwt.SECRET,{expiresIn:"1h"})
    res.cookie(config.jwt.COOKIE, token,{maxAge:3600000}).send({status:"success",payload:serializedUser});
}

export const failedLogin = (req,res)=>{
    console.log(req.message);
    res.send("failed Login");
}

export const getCurrentUser = (req, res) => {
    res.send(req.user);
}