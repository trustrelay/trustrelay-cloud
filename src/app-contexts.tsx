import React, { Dispatch, SetStateAction } from 'react';

import {  Theme } from '@mui/material'; 

import {AppNotification, Membership} from './api/models/models'

export enum ToastMessageType {
  Info = 'Info',
  Error = 'Error',
  Success = 'Success',
  Warning = 'Warning',
  Closed = 'Closed',
}

export type ToastMessageInfo = {
  messageType: ToastMessageType;
  message: string;
  title: string;
  open: boolean;
}

export type ToastContextType = {
  toastState: ToastMessageInfo,
  setToastState: Dispatch<SetStateAction<ToastMessageInfo>>;
}

export type AppContextType = {
  brandName: string;
  brandTheme: string;
};

export type CustomThemeContextType = {
  theme: Theme|null;
  setTheme: Dispatch<SetStateAction<Theme>>;
}

export const APP_CONTEXT_DEFAULT: AppContextType = {
  brandName: 'trustrelay',
  brandTheme: 'trustrelay',
};

export const THEME_CONTEXT_DEFAULT: CustomThemeContextType = {
  theme: null,
  setTheme: () => { }
}

export const APP_NOTIFICATIONS_CONTEXT_DEFAULT: AppNotificationsContextType = {
  trustRelayNotificationsState:[],
  setTrustRelayNotificationsState: () => {}
}

export const APP_PUSH_NOTIFICATION_CONTEXT_DEFAULT: AppPushNotificationContextType = {
  trustRelayPushNotificationState:"",
  setTrustRelayPushNotificationState: ()=> {}
}

export const TOAST_CONTEXT_DEFAULT: ToastContextType = {
  toastState: {
    messageType: ToastMessageType.Info,
    message: '',
    title: '',
    open: false
  },
  setToastState: () => { }
}

export const DATASPACE_CONTEXT_DEFAULT: DataspaceContextType = {
  dataspaceState:null,
  setDataspaceState: ()=> {}
}

export const MEMBERSHIPS_CONTEXT_DEFAULT: MembershipsContextType = {
  membershipsState: [],
  setMembershipsState: () => {}
}

export type AppNotificationsContextType = {
  trustRelayNotificationsState: Array<AppNotification>,
  setTrustRelayNotificationsState: Dispatch<SetStateAction<Array<AppNotification>>>;
}

export type AppPushNotificationContextType = {
  trustRelayPushNotificationState: string,
  setTrustRelayPushNotificationState: Dispatch<SetStateAction<string>>;
}

export type DataspaceContextType = {
  dataspaceState: string|null,
  setDataspaceState: Dispatch<SetStateAction<string|null>>;
}

export type MembershipsContextType = {
  membershipsState: Array<Membership>,
  setMembershipsState: Dispatch<SetStateAction<Array<Membership>>>;
}
 
export const ToastContext = React.createContext<ToastContextType>(TOAST_CONTEXT_DEFAULT);

export const CustomThemeContext = React.createContext<CustomThemeContextType>(THEME_CONTEXT_DEFAULT);

export const AppNotificationsContext = React.createContext<AppNotificationsContextType>(APP_NOTIFICATIONS_CONTEXT_DEFAULT);

export const AppPushNotificationContext = React.createContext<AppPushNotificationContextType>(APP_PUSH_NOTIFICATION_CONTEXT_DEFAULT);

export const DataspaceContext = React.createContext<DataspaceContextType>(DATASPACE_CONTEXT_DEFAULT);

export const MembershipsContext = React.createContext<MembershipsContextType>(MEMBERSHIPS_CONTEXT_DEFAULT);