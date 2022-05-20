import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {  useLocation } from "react-router-dom";
const RedirectPage = () => { 

  const [loaded, setLoaded] = useState(false);

  const location = useLocation()

  const [redirectUrl, setRedirectUrl] = useState('');

  const { t } = useTranslation();

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
    <div>{`${t('labels.redirectingTo')} ${redirectUrl}...`}</div>
  );
};

export default RedirectPage;
