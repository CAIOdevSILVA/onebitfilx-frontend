import FeaturedSection from '@/src/components/homeAuth/FeaturedSection'
import NewestCategory from '@/src/components/homeAuth/NewestCategory'
import FavoriteCategory from '@/src/components/homeAuth/favoriteCategory'
import FeaturedCategory from '@/src/components/homeAuth/featuredCategory'
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
      </main>
    </>
  )
}

export default HomeAuth