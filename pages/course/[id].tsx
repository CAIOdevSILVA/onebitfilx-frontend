import Head from "next/head";
import HeaderAuth from "@/src/components/common/headerAuth";
import courseService, { CourseType } from "@/src/services/courseService";
import PageSpinner from "@/src/components/common/spinner";
import Link from "next/link";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button, Container } from "reactstrap";

import styles from "../../styles/coursePage.module.scss";
import EpisodeList from "@/src/components/episodeList";
import Footer from "@/src/components/common/footer";


const CoursePage = () => {
  const [course, setCourse] = useState<CourseType>();
  const [liked, setLiked] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  const getCourse = async() => {
    if(typeof id !== "string") return;

    const res = await courseService.getEpisodes(id);

    if(res.status === 200){
      setCourse(res.data);
      setLiked(res?.data?.liked);
      setFavorited(res?.data?.favorited);
    };
  };

  useEffect(() => {
    getCourse();
  }, [id])
  
  const handleLikeCourse = async() => {
    if(typeof id !== "string") return

    if(liked === true) {
      await courseService.removeLike(id);
      setLiked(false);
    }else {
      await courseService.addLike(id);
      setLiked(true);
    }
  }
  const handleFavCourse = async() => {
    if(typeof id !== "string") return

    if(favorited === true) {
      await courseService.removeFav(id);
      setFavorited(false);
    }else {
      await courseService.addToFav(id);
      setFavorited(true);
    }
  }

  if(course === undefined) return <PageSpinner />

  return (
    <>
      <Head>
        <title>OneBitFlix - {course?.name}</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </Head>
      <main>
        <div 
          style={
            { 
              backgroundImage: `linear-gradient(to bottom, #6666661a, #151515), 
              url(${process.env.NEXT_PUBLIC_BASEURL}/${course?.thumbnailUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "34.375rem"
            }
          }>
          <HeaderAuth />
        </div>
        <Container className={styles.courseInfo}>
          <p className={styles.courseTitle}>{course?.name}</p>
          <p className={styles.courseDescription}>{course?.synopsis}</p>
          <Button
            outline
            className={styles.courseBtn}
            disabled={ course?.episodes?.length === 0 ? true : false }
          >
            ASSISTIR AGORA!
            <img src="/buttonPlay.svg" alt="buttonImg" className={styles.buttonImg}/>
          </Button>
          <div className={styles.interactions}>
            {liked === false ? (
              <img 
              src="/course/iconLike.svg" 
              alt="likeImage" 
              className={styles.interactionImage}
              onClick={handleLikeCourse}
            />
            ) : (
              <img 
              src="/course/iconLiked.svg" 
              alt="likeImage" 
              className={styles.interactionImage}
              onClick={handleLikeCourse}
            />
            )}

            {favorited === false ? (
              <img 
                src="/course/iconAddFav.svg" 
                alt="likeImage" 
                className={styles.interactionImage} 
                onClick={handleFavCourse}
              />
            ) : (
              <img 
                src="/course/iconFavorited.svg" 
                alt="likeImage" 
                className={styles.interactionImage} 
                onClick={handleFavCourse}
              />
            )}
            
          </div>
        </Container>
        <Container className={styles.episodeInfo}>
          <p className={styles.episodeDivision}>EPISÓDIOS</p>
          <p className={styles.episodeLength}>
            {course?.episodes?.length} episódios
          </p>
          {course?.episodes?.length === 0 ? (
            <strong>Não temos episodios ainda, volte outra hora! &#x1f606;&#x1f918;</strong>
          ) : (
            course?.episodes?.map((episode) => (
              <Link key={episode.id} href={`/episodes`} style={{ textDecoration: "none" }}>
                <EpisodeList episode={episode}/>
              </Link>
            ))
          )}
        </Container>
        <Footer />
      </main>
    </>
  )
}

export default CoursePage;