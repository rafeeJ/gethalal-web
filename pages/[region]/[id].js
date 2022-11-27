import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import Layout from '../../components/Layout';
import RestaurantCard from '../../components/RestaurantCard';
import { doc } from 'firebase/firestore';
import { useDocument } from 'react-firebase-hooks/firestore';
import { db } from '../../firebase/clientApp';
import PacmanLoader from 'react-spinners/PacmanLoader';
import Head from 'next/head';
import { startCase } from 'lodash';

const HeadContent = ({ restaurant }) => {
  const router = useRouter()
  const currentUrl = `https://gethalal.app${router.asPath}`

  const meta = {
      title: `GetHalal | ${startCase(restaurant)}`,
      description: `Find halal restaurants in ${startCase(restaurant)}`,
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

export default function RestaurantPage() {
  const router = useRouter();
  const {
    query: { region, id },
  } = router

  const [restaurant, loading, error] = useDocument(
    region && id ?
      doc(db, `regions/${region}/restaurants`, id) :
      null, { initLoading: true }
  )

  if (loading) {
    return(
      <Layout>
        <PacmanLoader color="#36d7b7" />
      </Layout>

    )
  }

  return (
    <Layout head={<></>}>
      <div className='md:py-8'>
        <div className='flex justify-center'>
            {
              restaurant ? 
              restaurant.exists() ? 
              <>
              <HeadContent restaurant={restaurant.data().name}/>
              <RestaurantCard restaurant={restaurant.data()} /> 
              </>
              : <div>Restaurant Doesnt exist</div> :
              <PacmanLoader color="#36d7b7" />
            }
          </div>
      </div>
    </Layout>);

}
