import { useRouter } from 'next/router'
import React from 'react'
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

  if (error) {
    <div>{error}</div>
  }

  return (
    <Layout>
      {
        loading ? <></> :
          <div className='flex justify-center'>
            {
              restaurant &&
              <RestaurantCard restaurant={restaurant.data()} />
            }
          </div>
      }
    </Layout>);

}
