# Sample React client App

This is a sample React app using Apollo client to work with an Apollo Server.

Setup Okta:
- Create or use an Okta account (e.g. Use google account to login to okta [developer](hrrps://developer.okta.com) ). 
- Create an Okta (OIDC for SPA) application:
  - Grant type: 
    - Authorization Code
    - Implicit (hybrid) 
      - Allow ID Token with implicit grant type
      - Allow Access Token with implicit grant type
  - Sign-in redirect URIs: `http://localhost:3000/auth/OktaLogin`
  - Sign-out redirect URIs: `http://localhost:3000`
  - Save Client ID (`REACT_APP_OKTA_CLIENTID`) and Domain (`REACT_APP_OKTA_DOMAIN`) in the `.env` file.
  - [Grant cross-origin access](https://developer.okta.com/docs/guides/enable-cors/main/#grant-cross-origin-access-to-websites) to websites 
    - Add your website ([localhost](http://localhost:3000)) to the trusted origins in API security for CORS access
  - Create or use an Okta user to login to the app
    - Use the provided hint for Basic Login password
- To add and use custom claims:
  - Add custom claims to [Okta API security](https://developer.okta.com/docs/guides/customize-tokens-returned-from-okta/main/#add-a-custom-claim-to-a-token)
  - It would be available in the access or id tokens depending where it is added
  - Use [Okta Expression Language overview](https://developer.okta.com/docs/reference/okta-expression-language) to construct the value for the claim

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
