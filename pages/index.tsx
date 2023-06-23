import Head from "next/head";
import styles from "@/styles/HomeNoAuth.module.scss"
import HeaderNoAuth from "@/src/components/homeNoAuth/headerNoAuth";
import PresentationSection from "@/src/components/homeNoAuth/presentationSection";
import CardSection from "@/src/components/homeNoAuth/cardsSection";

const HomeNoAuth = () => {
  return (
    <>
      <Head>
        <title>OneBitFlix</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
        <meta property="og:title" content="OneFitFlix" key="title"/>
        <meta name="description" content="Tenha acesso aos melhores conteúdos de programação de uma
          forma simples e fácil!"/>
      </Head>
      <main>
        <div className={styles.sectionBackground}>
          <HeaderNoAuth/>
          <PresentationSection />
        </div>
        <CardSection />
      </main>
    </>
  )
}

export default HomeNoAuth;