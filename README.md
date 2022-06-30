#  TrustRelay Dashboard


## How to run for UI development only with API running on cloud sandbox

`npm run localsandbox`

## How to run for all local development

`npm run start`

## Hookrouter situation

`npm install git+ssh://git@github.com/alvaradojl/hookrouter.git` failed

git clone official hookrouter
fixed Link.js bug
npm run build
copy lib folder to node_modules/hookrouter succeeded

## install material ui

npm install @material-ui/core@next @emotion/react @emotion/styled

npm install @material-ui/lab@next

npm install @material-ui/icons@next


## Active directory

The application must be configured as SPA and not as Web

### new user attribute

The attribute `newUser: true` will only appear if the user registered through the sign up page.
If the user is created through the Graph API this attribute will NOT appear.

## Google Chrome Developer Console Warnings

There were some warnings related to external chrome plugins,
I deactivated those warnings by going to developer console > settings > tick Selected context only


## Azure resources used
- Azure Storage (with static website setting enabled)
  - Updated custom domain with asverify
- Azure DNS (trustrelay.io)
  - A: set alias resource type true
  - CNAME: www
- Azure Certificate Service (SSL trustrelay.io, trustrelay.io)
- Azure CDN (with custom hostnames: trustrelay.io, trustrelay.io)
  - Manage CDN instance
    - Rules Engine:
      - HTTP to HTTPS
      - Redirect to WWW
      - HSTS Header
      - Client redirection

# tip
- After deployment with Azure Devops, Purge the CDN

# references
- https://medium.com/@squalrus/cutting-hosting-costs-by-99-with-static-websites-on-azure-44483b6b2c3f
- https://medium.com/@squalrus/using-azure-static-websites-for-production-b4c88e1c3a9e
- https://medium.com/@antbutcher89/hosting-a-react-js-app-on-azure-blob-storage-azure-cdn-for-ssl-and-routing-8fdf4a48feeb


# eggplant

install webpack

then run

 ./node_modules/webpack-cli/bin/cli.js --config=config/webpack.js --scope core --rulesTarget current --mode production




# CDN policy

to get the CUSTOMER ORIGIN needed in the source parameter then create a rule ORIGIN -> CUSTOMER ORIGIN (you will see the path provided)
<policy>
    <rules>
        <rule>
            <description>Redirect To HTTPS</description>
            <match.request.request-scheme.literal value="http">
                <feature.url.url-redirect source="/80110592/trustrelayweb/(.*)" destination="https://%{host}/$1" code="301"/>
            </match.request.request-scheme.literal>
        </rule>
        <rule>
            <description>HSTS Header</description>
            <match.always>
                <feature.headers.modify-client-response-header action="set" name="Strict-Transport-Security" value="max-age=31536000"/>
            </match.always>
        </rule>
        <rule>
            <description>Redirect to www from naked domain</description>
            <match.request.edge-cname.literal hostnames="www.trustrelay.io">
                <feature.url.url-redirect source="/80110592/trustrelayweb/(.*)" destination="https://www.trustrelay.io/$1" code="301"/>
            </match.request.edge-cname.literal>
        </rule>
        <rule>
            <description>Redirect to www from edge</description>
            <match.request.edge-cname.literal hostnames="trustrelayweb.azureedge.net">
                <feature.url.url-redirect source="/80110592/trustrelayweb/(.*)" destination="https://www.trustrelay.io/$1" code="301"/>
            </match.request.edge-cname.literal>
        </rule>
        <rule>
            <description>Rewrite</description>
            <match.always>
                <feature.url.url-rewrite source="/80110592/trustrelayweb/[^?.]*(\?.*)?$" destination="/80110592/trustrelayweb/index.html"/>
            </match.always>
        </rule>
        <rule>
            <description>Url slash</description>
            <match.url.url-path.regex result="match" value="[a-zA-Z0–9_]+(?!/)$" ignore-case="false">
                <feature.url.url-redirect source="/80110592/trustrelayweb/(.*)" destination="https://www.trustrelay.io/$1" code="301"/>
            </match.url.url-path.regex>
        </rule>
    </rules>
</policy>