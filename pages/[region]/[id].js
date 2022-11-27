import { doc, getDoc } from 'firebase/firestore';
import { startCase } from 'lodash';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import PacmanLoader from 'react-spinners/PacmanLoader';
import Layout from '../../components/Layout';
import RestaurantCard from '../../components/RestaurantCard';
import { db } from '../../firebase/clientApp';

const HeadContent = ({ restaurant }) => {
  const router = useRouter()
  const currentUrl = `https://gethalal.app${router.asPath}`

  const meta = {
    title: `GetHalal | ${startCase(restaurant)}`,
    description: `Find out more about ${startCase(restaurant)} in the GetHalal app.`,
    type: "website",
  };

  return (
    <Head>
      <title>{meta.title}</title>
      <meta name="robots" content="follow, index" />
      <meta content={meta.description} name="description" />
      <meta
        property="og:url"
        content={currentUrl}
      />
      <link
        rel="canonical"
        href={currentUrl}
      />
      <meta property="og:type" content={meta.type} />
      <meta property="og:site_name" content="GetHalal" />
      <meta property="og:description" content={meta.description} key="desc" />
      <meta property="og:title" content={meta.title} />
    </Head>
  )
}

export default function RestaurantPage({ restaurant }) {

  if (!restaurant) {
    return (
      <Layout>
        <PacmanLoader color="#36d7b7" />
      </Layout>
    )
  }

  return (
    <Layout head={<HeadContent restaurant={restaurant.name} />}>
      <RestaurantCard restaurant={restaurant} />
    </Layout>
  );
}

export const getServerSideProps = async ({ params }) => {
  const id = params.id
  const region = params.region

  const r = doc(db, `regions/${region}/restaurants`, id)
  const docSnap = await getDoc(r)

  if (docSnap.exists()) {
    return {
      props: {
        restaurant: docSnap.data()
      }
    }
  } else {
    return {
      props: {
        restaurant: null
      }
    }
  }
}