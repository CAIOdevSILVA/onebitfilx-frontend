import useSWR from "swr";
import categoryService, { CategoryType } from "@/src/services/categoriesServices"; 
import PageSpinner from "../../common/spinner";
import ListCategoriesSlides from "../listCategoriesSlides";

import styles from "../../../../styles/slideCategory.module.scss";

const ListCategories = () => {
  const { data, error } = useSWR("/categories", categoryService.getCategory)
  
  if(error){
    return error;
  }

  if(!data) {
    return ( 
      <>
        <PageSpinner/>
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