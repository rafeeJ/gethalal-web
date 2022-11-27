import { collection } from 'firebase/firestore';
import { useRouter } from 'next/router';
import React from 'react'
import { useCollectionDataOnce } from 'react-firebase-hooks/firestore';
import Layout from '../../components/Layout'
import { db } from '../../firebase/clientApp';
import PacmanLoader from 'react-spinners/PacmanLoader';

export default function Region() {
    const router = useRouter();
    const {
        query: { region },
    } = router;

    const [restaurants, loading, error, snapshot] = useCollectionDataOnce(
        region ?
            collection(db, `regions/${region}/restaurants`) :
            null, { initialValue: [] }
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
            {
                restaurants ?
                    restaurants.length > 0 ? restaurants.length : <>Not a valid region</> :
                    <PacmanLoader color="#36d7b7" />
            }
        </Layout>
    )
}
