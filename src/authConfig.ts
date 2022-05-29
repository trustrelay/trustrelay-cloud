import { Configuration, LogLevel } from "@azure/msal-browser";


/**
 * Enter here the user flows and custom policies for your B2C application
 * To learn more about user flows, visit: https://docs.microsoft.com/en-us/azure/active-directory-b2c/user-flow-overview
 * To learn more about custom policies, visit: https://docs.microsoft.com/en-us/azure/active-directory-b2c/custom-policy-overview
 */
export const b2cPolicies = {
    names: {
        signUpSignIn: "B2C_1_signup_signin_v2",
        forgotPassword: "B2C_1_password_reset_v2",
        editProfile: "B2C_1_profile_edit_v2"
    },
    authorities: {
        signUpSignIn: {
            authority: "https://trustrelay.b2clogin.com/trustrelay.onmicrosoft.com/B2C_1_signup_signin_v2",
            scopes:[]
        },
        forgotPassword: {
            authority: "https://trustrelay.b2clogin.com/trustrelay.onmicrosoft.com/B2C_1_password_reset_v2",
            scopes:[]
        },
        editProfile: {
            authority: "https://trustrelay.b2clogin.com/trustrelay.onmicrosoft.com/B2C_1_profile_edit_v2",
            scopes:[]
        }
    },
    authorityDomain: "trustrelay.b2clogin.com"
}

export const getMsalConfig = () => {
var azureClientId = process.env.REACT_APP_AZURE_CLIENT_ID;


    return {
        auth: {
            clientId: azureClientId, // This is the ONLY mandatory field that you need to supply.
            authority: b2cPolicies.authorities.signUpSignIn.authority, // Use a sign-up/sign-in user-flow as a default authority
            knownAuthorities: [b2cPolicies.authorityDomain], // Mark your B2C tenant's domain as trusted. 
            redirectUri: `/redirect`, // Points to window.location.origin. You must register this URI on Azure Portal/App Registration.
            postLogoutRedirectUri: "/", // Indicates the page to navigate after logout.
            navigateToLoginRequestUrl: true, // If "true", will navigate back to the original request location before processing the auth code response.
        },
        cache: {
            cacheLocation: "localStorage", // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
            storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
        },
        system: {	
            loggerOptions: {	
                loggerCallback: (level:any, message:any, containsPii:any) => {	
                    if (containsPii) {		
                        return;		
                    }		
                    switch (level) {		
                        case LogLevel.Error:		
                            console.error(message);		
                            return;		
                        case LogLevel.Info:		
                           // console.info(message);		
                            return;		
                        case LogLevel.Verbose:		
                           // console.debug(message);		
                            return;		
                        case LogLevel.Warning:		
                            console.warn(message);		
                            return;		
                    }	
                }	
            }	
        }
    } as Configuration
}

/**
 * Configuration object to be passed to MSAL instance on creation. 
 * For a full list of MSAL.js configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md 
 */
export const msalConfig = {
    auth: {
        clientId: "TODO", // This is the ONLY mandatory field that you need to supply.
        authority: b2cPolicies.authorities.signUpSignIn.authority, // Use a sign-up/sign-in user-flow as a default authority
        knownAuthorities: [b2cPolicies.authorityDomain], // Mark your B2C tenant's domain as trusted. 
        redirectUri: `/redirect`, // Points to window.location.origin. You must register this URI on Azure Portal/App Registration.
        postLogoutRedirectUri: "/", // Indicates the page to navigate after logout.
        navigateToLoginRequestUrl: true, // If "true", will navigate back to the original request location before processing the auth code response.
    },
    cache: {
        cacheLocation: "localStorage", // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
        storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    },
    system: {	
        loggerOptions: {	
            loggerCallback: (level:any, message:any, containsPii:any) => {	
                if (containsPii) {		
                    return;		
                }		
                switch (level) {		
                    case LogLevel.Error:		
                        console.error(message);		
                        return;		
                    case LogLevel.Info:		
                       // console.info(message);		
                        return;		
                    case LogLevel.Verbose:		
                       // console.debug(message);		
                        return;		
                    case LogLevel.Warning:		
                        console.warn(message);		
                        return;		
                }	
            }	
        }	
    }
};
 
/**
 * Scopes you add here will be prompted for user consent during sign-in.
 * By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
 * For more information about OIDC scopes, visit: 
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
 */
export const loginRequest = {
   scopes: [],
   state:""
//    scopes: ["https://trustrelay.onmicrosoft.com/b63ab24a-9d3f-435c-a307-ba494565585b/Api.Access"] 

};

/**
 * An optional silentRequest object can be used to achieve silent SSO
 * between applications by providing a "login_hint" property.
 */
// const silentRequest = {
//   scopes: ["openid", "profile"],
//   loginHint: "example@domain.net"
// };

/**
 * Add here the endpoints and scopes when obtaining an access token for protected web APIs. For more information, see:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/resources-and-scopes.md
 */
 export const protectedResources = {
    api: {
        endpoint: "https://api.trustrelay.io/dashboard",
        //scopes: ["https://trustrelay.onmicrosoft.com/b63ab24a-9d3f-435c-a307-ba494565585b/Api.Access", "b63ab24a-9d3f-435c-a307-ba494565585b"], 
        scopes: ['b63ab24a-9d3f-435c-a307-ba494565585b']

    },
}
