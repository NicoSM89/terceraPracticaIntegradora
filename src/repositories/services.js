import Courses from "../dao/dbManagers/courses.js";
import Users from "../dao/dbManagers/users.js";
import CoursesRepository from "./CoursesRepository.js";
import UserRepository from "./UsersRepository.js";

const courseDao = new Courses();
const userDao = new Users();

export const courseService = new CoursesRepository(courseDao);
export const userService = new UserRepository(userDao);