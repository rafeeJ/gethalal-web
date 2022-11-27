import { collection, getDocs } from 'firebase/firestore';
import { startCase } from 'lodash';
import Head from "next/head";
import { useRouter } from 'next/router';
import React from 'react';
import PacmanLoader from 'react-spinners/PacmanLoader';
import Layout from '../../components/Layout';
import RegionCard from '../../components/RegionCard';
import { db } from '../../firebase/clientApp';

const HeadContent = ({ region }) => {
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

export default function Region({ restaurants }) {
    const router = useRouter()
    const {
        query: { region },
    } = router;

    if (!restaurants) {
        return (
            <Layout>
                <PacmanLoader color="#36d7b7" />
            </Layout>
        )
    }

    return (
        <Layout head={<HeadContent region={region} />}>
            <div className='flex justify-center'>
                <RegionCard restaurants={restaurants} />
            </div>
        </Layout>
    )
}


export const getServerSideProps = async ({ params }) => {
    const region = params.region

    const rs = await getDocs(collection(db, `regions/${region}/restaurants`))
    const restaurantData = []
    rs.forEach((doc) => {
        restaurantData.push(doc.data())
    })

    if (restaurantData) {
        return {
            props: {
                restaurants: restaurantData
            }
        }
    } else {
        return {
            props: {
                restaurants: null
            }
        }
    }
}