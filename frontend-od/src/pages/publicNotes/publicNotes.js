import * as React from 'react'
import {useKeycloak} from "@react-keycloak/web";

function PublicNotes() {
    const {keycloak} = useKeycloak();
    return <></>
}

export default PublicNotes;