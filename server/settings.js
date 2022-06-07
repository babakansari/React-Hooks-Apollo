import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

const Settings = {
    port: process.env.APOLLO_SERVER_PORT,
    jwtSecret: Buffer.from(process.env.APOLLO_JWT_SECRET[1], 'base64'),
    corsOrigin: process.env.ACCESS_CONTROL_ALLOW_ORIGIN.split(','),
    okta_domain: process.env.OKTA_DOMAIN,
    auth_server_id: process.env.AUTH_SERVER_ID,
    audience: process.env.AUDIENCE
};

export default Settings;