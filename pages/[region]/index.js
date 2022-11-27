import { collection } from 'firebase/firestore';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { useCollectionDataOnce } from 'react-firebase-hooks/firestore';
import Layout from '../../components/Layout'
import { db } from '../../firebase/clientApp';
import PacmanLoader from 'react-spinners/PacmanLoader';
import RegionCard from '../../components/RegionCard';
import Head from "next/head";
import { startCase } from 'lodash';

const HeadContent = ({region}) => {
    const router = useRouter()
    const currentUrl = `https://gethalal.app${router.asPath}`

    const meta = {
        title: `GetHalal | Restaurants in ${startCase(region)}`,
        description: `Find halal restaurants in ${startCase(region)}`,
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
        <Layout head={<HeadContent region={region}/>}>
            <div className='flex justify-center'>

                {
                    restaurants ?
                        restaurants.length > 0 ?
                            <RegionCard restaurants={restaurants} />
                            :
                            <>Not a valid region</> :
                        <PacmanLoader color="#36d7b7" />
                }
            </div>
        </Layout>
    )
}
