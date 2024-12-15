import React from 'react';

import Navbar from '../Components/Navbar.tsx';
import Layout from '../Components/Layout.tsx';
import Hero from '../Components/Hero.tsx';
import SpecialityList from '../Components/SpecialityList.tsx';
import TopDoctos from '../Components/TopDoctos.tsx';
import EndBanner from '../Components/EndBanner.tsx';
import Footer from '../Components/Footer.tsx';

const Home = () => {
  return (
    <Layout>
        {/* navbar  */}
           <Navbar />
          {/* page data  */}
          <main>
                 <Hero />
                 <SpecialityList />
                 <TopDoctos />
                 <EndBanner />
                 <Footer />
          </main>
    </Layout>
  )
}

export default Home
