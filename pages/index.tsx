import Head from "next/head";
import styles from "@/styles/HomeNoAuth.module.scss"
import HeaderNoAuth from "@/src/components/homeNoAuth/headerNoAuth";
import PresentationSection from "@/src/components/homeNoAuth/presentationSection";
import CardSection from "@/src/components/homeNoAuth/cardsSection";
import SlideSection from "@/src/components/homeNoAuth/slideSection";
import { GetStaticProps } from "next";
import courseService, { CourseType } from "@/src/services/courseService";
import Footer from "@/src/components/common/footer";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

interface indexPageProps {
  children ?: React.ReactNode;
  course: CourseType[]
}

const HomeNoAuth = ({ course }: indexPageProps) => {

  useEffect(() => {
    AOS.init();
  }, [])

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
        <div 
          className={styles.sectionBackground} 
          data-aos= "fade-zoom-in"
          data-aos-duration = "1600"
        >
          <HeaderNoAuth/>
          <PresentationSection />
        </div>
        <div data-aos = "fade-right" data-aos-duration = "1200" >
          <CardSection />
        </div>
        <div  data-aos = "fade-up" data-aos-duration = "1300">
          <SlideSection newestCourses={course}/>
        </div>
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