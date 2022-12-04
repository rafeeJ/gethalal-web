import React from 'react'
import Layout from '../../components/Layout'
import { privacy } from './support'

export default function Privacy() {
  return (
   <Layout>
    <div dangerouslySetInnerHTML={privacy()}/>
   </Layout>
  )
}
