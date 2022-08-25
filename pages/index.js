import Image from "next/future/image";
import Layout from "../components/Layout";

import screen from "../public/phone_images/screen.png"

import mapview from '../public/phone_images/mapview-phone.png'
import filterview from '../public/phone_images/filterview-phone.png'
import listview from '../public/phone_images/listview-phone.png'
import locationview from '../public/phone_images/locationview-phone.png'

export default function Home() {
  return (
    <Layout>
      <TextHeader />
      <div className="flex flex-col md:flex-row md:justify-center">
        {/* Left column */}
        <div className="px-10 py-2 md:mr-48">
          <Image src={mapview} alt="Screenshot of GetHalal" className="md:w-72"/>
        </div>

        {/* Right column */}
        <div className="flex flex-col justify-center md:pl-4">
          <Blurb className="break-words text-center md:text-left md:w-2/3 pt-6 md:pt-12 md:mb-8 self-center md:self-auto" />
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
      <text className="text-4xl font-semibold drop-shadow-xl">Find halal restaurants quick</text>
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
  return (
    <div className="rounded-md md:pb-16 text-center md:text-left">
      <div className="flex flex-col my-4">
        <text className="text-xl md:text-3xl font-semibold">Be the first to know when GetHalal is available.</text>
        <InputField placeholder="Enter your email" ratio={'2/3'} />
      </div>
      <div className="flex flex-col">
        <div>
          <text className="text-lg md:text-xl font-semibold">We want to be ready for you!</text>
          <br />
          <text>Share your city and we can make sure to gather restaurants near you.<br /> <text className="font-semibold"> (This is optional.)</text></text>
        </div>
        <InputField placeholder="Enter your city" />
      </div>
      {/* <StyledButton title="Submit" className="my-4 bg-yellow-200 mx-auto md:mx-0 animate-pulse" /> */}
      <div className="flex">
        <PulseButton title="Submit" className="bg-yellow-200" />
      </div>
    </div>
  )
}

const InputField = ({ placeholder, ratio }) => {
  var remainder
  if (ratio) {
    let t = ratio.split('/')
    let numerator = parseInt(t[0])
    let denominator = parseInt(t[1])
    remainder = `${denominator - numerator}/${denominator}`
  }

  return (
    <div className="flex flex-row">
      <div className={`rounded-lg p-1.5 bg-white flex border-2 border-black mt-2 w-screen ${ratio ? 'md:w-' + ratio : 'md:w-1/3'}`}>
        <input className="grow" placeholder={placeholder} style={{ backgroundColor: 'transparent' }} />
      </div>
      {/* <div className={`${ratio ? 'w-' + remainder : 'grow'}`} /> */}
    </div>
  )
}

const PulseButton = ({title, className}) => {
  return (
    <div id="ping" className={`relative py-1 my-4`}>
      <div className="absolute w-2 h-2 -right-0.5 top-0.5">
        <div className="w-2 h-2 bg-red-400 animate-ping absolute rounded-full"></div>
        <div className="w-2 h-2 bg-red-500 absolute rounded-full"></div>
      </div>
      <div id="button" className={`border-2 border-black px-8 py-1 rounded-lg ${className}`}>
        <button>{title}</button>
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