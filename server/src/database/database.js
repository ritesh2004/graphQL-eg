const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const res = await mongoose.connect("mongodb://127.0.0.1:27017", {
            dbName: "graphqlDB",
        });
        console.log(`Database connected at ${res.connection.host}`);
    } catch (error) {
        console.log(error);
    }
};

// Exporting connectDB function
module.exports = connectDB;