import Head from "next/head";
import Link from "next/link"

const Home = () => {
  return (
    <div>
      <Head>
        <title>Home Page</title>
      </Head>
      <div>
        <h1>Home page</h1>
        <Link href="/about">
          <a>about page</a>
        </Link>
      </div>
    </div>
  );
};

export default Home;
