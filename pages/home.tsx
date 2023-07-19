import Footer from '@/src/components/common/footer'
import FeaturedSection from '@/src/components/homeAuth/FeaturedSection'
import NewestCategory from '@/src/components/homeAuth/NewestCategory'
import FavoriteCategory from '@/src/components/homeAuth/favoriteCategory'
import FeaturedCategory from '@/src/components/homeAuth/featuredCategory'
import Listcategories from '@/src/components/homeAuth/listCategories'
import Head from 'next/head'

const HomeAuth = () => {
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