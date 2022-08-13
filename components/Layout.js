import React from 'react'
import DynamicHead from './DynamicHead'
import SiteFooter from './SiteFooter'
import SiteHeader from './SiteHeader'

export default function Layout({ children }) {
    return (
        <div className="flex flex-col min-h-screen justify-between bg-gh-lg md:px-32 md:pt-5">
            <DynamicHead />
            <SiteHeader />
            <main className="mb-auto mx-10">{children}</main>
            <SiteFooter />
        </div>
    )
}
