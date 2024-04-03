import dotenv from 'dotenv';

dotenv.config();

export default {
    mongo: {
        URL: process.env.MONGO_URL
    },
    jwt: {
        COOKIE: process.env.JWT_COOKIE,
        SECRET: process.env.JWT_SECRET
    },
    mailing: {
        USER: process.env.MAILING_USER,
        SERVICE: process.env.MAILING_SERVICE,
        PASSWORD: process.env.MAILING_PASSWORD
    }
}