import mongoose from "mongoose";

// Mongodb Data
const user = "marcost94";
const password = "NVSx2Cs7RrGZ9n8U";

export function connectDb() {
mongoose
    .connect(
        `mongodb+srv://marcost94:NVSx2Cs7RrGZ9n8U@entregafinal.yscrp39.mongodb.net/?retryWrites=true&w=majority&appName=EntregaFinal`
    )
    .then(() => {
        try {
        console.log(`MongoDb connected to ${mongoDb}`);
        } catch (error) {
        console.log(error);
    }
    })
    .catch((error) => {
        console.log(error);
    });
}