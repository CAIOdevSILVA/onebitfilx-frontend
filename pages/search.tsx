import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import HeaderAuth from "@/src/components/common/headerAuth";
import courseService, { CourseType } from "@/src/services/courseService";
import SearchCard from "@/src/components/searchCard";

import styles from "../styles/search.module.scss";
import { Container } from "reactstrap";
import Footer from "@/src/components/common/footer";

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
      <main className={styles.main}>
        <div className={styles.headerFooterBg}>
          <HeaderAuth />
        </div>
        {searchResult?.length >= 1 ? (
          <div className={styles.searchResult}>
            <Container className="d-flex flex-wrap justify-content-center gap-5 py-">
              {searchResult?.map((course) => (
                <SearchCard key={course?.id} course={course}/>))
              }
            </Container>
          </div>
        ) : (
          <>
            <p className={styles.noSearchResult}>Nenhum resultado encontrado</p>
          </>
        )}
        <div className={styles.headerFooterBg}>
          <Footer />
        </div>
      </main>
    </>
  )
}

export default Search