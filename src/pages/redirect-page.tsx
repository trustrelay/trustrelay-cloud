import { useEffect, useState } from "react";
import {  useLocation } from "react-router-dom";
const RedirectPage = () => { 

  const [loaded, setLoaded] = useState(false);

  const location = useLocation()

  const [redirectUrl, setRedirectUrl] = useState('');

  useEffect(() => { 
    const searchParams = new URLSearchParams(location.hash.replace("#","?"))
    const stateValue = searchParams.get("state")

    const toUrl = stateValue?.split("|")[1]
    if (toUrl && toUrl.length > 0) {
      setRedirectUrl(toUrl)
      setLoaded(true)
    }
    if (loaded) {
     
    }
 

  }, [loaded, redirectUrl, location.hash])

  return (
    <div>{`redirecting to ${redirectUrl}...`}</div>
  );
};

export default RedirectPage;
