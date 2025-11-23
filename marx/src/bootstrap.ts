import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { MarxApp } from './app/marx-app/marx-app';

bootstrapApplication(MarxApp, appConfig).catch((err) => console.error(err));
