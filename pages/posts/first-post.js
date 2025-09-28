//imports the Head library for next.js functionality
import Head from 'next/head';
//imports the Link library for next.js functionality
import Link from 'next/link';


// Defines and exports the FirstPost component as the default export
export default function FirstPost() {
  // Returns the JSX elements that will be rendered by this component
  return (
    <>
      <Head>
        <title>First Post</title>
      </Head>
      <h1>First Post</h1>
      <h2>
        <Link href="/">← Back to home</Link>
      </h2>
    </>
  );
}