import { userService, courseService } from "../repositories/services.js"
import MailingService from "../services/mailing.js";

export const getAllUsers = async (req,res)=>{
    let users = await userService.getUsers();
    if(!users) return res.status(500).send({status:"error",error:"Couldn't get users due to internal error"})
    res.send({status:"success",payload:users})
}

export const createUser = async(req,res)=>{
    let {first_name,last_name,dni,email,birthDate,gender, role} = req.body;
    if(!first_name||!last_name||!dni||!email||!birthDate) return res.status(400).send({status:"error",error:"Incomplete values"})
    let result = await userService.createUser({
        first_name,
        last_name,
        email,
        dni,
        birthDate,
        gender,
        role
    })
    if(!result) return res.status(500).send({status:"success",payload:result})
    res.send({status:"success",payload:result})
}

export const addUserIntoCourse = async(req,res)=>{
    const {uid,cid} = req.params;
    const course = await courseService.getCourseById(cid);
    if(!course) return res.status(404).send({status:"error",error:"Course not found"})
    const user = await userService.getBy({_id:uid});
    if(!user) return res.status(404).send({status:"error",error:"User not found"});
    //checamos si el usuario ya tenía ese curso registrado
    let courseExists = user.courses.some(c=>c._id.toString()===cid);
    if(courseExists) return res.status(400).send({status:"error",error:"The user is already registered in this course"});
    //Si todo está bien, insertamos de ambos lados.
    user.courses.push(course._id);
    course.students.push(user._id);
    await userService.updateUser(uid,user);
    await courseService.updateCourse(cid,course);
    const mailingService = new MailingService();
    await mailingService.sendSimpleMail({
        from: 'Coderhouse',
        to: user.email,
        subject: 'Curso registrado',
        html: `
            <h1>Bienvenido al curso ${course.title}</h1>
            <h2>Espero que aprendas mucho!</h2>
        `
    });
    res.send({status:"success",message:"User added to course"})
}