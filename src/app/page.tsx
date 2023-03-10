'use client'

import {
  FeaturedMovies,
  FeaturedTVShows,
  NewReleases,
  TopRated,
} from 'features'

const Home = () => (
  <main>
    <FeaturedMovies />
    <NewReleases />
    <TopRated />
    <FeaturedTVShows />
  </main>
)

export default Home
