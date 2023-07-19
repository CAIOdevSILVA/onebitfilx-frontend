import useSWR from "swr";
import categoryService, { CategoryType } from "@/src/services/categoriesServices"; 

import styles from "../../../../styles/slideCategory.module.scss";
import ListCategoriesSlides from "../listCategoriesSlides";


const ListCategories = () => {
  const { data, error } = useSWR("/categories", categoryService.getCategory)
  
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
      {data.data?.categories?.map((category: CategoryType) => (
        <ListCategoriesSlides 
          key={category.id} 
          categoryId={category.id}
          categoryName={category.name}
        />
      ))}
    </>
  )
}

export default ListCategories