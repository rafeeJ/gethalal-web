import { useRef, useState } from "react";
import { RegionDropdown } from "react-country-region-selector";
import { PulseButton } from "./PulseButton";

import ReactStoreBadges from "react-store-badges"

export const SignUpForm = () => {

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
                <p >Stay in the loop! Sign up to our mailing list.</p>
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
                    <p className="text-lg md:text-xl font-semibold">We want to be ready for you!</p>
                    <br />
                    <p>Share your region and we can make sure to gather restaurants near you.<br /> <p className="font-semibold"> (This is optional.)</p></p>
                </div>
                <RegionDropdown
                    className="shadow border rounded md:w-2/5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                    country="United Kingdom"
                    value={region}
                    onChange={(val) => setRegion(val)} />
            </div>

            <div className="font-mono mt-2">
                {errorMessage
                    ? errorMessage
                    : `We will only send emails when there are new updates. No spam.`}
            </div>
            <a className="flex" type="submit" style={{ WebkitAppearance: 'none', Appearance: 'none', MozAppearance: 'none' }}>
                <PulseButton title="Submit" className="bg-yellow-200" />
            </a>
        </form>
    )
}