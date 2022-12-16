import { collection, getDocs, getDocsFromCache, getDocsFromServer } from "firebase/firestore";
import { startCase } from "lodash";
import { createContext, useEffect, useState } from "react";
import { useCollection, useCollectionOnce } from "react-firebase-hooks/firestore";
import { db } from "../firebase/clientApp";

export const RegionContext = createContext({})

export const RegionProvider = ({ children }) => {
    const [regions, setRegions] = useState(null)

    // get all regions from firestore and add to state
    const [value, loading, error] = useCollectionOnce(
        collection(db, 'regions'),
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        }
    )

    useEffect(() => {
        if (value) {
            const regions_temp = []
            value.forEach((doc) => {
                regions_temp.push(doc.id)
            })
            setRegions(regions_temp)
        }
    }, [value])

    return(
        <RegionContext.Provider value={{regions}}>
            { children }
        </RegionContext.Provider>
    )   
}