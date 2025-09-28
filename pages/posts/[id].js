// Import the Layout component for consistent page structure
import Layout from '../../components/layout';
// Import Head component for managing document head elements (title, meta tags, etc.)
import Head from 'next/head';
// Import Date component for formatting and displaying post dates
import Date from '../../components/date';
// Import functions for retrieving post data and generating static paths
import { getAllPostIds, getPostData } from '../../lib/posts-json';
// Import CSS styling for posts
import utilStyles from '../../styles/utils.module.css';

// Next.js function that runs at build time to fetch data for static generation
export async function getStaticProps({ params }) {
  // Fetches the post data for the specific post ID from the params
  const postData = await getPostData(params.id);
  // Returns the post data as props to be passed to the Post component
  return {
    props: {
      postData,
    },
  };
}

// Next.js function that runs at build time to generate static paths for dynamic routes
export async function getStaticPaths() {
  // Get all available post IDs to pre-generate static pages for each post
  const paths = getAllPostIds();
  // Returns the static paths collected from post IDs for the dynamically created routes
  return {
    paths,
    fallback: false,
  };
}

// Main Post component that renders individual blog post pages with title, date, and content
export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.content }} />
        <img src={postData.image} />
      </article>
    </Layout>
  );
}