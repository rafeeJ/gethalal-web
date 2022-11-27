import { collection } from 'firebase/firestore';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { useCollectionDataOnce } from 'react-firebase-hooks/firestore';
import Layout from '../../components/Layout'
import { db } from '../../firebase/clientApp';
import PacmanLoader from 'react-spinners/PacmanLoader';
import RegionCard from '../../components/RegionCard';

export default function Region() {
    const router = useRouter();
    const {
        query: { region },
    } = router;

    const [restaurants, loading, error, snapshot] = useCollectionDataOnce(
        region ?
            collection(db, `regions/${region}/restaurants`) :
            null, { initialValue: null }
    )

    if (loading) {
        return (
            <Layout>
                <PacmanLoader color="#36d7b7" />
            </Layout>
        )
    }

    return (
        <Layout>
                    <div className='flex justify-center'>

            {
                restaurants ?
                    restaurants.length > 0 ? 
                    <RegionCard restaurants={restaurants}/>
                    : 
                    <>Not a valid region</> :
                    <PacmanLoader color="#36d7b7" />
            }
            </div>
        </Layout>
    )
}
