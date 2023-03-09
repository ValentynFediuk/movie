'use client'

import { FeaturedMovies, FeaturedTVShows, NewReleases } from 'features'

const Home = () => (
  <main>
    <FeaturedMovies />
    <NewReleases />
    <FeaturedTVShows />
  </main>
)

export default Home
