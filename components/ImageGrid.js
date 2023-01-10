import Image from "next/future/image"
import filterview from '../public/phone_images/filterview-phone.png';
import listview from '../public/phone_images/listview-phone.png';
import locationview from '../public/phone_images/locationview-phone.png';

export const ImageGrid = () => {
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