import Head from "next/head";
import styles from "@/styles/HomeNoAuth.module.scss"
import HeaderNoAuth from "@/src/components/homeNoAuth/headerNoAuth";
import PresentationSection from "@/src/components/homeNoAuth/presentationSection";
import CardSection from "@/src/components/homeNoAuth/cardsSection";
import SlideSection from "@/src/components/homeNoAuth/slideSection";
import { GetStaticProps } from "next";
import courseService, { CourseType } from "@/src/services/courseService";
import Footer from "@/src/components/common/footer";

interface indexPageProps {
  children ?: React.ReactNode;
  course: CourseType[]
}

const HomeNoAuth = ({ course }: indexPageProps) => {
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
        <SlideSection newestCourses={course} />
        <Footer />
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async() => {
  const res = await courseService.getNewestCourses();

  return {
    props: {
      course: res.data
    },
    revalidate: 3600 * 24,
  }
}

export default HomeNoAuth;