import ReactDOM from 'react-dom/client';
import {Suspense, StrictMode} from 'react';
import {HelmetProvider} from 'react-helmet-async';

import App from './App';
import {Auth0Provider} from "@auth0/auth0-react";
import {authConfig} from './config/auth_config';

// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <HelmetProvider>
        <Suspense fallback={<div>Loading...</div>}>
            <Auth0Provider
                domain={authConfig.domain}
                clientId={authConfig.clientId}
                authorizationParams={{
                    redirectUri: window.location.origin,
                    audience: authConfig.authorizationParams.audience,
                    scope: authConfig.authorizationParams.scope
                }}
            >
                <App/>
            </Auth0Provider>
        </Suspense>
    </HelmetProvider>
);
