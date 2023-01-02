import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, nothing to see here.</p>
      <p>
        ¯\_(ツ)_/¯
      </p>
      <Link to="/">Go to the home page</Link>
    </div>
  );
}
