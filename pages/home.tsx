import Footer from '@/src/components/common/footer'
import PageSpinner from '@/src/components/common/spinner'
import FeaturedSection from '@/src/components/homeAuth/FeaturedSection'
import NewestCategory from '@/src/components/homeAuth/NewestCategory'
import FavoriteCategory from '@/src/components/homeAuth/favoriteCategory'
import FeaturedCategory from '@/src/components/homeAuth/featuredCategory'
import Listcategories from '@/src/components/homeAuth/listCategories'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const HomeAuth = () => {
  const router = useRouter();
  const [loading, setLoaging] = useState(true);

  useEffect(() => {
    if(!sessionStorage.getItem("onebitflix-token")){
      router.push("/login")
    }else{
      setLoaging(false);
    }
  }, [])

  if(loading) return <PageSpinner />

  return (
    <>
      <Head>
        <title>OneBitFlix - Home</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </Head>
      <main>
        <FeaturedSection />
        <NewestCategory />
        <FavoriteCategory />
        <FeaturedCategory />
        <Listcategories />
        <Footer />
      </main>
    </>
  )
}

export default HomeAuth