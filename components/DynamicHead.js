import React from "react";
import Head from "next/head";
import { useRouter } from 'next/router'

export default function DynamicHead() {
    const router = useRouter()
    const currentUrl = `https://gethalal.app${router.asPath}`
    
    const meta = {
      title: `GetHalal | Time for Dinner`,
      description: `GetHalal - Sign up to our mailing list!`,
      type: "website",
    };

    return (
      <div>
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
          <meta property="og:description" content={meta.description} key="desc"/>
          <meta property="og:title" content={meta.title} />
          <meta property="og:image" content={meta.image} />
        </Head>
      </div>
    )
}
