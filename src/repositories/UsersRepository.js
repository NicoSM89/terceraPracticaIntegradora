export default class UserRepository {
    constructor(dao){
        this.dao = dao;
    }

    getUsers = () => {
        return this.dao.getAll();
    }

    createUser = (user) => {
        return this.dao.saveUser(user);
    }

    getBy = (params) => {
        return this.dao.getBy(params);
    }

    updateUser = (id, user) => {
        return this.dao.updateUser(id, user);
    }
}