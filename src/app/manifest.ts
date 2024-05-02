import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "요미디자인",
    short_name: "요미디자인",
    description: "아이덴티티와 디자인을 연결하다.",
    start_url: "/",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#fff",
  };
}
