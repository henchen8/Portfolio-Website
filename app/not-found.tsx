import Link from "next/link";

export default function NotFound() {
  return (
    <section className="notfound">
      <p className="notfound-code">404</p>
      <h1 className="notfound-title">This page doesn&apos;t exist</h1>
      <p className="notfound-text">
        The page you&apos;re looking for moved or was never here.
      </p>
      <Link href="/" className="btn btn-primary">
        Back home
      </Link>
    </section>
  );
}
