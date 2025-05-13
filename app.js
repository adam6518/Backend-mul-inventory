import express from "express";
import { checkConnection } from "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js";
import projectRoutes from "./src/routes/projectRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import orderRoutes from "./src/routes/orderRoutes.js";
import riwayatRoutes from "./src/routes/riwayatRoutes.js";
import finansialRoutes from "./src/routes/finansialRoutes.js";
import cors from "cors";

import createAllTable from "./src/utils/dbUtils.js";

const PORT = process.env.PORT || 3000;
const corsOptions = {
  origin: "https://mul-inventory-adam6518s-projects.vercel.app", // ganti dengan domain vercel kamu
};
const app = express();
app.use(cors(corsOptions));

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/project", projectRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/riwayat", riwayatRoutes);
app.use("/api/finansial", finansialRoutes);

app.listen(PORT, async () => {
  console.log(`Server rnning on port ${PORT}`);
  try {
    await checkConnection();
    await createAllTable();
  } catch (error) {
    console.log("failed to initiate databases", error);
  }
});
