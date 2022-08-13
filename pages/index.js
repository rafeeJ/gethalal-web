import Image from "next/future/image";
import Layout from "../components/Layout";

import screen from "../public/phone_images/screen.png"

export default function Home() {
  return (
    <Layout>
      <TextHeader />
      <div className="flex flex-row grow">
        <div>
          <Image src={screen} alt="Screenshot of GetHalal" />
        </div>
        <div className="grow p-4">
          <SignUpForm />
        </div>
      </div>
    </Layout>
  )
}

const TextHeader = () => {
  return (
    <div className="text-center">
      <text className="text-4xl font-semibold">Find Halal Restaurants quick</text>
      <br />
      <div className="font-light text-2xl">
        <text>Easy to use, no tracking.</text>
        <br />
        <text>Just good food.</text>
      </div>
    </div>
  )
}

const SignUpForm = () => {
  return (
    <div>
      <div className="flex flex-col">
        <text>Be the first to know when we release.</text>
        <InputField />
      </div>
      <div className="flex flex-col">
        <text className="font-semibold">We want to be ready for you! </text>
        <text>Share your city and we can make sure there are restaurants near you!</text>
        <InputField />
      </div>
    </div>
  )
}

const InputField = () => {
  return (
    <div className="rounded-lg p-1 bg-red-100 flex">
      <input className="grow"/>
    </div>
  )
}