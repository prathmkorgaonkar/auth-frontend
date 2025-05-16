import { ApplicationConfig } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AppRoutingProviders } from './app.routes';
import { AuthInterceptor } from './auth/auth.intercepter';

export const appConfig: ApplicationConfig = {
  providers: [
    AppRoutingProviders,
    provideHttpClient(withInterceptors([AuthInterceptor])),
  ],
};
