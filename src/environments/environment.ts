// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl:'http://localhost:8091/user/authenticate',
  getUrl:'http://localhost:8091/giftRecord/get',
  editUrl:'http://localhost:8091/giftRecord/edit',
  deleteUrl:'http://localhost:8091/giftRecord/delete',
  addUrl:'http://localhost:8091/giftRecord/add',
  selectiveDeleteUrl:'http://localhost:8091/giftRecord/selectiveDelete'

  // apiUrl:'https://gift-record-service.herokuapp.com/user/authenticate',
  // getUrl:'https://gift-record-service.herokuapp.com/giftRecord/get',
  // editUrl:'https://gift-record-service.herokuapp.com/giftRecord/edit',
  // deleteUrl:'https://gift-record-service.herokuapp.com/giftRecord/delete',
  // addUrl:'https://gift-record-service.herokuapp.com/giftRecord/add',
  // selectiveDeleteUrl:'https://gift-record-service.herokuapp.com/giftRecord/selectiveDelete'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
