import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
const RedirectPage = () => {
  let history = useHistory();

  const goTo = (url: string) => {
    history.push(url)
  }


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
    

      // goTo(redirectUrl)
    }
 

  }, [loaded, redirectUrl])

  return (
    <p>{`redirecting to ${redirectUrl}...`}</p>
  );
};

export default RedirectPage;
