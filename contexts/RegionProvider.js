import { collection, getDocs, getDocsFromCache, getDocsFromServer } from "firebase/firestore";
import { startCase } from "lodash";
import { createContext, useEffect, useState } from "react";
import { useCollection, useCollectionOnce } from "react-firebase-hooks/firestore";
import { db } from "../firebase/clientApp";

export const RegionContext = createContext({})

export const RegionProvider = ({ children }) => {
    const [regions, setRegions] = useState(null)

    const checkRegion = async () => {
        const regions_temp = []
            const regions_references = await getDocsFromServer(collection(db, 'regions'))
            console.log(regions_references.docs)
            regions_references.forEach((doc) => {
                console.log(doc.id)
                regions_temp.push(doc.id)
            })
        setRegions(regions_temp)
    }

    useEffect(() => {
        if (!regions) {
            checkRegion()
        }
    }, [regions])

    return(
        <RegionContext.Provider value={{regions}}>
            { children }
        </RegionContext.Provider>
    )
   


   
}