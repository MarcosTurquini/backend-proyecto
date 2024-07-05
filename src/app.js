import Express from "express";
import productsRoutes from "./routes/products.routes.js";
import cartRoutes from "./routes/carts.routes.js";
import handlebars from "express-handlebars";
import viewsRoutes from "./routes/views.routes.js";
import __dirname from "./dirname.js";
import path from "path";
import fs from "fs";
import { Server } from "socket.io";
import { connectDb } from "./utils/mongoose.js";

// mongodb connection
connectDb();

const products = JSON.parse(fs.readFileSync("./data/products.json", "utf-8"));

const app = Express();
const PORT = 8080;
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

const httpServer = app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

// Config de handlebars
app.engine(
    "hbs",
    handlebars.engine({
    extname: "hbs",
    defaultLayout: "main",
})
);

app.set("view engine", "hbs");
app.set("views", `${__dirname}/views`);
app.use(Express.static(path.resolve(__dirname, "../public")));

app.use("/", viewsRoutes);
// Fin de la config de handlebars

// Config del servidor WebSocket

const io = new Server(httpServer);

// Products Socket

io.on("connection", (socket) => {
    console.log(`Cliente conectado: ${socket.id}`);

    socket.on("disconnect", () => {
    console.log(`Cliente desconectado: ${socket.id}`);
});

    socket.emit("getProducts", products);
});

app.use("/api/products", productsRoutes);
app.use("/api/carts", cartRoutes);
