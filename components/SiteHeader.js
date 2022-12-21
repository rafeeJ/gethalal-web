import React, { Fragment, useContext, useEffect } from 'react'
import Image from "next/future/image"

import icon from '../public/icon.svg'
import Link from 'next/link'
import { Menu } from '@headlessui/react'
import { RegionContext } from '../contexts/RegionProvider'

export default function SiteHeader() {
    const {regions} = useContext(RegionContext)
    return (
        <div className='flex h-10 m-2'>
            <Link href={'/'}>
                <div className='flex flex-row items-center'>
                    <Image src={icon} alt='logo' style={{ width: 40, height: 40 }} />
                    <text className='text-2xl'>GetHalal</text>
                </div>
            </Link>
            {/* <div className='flex grow'/>
            <Menu>
                <Menu.Button className="font-serif">Find Restaurants in</Menu.Button>
                <Menu.Items>
                    {
                        regions?.map((item, idx) => (
                            <Menu.Item key={idx} as={Fragment}>
                                {({ active }) => (
                                    <div className={`${ active ? 'bg-blue-500 text-white' : 'bg-white text-black'} z-2`}>
                                        {item}
                                    </div>
                                )}
                            </Menu.Item>
                        ))
                    }
                </Menu.Items>
            </Menu> */}
        </div>
    )
}
