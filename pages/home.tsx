import FeaturedSection from '@/src/components/homeAuth/FeaturedSection'
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
      </main>
    </>
  )
}

export default HomeAuth