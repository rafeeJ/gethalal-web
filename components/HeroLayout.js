import Image from "next/future/image"
import { SignUpForm } from "./SignupForm"
import mapview from '../public/phone_images/mapview-phone.png';
import { Suspense } from "react";
import { PacmanLoader } from "react-spinners";


export const HeroLayout = () => {
    // create a layout that uses css grid, with an image on the left and text on the right
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col justify-center items-center">
                <Image src={mapview} alt="Screenshot of GetHalal" className="w-48 md:w-72" />
            </div>
            <div className="flex flex-col justify-center items-center">
                <Suspense fallback={<PacmanLoader />}>
                    <SignUpForm />
                </Suspense>
            </div>
        </div >
    )
}