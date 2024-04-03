import type { NextPage } from "next";
import Head from "next/head";

import styles from "../styles/Home.module.css";
import Counter from "../features/counter-reference-redux/Counter";

const IndexPage: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Autority Challenge</title>
      </Head>
      <header className={styles.header}>
        <p>
          Edit <code>src/App.tsx</code> for your logic
        </p>
      </header>
      <div>
        <Counter />
      </div>
    </div>
  );
};

export default IndexPage;
