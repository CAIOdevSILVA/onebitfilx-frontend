import FeaturedSection from '@/src/components/homeAuth/FeaturedSection'
import NewestCategory from '@/src/components/homeAuth/NewestCategory'
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
      </main>
    </>
  )
}

export default HomeAuth