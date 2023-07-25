import useSWR from "swr";
import courseService from "@/src/services/courseService";
import SlideComponent from "../../common/slideComponent";
import PageSpinner from "../../common/spinner";

import styles from "../../../../styles/slideCategory.module.scss"

const NewestCategory = () => {
  const { data, error } = useSWR("/newest", courseService.getNewestCourses)
  
  if(error){
    return error;
  }

  if(!data) {
    return ( 
      <>
        <PageSpinner />
      </>
    )
  }

  return (
    <>
      <p className={styles.titleCategory}>LANÇAMENTOS</p>
      <SlideComponent course={data.data}/>
    </>
  )
}

export default NewestCategory;