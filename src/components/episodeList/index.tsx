import { CourseType, EpisodeType } from "@/src/services/courseService";
import { useRouter } from "next/router";

import styles from "./styles.module.scss";

interface props {
  episode: EpisodeType,
  course: CourseType
}

const EpisodeList = ({ episode, course }: props) => {
  const router = useRouter();

  const handleSecondsToMin = (totalSeconds: number) => {
    const minutes = Math.floor( totalSeconds / 60);
    const seconds = totalSeconds % 60;

    function toString (num: number){
      return num.toString().padStart(2, "0");
    };

    const result = `${toString(minutes)}:${toString(seconds)}`;

    return result;
  };

  const handleEpisodePlayer = () => {
    router.push(`/course/episodes/${episode.order - 1}?courseid=${course.id}&episodeid=${episode.id}`)
  }

  return (
    <>
      <div className={styles.episodeCard} onClick={handleEpisodePlayer}>
        <div className={styles.episodeOrderTime}>
          <p className={styles.episodeOrder}>Episodio {episode.order}</p>
          <p className={styles.episodeTime}>{handleSecondsToMin(episode.secondsLong)}</p>
        </div>
        <div className={styles.episodeTitleDescription}>
          <p className={styles.episodeTitle}>Episodio {episode.name}</p>
          <p className={styles.episodeDescription}>
            {episode.synopsis}
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure natus nulla vero 
            praesentium vitae, delectus labore hic qui sit dolore non in quos unde! Tenetur, 
            architecto fuga quod maxime maiores, aut recusandae officia sunt repellendus natus 
            consectetur voluptate, aperiam atque! Laboriosam molestiae modi enim voluptatibus 
            cupiditate? Ipsum rerum deserunt esse!
            <br />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet ex possimus ut 
            quibusdam ad? Rem perferendis consectetur commodi eveniet dolorum ad sequi deserunt 
            nulla, sint, impedit qui sapiente ea molestias??
          </p>
        </div>
      </div>
    </>
  )
}

export default EpisodeList;