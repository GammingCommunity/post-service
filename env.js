require('dotenv').config();
module.exports = {
    db_connection: process.env.db_connection,
    secret_key_jwt: process.env.secret_key_jwt,
    main_server_code: process.env.post_server_code
}