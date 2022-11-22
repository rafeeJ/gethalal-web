import { useRouter } from 'next/router'
import React from 'react'
import Layout from '../../components/Layout';
import RestaurantCard from '../../components/RestaurantCard';

export default function RestaurantPage() {
    const router = useRouter();
    const {
        query: { id },
      } = router
      return (
      <Layout>
        <div className='flex justify-center'>
        <RestaurantCard />

        </div>
      </Layout>);
  
}
