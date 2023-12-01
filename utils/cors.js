export const corsOptions = {
  origin: ["http://localhost:3000", "https://realestate-devtruong.vercel.app"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  headers: "Content-Type",
  credentials: true,
};
