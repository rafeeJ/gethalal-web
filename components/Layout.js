import React from 'react'
import DynamicHead from './DynamicHead'
import SiteFooter from './SiteFooter'
import SiteHeader from './SiteHeader'

export default function Layout({ children }) {
    return (
        <div className="flex flex-col min-h-screen justify-between bg-gradient-to-b from-gh-dg  to-gh-lg  pt-2 md:px-8 lg:px-20 lg:pt-5">
            <DynamicHead />
            <SiteHeader />
            <main className="mb-auto mx-10">{children}</main>
            <SiteFooter />
        </div>
    )
}
