import Head from "next/head"
import PageSpinner from "@/src/components/common/spinner";
import HeaderGeneric from "@/src/components/common/headerGeneric";
import ReactPlayer from "react-player";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { Button, Container } from "reactstrap";

import courseService, { CourseType, EpisodeType } from "@/src/services/courseService";
import watchEpisodeService from "@/src/services/episodeService";

import styles from "../../../styles/episodePlayer.module.scss";

const EpisodePlayer = () => {
  const router = useRouter();
  const [course, setCourse] = useState<CourseType>();
  const [getEpisodeTime, setGetEpisodeTime] = useState(0);
  const [episodeTime, setEpisodeTime] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [loading, setLoaging] = useState(true);
  const episodeOrder = parseFloat(router.query.id?.toString() || "");
  const episodeId = parseFloat(router.query.episodeid?.toString() || "");
  const courseId = parseFloat(router.query.courseid?.toString() || "");

  const playerRef = useRef<ReactPlayer>(null);

  const handleGetEpisodeTime = async () => {
    const res= await watchEpisodeService.getWatchTime(episodeId);

    if(res.data !== null){
      setGetEpisodeTime(res?.data?.seconds)
    }
  }

  const handleSetEpisodeTime = async () => {
    await watchEpisodeService.setWatchTime({
      episodeId,
      seconds: Math.round(episodeTime)
    });
  }

  useEffect(() => {
    handleGetEpisodeTime();
  }, [router])

  const handlePlayerTime = async() => {
    playerRef.current?.seekTo(getEpisodeTime);
    setIsReady(true);
  }

  if(isReady === true){
    setTimeout(() => {
      handleSetEpisodeTime();
    }, 1000 * 3)
  }

  const getCourse = async() => {
    if(typeof courseId !== "number") return;

    const res = await courseService.getEpisodes(courseId);

    if(res.status === 200){
      setCourse(res.data);
    };

  }
  
  const handleLastEpisode = () => {
    router.push(`/course/episodes/${episodeOrder - 1}?courseid=${courseId}&episodeid=${
      episodeId - 1
    }`)
  }

  const handleNextEpisode = () => {
    router.push(`/course/episodes/${episodeOrder + 1}?courseid=${courseId}&episodeid=${
      episodeId + 1
    }`)
  }

  
  useEffect(() => {
    getCourse();
  }, [courseId])
  
  useEffect(() => {
    if(!sessionStorage.getItem("onebitflix-token")){
      router.push("/login")
    }else{
      setLoaging(false);
    }
  }, [])
  
  if(course?.episodes === undefined) return <PageSpinner />;


  if(episodeOrder + 1 < course?.episodes?.length) {
    if(Math.round(episodeTime) === course?.episodes[episodeOrder].secondsLong){
      handleNextEpisode();
    }
  }


  if(loading) return <PageSpinner />
  
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
              ref={playerRef}
              onStart={handlePlayerTime}
              onProgress={(progress) => {
                setEpisodeTime(progress.playedSeconds);
              }}
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