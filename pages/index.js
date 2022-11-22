import Image from "next/future/image";
import Layout from "../components/Layout";


import { logEvent } from "firebase/analytics";
import { useRef, useState } from "react";
import { RegionDropdown } from "react-country-region-selector";
import { analytics } from "../firebase/clientApp";

import ReactStoreBadges from "react-store-badges"

import filterview from '../public/phone_images/filterview-phone.png';
import listview from '../public/phone_images/listview-phone.png';
import locationview from '../public/phone_images/locationview-phone.png';
import mapview from '../public/phone_images/mapview-phone.png';

export default function Home() {
  return (
    <Layout>
      <TextHeader />
      <div className="flex flex-col md:flex-row md:justify-center">
        {/* Left column */}
        <div className="px-10 py-2 md:mr-48">
          <Image src={mapview} alt="Screenshot of GetHalal" className="md:w-72" />
        </div>

        {/* Right column */}
        <div className="flex flex-col justify-center md:pl-4">
          {/* <Blurb className="break-words text-center md:text-left md:w-2/3 pt-6 md:pt-12 md:mb-8 self-center md:self-auto" /> */}
          <SignUpForm />
        </div>
      </div>
      <Divider />
      {/* Feature columns go here? */}
      <ContentGrid />
    </Layout>
  )
}

const TextHeader = () => {
  return (
    <div className="text-center my-2 md:my-4">
      <text className="text-4xl font-semibold drop-shadow-xl">Find halal restaurants. <text className="font-bold">Fast.</text></text>
      <br />
      <div className="font-light text-2xl">
        <text>Easy to use, no tracking.</text>
        <br />
        <text>Just good food.</text>
      </div>
    </div>
  )
}

const Blurb = ({ className }) => {
  return (
    <div className={className}>
      <text className="md:text-2xl font-semibold">We set out on a mission: <br /> </text>
      <text className="md:text-xl">Make a simple, and beautiful app to help you locate local halal eateries.<br /></text>
    </div>
  )
}

const SignUpForm = () => {

  const [errorMessage, setErrorMessage] = useState('');
  const [region, setRegion] = useState('')

  const emailInput = useRef(null)
  const cityInput = useRef(null)

  const subscribe = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/subscribe', {
      body: JSON.stringify({
        email: emailInput.current.value,
        city: region
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    });

    const { error } = await res.json();

    if (error) {
      // 4. If there was an error, update the message in state.
      setErrorMessage(error);

      return;
    }

    // 5. Clear the input value and show a success message.
    emailInput.current.value = '';
    setRegion('')
    setErrorMessage('Success! 🎉 You are now subscribed to the newsletter.');

    logEvent(analytics, 'sign_up')
  }


  return (
    <form onSubmit={subscribe} className="rounded-md md:pb-16 text-center md:text-left">
      <div className="flex flex-col my-4">
        <text className="text-xl md:text-3xl font-semibold">GetHalal is available now!</text>
        <div className="flex md:py-2 md:mb-5 justify-center md:justify-start" onClick={() => logEvent(analytics, 'app_link_clicked')}>
        <ReactStoreBadges 
        platform={'ios'}
        url={'https://apps.apple.com/gb/app/gethalal-halal-food-near-you/id1637426257'}
        locale={'en-us'}/>
        </div>
        <text >Stay in the loop! Sign up to our mailing list.</text>
        <input
          className="shadow appearance-none border rounded md:w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
          id="email-input"
          name="email"
          placeholder="you@awesome.com"
          ref={emailInput}
          required
          type="email" />
      </div>
      <div className="flex flex-col">
        <div>
          <text className="text-lg md:text-xl font-semibold">We want to be ready for you!</text>
          <br />
          <text>Share your region and we can make sure to gather restaurants near you.<br /> <text className="font-semibold"> (This is optional.)</text></text>
        </div>
        <RegionDropdown
        className="shadow border rounded md:w-2/5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
        country="United Kingdom"
        value={region}
        onChange={(val) => setRegion(val)}/>
      </div>

      <div className="font-mono mt-2">
        {errorMessage
          ? errorMessage
          : `We will only send emails when there are new updates. No spam.`}
      </div>
      <a className="flex" type="submit" style={{WebkitAppearance: 'none', Appearance: 'none', MozAppearance: 'none'}}>
        <PulseButton title="Submit" className="bg-yellow-200"/>
      </a>
    </form>
  )
}

const PulseButton = ({ title, className, type}) => {
  return (
    <div id="ping" className={`relative py-1 my-4`}>
      {/* <div className="absolute w-2 h-2 -right-0.5 top-0.5">
        <div className="w-2 h-2 bg-red-400 animate-ping absolute rounded-full"></div>
        <div className="w-2 h-2 bg-red-500 absolute rounded-full"></div>
      </div> */}
      <div id="button" className={`flex border rounded-lg shadow appearance-none ${className}`}>
        <button className="grow px-8 py-1">{title}</button>
      </div>
    </div>
  )
}

const Divider = () => {
  return (
    <div style={{ height: 1, width: 'auto', backgroundColor: 'gray', opacity: '30%' }} className="my-3"></div>
  )
}

const ContentGrid = () => {
  return (
    <div className="grid gap-8 md:gap-16 grid-cols-1 md:grid-cols-3">
      <ImageCard imageSrc={listview} alt={'A pic of GetHalal'} title='Info at a glance'>
        <text>Check out a restaurant&apos;s Google rating and what they serve from the list view.</text>
      </ImageCard>
      <ImageCard imageSrc={filterview} alt={'A pic of GetHalal'} title='Precise filtering'>
        <text>You can filter restaurants so you know what to expect!</text>
      </ImageCard>
      <ImageCard imageSrc={locationview} alt={'A pic of GetHalal'} title='Location optional'>
        <text>Search for restaurants around you, or simply type in a location to see what&apos;s there.</text>
      </ImageCard>
    </div>
  )
}

const ImageCard = ({ imageSrc, alt, children, title }) => {
  return (
    <div className="flex flex-col rounded-lg items-center">
      <text className="text-4xl font-semibold my-2">{title}</text>
      <text className="text-sm mb-2">{children}</text>
      <Image src={imageSrc} alt={alt} className='w-48 md:w-72' />
    </div>
  )
}