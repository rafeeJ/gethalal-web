import Image from "next/future/image";
import Layout from "../components/Layout";

import screen from "../public/phone_images/screen.png"

export default function Home() {
  return (
    <Layout>
      <TextHeader />
      <div className="flex flex-col md:flex-row grow md:justify-around">
        {/* Left column */}
        <div className="px-10 py-2 drop-shadow-2xl">
          <Image src={screen} alt="Screenshot of GetHalal"/>
        </div>

        {/* Right column */}
        <div className="my-8 md:my-auto">
          <SignUpForm />
        </div>
      </div>
      <Divider />
      {/* Feature columns go here? */}
    </Layout>
  )
}

const TextHeader = () => {
  return (
    <div className="text-center my-2 md:my-10">
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
    <div className="p-2 rounded-md">
      <div className="flex flex-col my-4">
        <text className="text-xl md:text-4xl font-semibold">Be the first to know when GetHalal is available.</text>
        <InputField placeholder="Enter your email"/>
      </div>
      <div className="flex flex-col">
        <div>
          <text className="font-semibold">We want to be ready for you! </text>
          <br/>
          <text>Share your city and we can make sure there are restaurants near you!</text>
        </div>
        <InputField placeholder="Enter your city"/>
      </div>
      <StyledButton title="Submit" color="red" className="my-4"/>
    </div>
  )
}

const InputField = ({ placeholder }) => {
  return (
    <div className="rounded-lg p-2 bg-white flex border-2 border-black">
      <input className="grow" placeholder={placeholder} style={{backgroundColor: 'transparent'}}/>
    </div>
  )
}

const StyledButton = ({ title, color, className}) => {
  return (
    <div className={`bg-${color}-200 flex w-24 rounded-lg border-black border-2 ${className}`}>
      <button className="grow">{title}</button>
    </div>
  )
}

const Divider = () => {
  return(
    <div style={{height: 1, width: 'auto', backgroundColor: 'gray', opacity: '30%'}} className="my-3"></div>
  )
}