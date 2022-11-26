import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import Layout from '../../components/Layout';
import RestaurantCard from '../../components/RestaurantCard';
import { doc } from 'firebase/firestore';
import { useDocument } from 'react-firebase-hooks/firestore';
import { db } from '../../firebase/clientApp';

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
        <div>Loading</div>
      </Layout>

    )
  }

  return (
    <Layout>
      <div className='md:py-8'>
        <div className='flex justify-center'>
            {
              restaurant ? 
              restaurant.exists() ? <RestaurantCard restaurant={restaurant.data()} /> : <div>Restaurant Doesnt exist</div> :
              <div>Somethign down here</div>
            }
          </div>
      </div>
    </Layout>);

}
