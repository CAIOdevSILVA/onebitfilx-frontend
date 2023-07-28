import Head from "next/head"
import { useRouter } from "next/router";
import HeaderGeneric from "@/src/components/common/headerGeneric";
import { useEffect, useState } from "react";
import courseService, { CourseType, EpisodeType } from "@/src/services/courseService";
import PageSpinner from "@/src/components/common/spinner";
import { Button, Container } from "reactstrap";
import ReactPlayer from "react-player";

import styles from "../../../styles/episodePlayer.module.scss";

const EpisodePlayer = () => {
  const router = useRouter();
  const [course, setCourse] = useState<CourseType>()
  const episodeOrder = parseFloat(router.query.id?.toString() || "");
  const courseId = parseFloat(router.query.courseid?.toString() || "");

  const getCourse = async() => {
    if(typeof courseId !== "number") return;

    const res = await courseService.getEpisodes(courseId);

    if(res.status === 200){
      setCourse(res.data);
    };
  }

  const handleLastEpisode = () => {
    router.push(`/course/episodes/${episodeOrder - 1}?courseid=${courseId}`)
  }

  const handleNextEpisode = () => {
    router.push(`/course/episodes/${episodeOrder + 1}?courseid=${courseId}`)
  }
  
  useEffect(() => {
    getCourse();
  }, [])

  if(course?.episodes === undefined) return <PageSpinner />;
  
  return (
    <>
      <Head>
        <title>Onebitfilx - {course?.episodes[episodeOrder].name}</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </Head>
      <main>
        <HeaderGeneric 
          logoUrl="/home"
          btnContent={"Voltar para o curso"}
          btnUrl={`/course/${courseId}`}
        />
        <Container className="d-flex flex-column align-items-center gap-3 pt-5">
          <p className={styles.episodeTitle}>
            {course?.episodes[episodeOrder]?.name}
          </p>
          {typeof window === "undefined" ? null : (
            <ReactPlayer 
              className= {styles.player}
              url={`${process.env.NEXT_PUBLIC_BASEURL
              }/episodes/stream?videoUrl=${course?.episodes[episodeOrder]?.videoUrl
              }&token=${sessionStorage.getItem("onebitflix-token")}`}
              controls
            />
          )}

          <div className={styles.episodesButtonDiv}>
            <Button 
              className={styles.episodesButton}
              disabled={episodeOrder === 0? true : false}
              onClick={handleLastEpisode}
            >
              <img src="/episode/iconArrowLeft.svg" alt="Seta esquerda" className={styles.arrowImg} />
            </Button>
            <Button 
              className={styles.episodesButton}
              disabled={episodeOrder + 1 === course.episodes.length ? true : false}
              onClick={handleNextEpisode}
            >
              <img src="/episode/iconArrowRight.svg" alt="Seta direita" className={styles.arrowImg} />
            </Button>
          </div>
          <p className="text-center py-4">
            {course?.episodes[episodeOrder].synopsis}
          </p>
        </Container>
      </main>
    </>
  )
}

export default EpisodePlayer