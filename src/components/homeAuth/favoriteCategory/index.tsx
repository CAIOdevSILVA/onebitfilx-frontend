import useSWR from "swr";
import courseService from "@/src/services/courseService";
import SlideComponent from "../../common/slideComponent";
import styles from "../../../../styles/slideCategory.module.scss";

const FavoriteCategory = () => {
  const { data, error } = useSWR("/favorites", courseService.getFavCourses)
  
  if(error){
    return error;
  }

  if(!data) {
    return ( 
      <>
        <p>Loading...</p>
      </>
    )
  }
  return (
    <>
      <p className={styles.titleCategory}>MINHA LISTA</p>
      {data.data?.courses?.length >= 1 ? (
        <SlideComponent course={data.data?.courses}/>
      ) : (
        <>
          <p className="text-center pt-3 h5">
            <strong>Você não tem nenhum curso na lista</strong>
          </p>
        </>
      )}
    </>
  )
}

export default FavoriteCategory