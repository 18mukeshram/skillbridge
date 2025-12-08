import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="max-w-md mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold mb-2">404</h1>
      <p className="text-sm text-slate-400 mb-4">
        The page you are looking for doesn&apos;t exist.
      </p>
      <Link
        to="/"
        className="inline-block px-4 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-sm"
      >
        Go home
      </Link>
    </section>
  );
};

export default NotFound;
