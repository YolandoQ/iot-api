import * as mongoose from 'mongoose';

class Database {
    private DB_URL = 'mongodb://db:27017/admin';

    createConnection() {
        mongoose.connect(this.DB_URL);
    }
}

export default Database;