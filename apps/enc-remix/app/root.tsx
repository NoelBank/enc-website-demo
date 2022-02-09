import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from 'remix';
import type { LinksFunction } from 'remix';

import globalStylesUrl from '~/styles/global.css';
import darkStylesUrl from '~/styles/dark.css';

// https://remix.run/api/app#links
export let links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: globalStylesUrl },
    {
      rel: 'stylesheet',
      href: darkStylesUrl,
      media: '(prefers-color-scheme: dark)',
    },
  ];
};

// https://remix.run/api/conventions#default-export
// https://remix.run/api/conventions#route-filenames
export default function App() {
  return (
    <Document>
      <Layout>
        <Outlet />
      </Layout>
    </Document>
  );
}

// https://remix.run/docs/en/v1/api/conventions#errorboundary
export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  return (
    <Document title="Error!">
      <Layout>
        <div>
          <h1>There was an error</h1>
          <p>{error.message}</p>
          <hr />
          <p>
            Hey, developer, you should replace this with what you want your
            users to see.
          </p>
        </div>
      </Layout>
    </Document>
  );
}

// https://remix.run/docs/en/v1/api/conventions#catchboundary
export function CatchBoundary() {
  let caught = useCatch();

  let message;
  switch (caught.status) {
    case 401:
      message = (
        <p>
          Oops! Looks like you tried to visit a page that you do not have access
          to.
        </p>
      );
      break;
    case 404:
      message = (
        <p>Oops! Looks like you tried to visit a page that does not exist.</p>
      );
      break;

    default:
      throw new Error(caught.data || caught.statusText);
  }

  return (
    <Document title={`${caught.status} ${caught.statusText}`}>
      <Layout>
        <h1>
          {caught.status}: {caught.statusText}
        </h1>
        {message}
      </Layout>
    </Document>
  );
}

function Document({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        {title ? <title>{title}</title> : null}
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="remix-app">
      <header className="remix-app__header">
        <div className="container remix-app__header-content">
          <Link to="/" title="Remix" className="remix-app__header-home-link">
            <RemixLogo />
          </Link>
          <nav aria-label="Main navigation" className="remix-app__header-nav">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/posts">Posts</Link>
              </li>
              <li>
                <a href="https://remix.run/docs">Remix Docs</a>
              </li>
              <li>
                <a href="https://github.com/remix-run/remix">GitHub</a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <div className="remix-app__main">
        <div className="container remix-app__main-content">{children}</div>
      </div>
      <footer className="remix-app__footer">
        <div className="container remix-app__footer-content">
          <p>&copy; nbank!</p>
        </div>
      </footer>
    </div>
  );
}

function RemixLogo() {
  return (
    <svg
      data-name="Ebene 1"
      viewBox="0 0 425.2 117.86"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="#fff"
        d="m189.52 59.11c0 16.56-11.94 28.5-28.28 28.5s-28.17-11.94-28.17-28.5 11.84-28.72 28.17-28.72 28.28 12.17 28.28 28.72m-45.6 0c0 11 7.24 19 17.32 19s17.43-8 17.43-19-7.35-19.18-17.43-19.18-17.32 8.07-17.32 19.18"
      />
      <path
        fill="#fff"
        d="M360.62,59.11c0,16.56-11.94,28.5-28.28,28.5s-28.17-11.94-28.17-28.5S316,30.39,332.35,30.39s28.28,12.17,28.28,28.72m-45.59,0c0,11,7.24,19,17.32,19s17.43-8,17.43-19-7.34-19.18-17.43-19.18S315,48,315,59.11"
      />
      <polygon
        fill="#fff"
        points="50.74 5.81 50.74 59.85 0.43 4.38 0 4.38 0 53.42 11.18 65.77 11.18 32.23 61.49 87.8 61.92 87.8 61.92 5.81"
      />
      <path
        fill="#fff"
        d="M399.76,30.39c-8.66,0-14.46,3.62-17.65,7.78h0l-.48-6.69h-9.71V106l10.74,11.84V80.6c3.29,3.83,8.88,7,17.1,7,15.13,0,25.44-12.06,25.44-28.61s-10.31-28.61-25.44-28.61m-2,47.68c-7.34,0-11.84-3.95-15.13-9.32V49.25c3.29-5.37,7.78-9.32,15.13-9.32,9.65,0,16.55,7.67,16.55,19.07s-6.91,19.07-16.55,19.07"
      />
      <path
        fill="#fff"
        d="M116.22,71.49c-2.76,3.79-8,6.81-15.16,6.81-10.3,0-16.22-5.59-16.88-15.45h40.33V58.56c0-15.45-8.44-28.17-24.88-28.17-15.46,0-26.31,12.17-26.31,28.72s10.74,28.51,27.73,28.51c9.4,0,16.26-3.4,21.42-9.21ZM99.64,39.6c8.88,0,13.92,5.81,14.25,14.47H84.18c.55-8.77,6.58-14.47,15.46-14.47"
      />
      <polygon
        fill="#fff"
        points="298.26 31.49 286.1 31.49 261.65 67 261.65 0 250.91 11.87 250.91 86.52 259.57 86.52 274.58 64.48 288.4 86.52 301 86.52 281.38 55.6"
      />
      <path
        fill="#fff"
        d="M220.65,53.63c-8-1.86-11.18-3.18-11.18-7.56s3.95-6.36,9.65-6.36A26.14,26.14,0,0,1,231.81,43l6.6-7.27c-4.39-3-11.57-5.31-18.86-5.31-12.82,0-20.83,6.25-20.83,16.78,0,8.55,5.48,13,18.74,16.11,8,1.87,11.29,3.62,11.29,8.11,0,4.71-4.49,6.91-11.07,6.91A24.56,24.56,0,0,1,203.41,74l-6.65,7.35c5.14,4,12.55,6.28,20.82,6.28,13.48,0,22-6.8,22-17.33,0-8.22-5.81-13.48-19-16.66"
      />
    </svg>
  );
}
