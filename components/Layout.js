import React from 'react'
import DynamicHead from './DynamicHead'
import SiteFooter from './SiteFooter'
import SiteHeader from './SiteHeader'

export default function Layout({ children }) {
    return (
        <div className="flex flex-col min-h-screen justify-between">
            <DynamicHead />
            <SiteHeader />
            <main className="mb-auto mx-10">{children}</main>
            <SiteFooter />
        </div>
    )
}
