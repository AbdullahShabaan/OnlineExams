import Link from "next/link";

export default function Home() {
  return (
    <header>
      <ul className="flex gap-10 justify-center py-5">
        <li>
          <Link href="client">Client</Link>
        </li>
        <li>
          <Link href="admin">Admin</Link>
        </li>
        <li>
          <Link href="dashboard">Dashboard</Link>
        </li>
      </ul>
    </header>
  );
}
