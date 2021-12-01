import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Snippets from "../components/Snippets";
import useSWR from "swr";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/client";

export default function Home() {
  const { data: snippets, mutate } = useSWR("api/snippets");
  const [session, loadingSession] = useSession();
  if (loadingSession) {
    <>
      <p>...authenticating</p>
    </>;
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Snippet Keeper</title>
        <meta name="description" content="A Journal Of Snippets" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {!session && (
        <>
          <h1>Sign in to access snippet app</h1>
          <button onClick={() => signIn()}>Sign In</button>
        </>
      )}

      {session && (
        <>
          <main className={styles.main}>
            <h1 className={styles.title}>CODE SNIPPETS KEEPER</h1>

            <Link href="/upload">
              <button>Create New Snippet</button>
            </Link>

            {snippets &&
              snippets.map((snippet) => (
                <Snippets
                  key={snippet.id}
                  snippet={snippet}
                  snippetDeleted={mutate}
                  email={session.user.email}
                />
              ))}
          </main>
        </>
      )}
    </div>
  );
}
