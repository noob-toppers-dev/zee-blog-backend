const mongoose = require('mongoose');
module.exports = async () => {
    try {
        const db = await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
        console.log(`MONGODB connected : ${db.connection.host}`.cyan.underline);
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}
