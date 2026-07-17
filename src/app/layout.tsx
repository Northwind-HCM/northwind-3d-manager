import "./globals.css";
import Nav from "@/components/Nav";

export const metadata = { title: "Northwind 3D Manager", description: "Filamentlager und Druckkalkulation" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="de"><body><Nav/><main className="main">{children}</main></body></html>;
}
