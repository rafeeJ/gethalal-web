import React from 'react'
import Layout from '../../components/Layout'
import { privacy } from '../../helper/support'

export default function Privacy() {
  return (
   <Layout>
    <div dangerouslySetInnerHTML={privacy()}/>
   </Layout>
  )
}
