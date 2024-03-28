require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const directoryRoutes = require("./routes/directoryRoutes");
const ecomRoutes = require("./routes/ecomRoutes");
const maintenanceRoutes = require("./routes/maintenanceRoutes");
const propertyRoutes = require("./routes/propertyRoutes");
const orderRoutes = require("./routes/orderRoutes");
const upload = require("./routes/upload");
const misc = require("./routes/miscRoutes");
const cors = require("cors");

const app = express();
const source = process.env.MONGO_URI;
app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/upload", upload);
app.use("/api/ecom", ecomRoutes);
app.use("/api/maintenance", maintenanceRoutes);
app.use("/api/property", propertyRoutes);
app.use("/api/directory", directoryRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/misc", misc);
mongoose
  .connect(source)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB connection error", err));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Successfully served on port: ${PORT}.`);
});
