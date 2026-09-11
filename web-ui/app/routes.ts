import { type RouteConfig, index } from "@react-router/dev/routes";

// Define only the index ('/') route
export default [index("routes/home.tsx")] satisfies RouteConfig;
