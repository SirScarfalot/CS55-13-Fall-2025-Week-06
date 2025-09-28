//imports libraries and styles
import Head from 'next/head';
//imports the layout file
import Layout, { siteTitle } from '../components/layout';
//imports the style for the intro blurb
import utilStyles from '../styles/utils.module.css';
//imports the link component to allow link elements
import Link from 'next/link';
//imports the date management component
import Date from '../components/date';
//imports the function to get and sort all blog post data
import { getSortedPostsData } from '../lib/posts-json';

// This function runs at build time to fetch data for static generation
export async function getStaticProps() {
//Defines the variable that stores the sorted blog post data
  const allPostsData = getSortedPostsData();
//Returns the blog post data as props to the home page
  return {
    props: {
      allPostsData,
    },
  };
}

//Defines the main Home component that renders the homepage with blog post data
export default function Home({ allPostsData }) {
//returns the Home layout to the main page
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Welcome to my site! I'm Anton and I'm learning a lot here.</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
            <Link href={`/posts/${id}`}>{title}</Link>
            <br />
            <small className={utilStyles.lightText}>
              <Date dateString={date} />
            </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}