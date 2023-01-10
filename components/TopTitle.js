import { useContext } from "react"
import { RegionContext } from "../contexts/RegionProvider"
import RegionTitle from "./RegionTitle"
import RegularTitle from "./RegularTitle"

export const TopTitle = () => {
    const { regions } = useContext(RegionContext)
    return (
        <div className="text-center my-2 md:my-4 z-1">
            {
                regions ? <RegionTitle regions={regions} /> : <RegularTitle />
            }
            <div className="font-light text-2xl">
                <text>Easy to use, no tracking.</text>
                <br />
                <text>Just good food.</text>
            </div>
        </div>
    )
}