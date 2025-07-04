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

const app = express();
const PORT = process.env.PORT || 3000;
// const allowedOrigins = [
//   "http://localhost:3000",
//   "http://localhost:3001",
//   "https://mul-inventory-adam6518s-projects.vercel.app",
//   "https://mul-inventory-1svryelu8-adam6518s-projects.vercel.app",
//   "https://mul-inventory-git-main-adam6518s-projects.vercel.app",
// ];
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(null, false);
//     }
//   },
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization"],
//   credentials: true, // Boleh true walaupun tidak pakai cookie
// };
// app.use(cors(corsOptions));
// app.options("*", cors(corsOptions));
app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/project", projectRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/riwayat", riwayatRoutes);
app.use("/api/finansial", finansialRoutes);

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  try {
    await checkConnection();
    await createAllTable();
  } catch (error) {
    console.log("failed to initiate databases", error);
  }
});
