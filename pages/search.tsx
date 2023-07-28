import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import HeaderAuth from "@/src/components/common/headerAuth";
import courseService, { CourseType } from "@/src/services/courseService";
import SearchCard from "@/src/components/searchCard";

import styles from "../styles/search.module.scss";
import { Container } from "reactstrap";
import Footer from "@/src/components/common/footer";
import PageSpinner from "@/src/components/common/spinner";

const Search = () => {
  const [searchResult, setSearchResult] = useState<CourseType[]>([]);
  const [loading, setLoaging] = useState(true);
  const router = useRouter();
  const searchName = router.query.name;


  const searchCourses = async() => {
    if(typeof searchName === "string"){
      const res = await courseService.getSearch(searchName);

      setSearchResult(res.data?.courses);
    };
  };
  
  useEffect(() => {
    if(!sessionStorage.getItem("onebitflix-token")){
      router.push("/login")
    }else{
      setLoaging(false);
    }
  }, [])

  
  useEffect(() => {
    searchCourses();
  }, [searchName])
  
  if(loading) return <PageSpinner />

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
          <div className={styles.searchContainer}>
            <Container className="d-flex flex-wrap justify-content-center gap-5 py-">
              {searchResult?.map((course) => (
                <SearchCard key={course?.id} course={course}/>))
              }
            </Container>
          </div>
        ) : (
          <>
            <div className={styles.searchContainer}>
              <p className={styles.noSearchResult}>Nenhum resultado encontrado</p>
            </div>
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