import type { MetadataRoute } from "next";
import { COMPANY } from "./company-info";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: COMPANY.name,
    short_name: COMPANY.name,
    description: COMPANY.description,
    start_url: "/",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#fff",
  };
}
