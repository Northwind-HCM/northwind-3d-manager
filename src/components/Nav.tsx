import Link from "next/link";
import { Boxes, Calculator, LayoutDashboard } from "lucide-react";

export default function Nav() {
  return (
    <aside className="sidebar">
      <div className="brand"><span>NW</span><div><b>Northwind</b><small>3D Manager</small></div></div>
      <nav>
        <Link href="/"><LayoutDashboard size={19}/>Dashboard</Link>
        <Link href="/filament"><Boxes size={19}/>Filamente</Link>
        <Link href="/calculator"><Calculator size={19}/>Kalkulation</Link>
      </nav>
      <div className="sidebar-footer">MVP · lokale Speicherung</div>
    </aside>
  );
}
