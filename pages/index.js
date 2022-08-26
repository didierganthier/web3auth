import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import SignIn from './signin'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Metamask Authentification</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SignIn />
    </div>
  )
}
