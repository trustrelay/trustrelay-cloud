import moment from 'moment'; 
import Countries from './models/iso3-countries'
import _ from 'lodash'

export const isEmptyObject = (obj: any) => {
  if(obj){
  return Object.keys(obj).length === 0;
  } else{
    return true;
  }
};

export const getCurrentTenant = () => {
  return window.location.pathname.split('/')[2];
};

export const getCurrentTab = () => {
  return window.location.pathname.split('/')[3];
};

export const formatDate = (value: Date | string): string => (value ? moment(value).format('DD/MM/YYYY') : '');

export const formatDateTime = (value: string): string => {
  return `${moment(value).format('MMM Do, hh:mm:ss A')}`;
};

export const sortByTime = (items: any, fieldName: string) =>
  items.sort((a: any, b: any) => (moment.utc(a[fieldName]).isAfter(moment.utc(b[fieldName])) ? -1 : 1));

 

export const capitalizeString = (s: string): string => s.charAt(0).toUpperCase() + s.slice(1);

export const getTimestampFormat = (x: any, timeRange: string) => {
  if (timeRange === '30m') {
    const regex = /(0|5)$/g;
    return x.match(regex) ? x : null;
  } else if (timeRange === '1h') {
    const regex = /0$/g;
    return x.match(regex) ? x : null;
  } else if (timeRange === '1d') {
    if (+x.substring(0, x.length - 3) % 3 === 0) {
      return x;
    }
  } else {
    return x;
  }
};

export const getBigNumberFormat = (y: any) => {
  if (y < 1000) return y;
  if (y > 100000) return Math.floor(y / 1000) + 'k';
  return (y / 1000).toFixed(1) + 'k';
};

export const generateRandomColor = () =>
{
    var randomColor = '#'+Math.floor(Math.random()*16777215).toString(16);
    return randomColor; 
}

export const getCountryNameByIsoCode = (iso:string) => {
   return _.find(Countries,(x)=>x.code===iso.toUpperCase())?.name
}