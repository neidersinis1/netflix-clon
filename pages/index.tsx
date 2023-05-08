import React from 'react';
import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';

import Navbar from '@/components/Navbar';
import Billboard from '@/components/Billboard';
import MovieList from '@/components/MoviesList';
import InfoModal from '@/components/InfoModal';
import useMovieList from '@/hooks/useMoviesList';
import useFavorites from '@/hooks/useFavorites';
import useInfoModalStore from '@/hooks/useInfoModalStore';

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
}

const Home = () => {
  const { data: movies = [] } = useMovieList();
  const { data: favorites = [] } = useFavorites();
  const {isOpen, closeModal} = useInfoModalStore();

  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieList title="Trending Now" data={movies} />
        <MovieList title="My List" data={favorites} />
      </div>
    </>
  )
}

export default Home;

// import useCurrentUser from "@/hooks/useCurrentUser";
// import { NextPageContext } from "next";
// import { getSession, signOut } from "next-auth/react";
// import Navbar from "@/components/Navbar";
// import Billboard from "@/components/Billboard";
// import MoviesList from "@/components/MoviesList";
// import useMoviesList from "@/hooks/useMoviesList";
// import useFavorites from "@/hooks/useFavorites";
// import InfoModal from "@/components/InfoModal";
// import useInfoModal from "@/hooks/useInfoModal";


// export async function getServerSideProps(context: NextPageContext) {
//   const session = await getSession(context);

//   if (!session) {
//     return {
//       redirect: {
//         destination: "/auth",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {},
//   };
// }

// export default function Home() {
//   const { data: movies = [] } = useMoviesList();
//   const { data: favorites = [] } = useFavorites();
//   const { isOpen, closeModal } = useInfoModal()

//   return (
//     <>
//     <InfoModal visible={isOpen} onClose={closeModal} />
//       <Navbar />
//       <Billboard />
//       <div className="pb-40">
//       <MoviesList title='Trending Now' data={movies} />
//       <MoviesList title='My List' data={favorites} />
//       </div>
//     </>
//   );
// }
