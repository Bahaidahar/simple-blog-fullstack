require("dotenv").config({ path: "../.env" });
const express = require("express");
const mongoose = require("mongoose");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const cors = require("cors");
const articleRoutes = require("./routes/articleRoutes");

const app = express();
const PORT = process.env.PORT || 5001;

const corsOptions = {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
};
// Middleware
app.use(express.json());
app.use(cors(corsOptions));

// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("Database connection error:", err));

// Routes
app.use("/api/articles", articleRoutes);

// Swagger setup
const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Personal Blog API",
            version: "1.0.0",
            description: "API documentation for the Personal Blog platform",
        },
        servers: [{ url: `http://localhost:${PORT}/api` }],
    },
    apis: ["./swagger/swagger.yaml"], // Path to the Swagger YAML file
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
