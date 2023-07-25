import categoryService from '@/src/services/categoriesServices';
import useSWR from 'swr';
import SlideComponent from '../../common/slideComponent';
import PageSpinner from '../../common/spinner';

import styles from "../../../../styles/slideCategory.module.scss";

interface props {
  categoryId: number,
  categoryName: string
}

const ListCategoriesSlides = ({ categoryId, categoryName }:props) => {
  const { data, error } = useSWR(`/categoriesCourses${categoryId}`, 
    () => categoryService.getCourses(categoryId)
  );
  
  if(error){
    return error;
  }

  if(!data) {
    return ( 
      <>
        < PageSpinner/>
      </>
    )
  }

  return (
    <>
      <p className={styles.titleCategory}>{categoryName}</p>
      <SlideComponent course={data.data?.courses}/>
    </>
  )
}

export default ListCategoriesSlides