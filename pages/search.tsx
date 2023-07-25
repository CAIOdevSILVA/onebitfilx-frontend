import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import HeaderAuth from "@/src/components/common/headerAuth";
import courseService, { CourseType } from "@/src/services/courseService";

import styles from "../styles/search.module.scss";

const Search = () => {
  const [searchResult, setSearchResult] = useState<CourseType[]>([]);
  const router = useRouter();
  const searchName = router.query.name;

  const searchCourses = async() => {
    if(typeof searchName === "string"){
      const res = await courseService.getSearch(searchName);

      setSearchResult(res.data?.courses);
    };
  };
  
  useEffect(() => {
    searchCourses();
  }, [searchName])
  
  return (
    <>
      <Head>
        <title>Onebitflix - {searchName}</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </Head>
      <main>
        <HeaderAuth />
        {searchResult?.map((course) => (
          <div key={course?.id}>
            <p>{course?.name}</p>
          </div>
        ))}
      </main>
    </>
  )
}

export default Search