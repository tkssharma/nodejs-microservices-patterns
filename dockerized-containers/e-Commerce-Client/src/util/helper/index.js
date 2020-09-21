
export  default class Util{
  static validateEmail(email){
     var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   return re.test(email);
  }
  static getFileName( url ) {
   return url ? url.split('/').pop() : null;
 }
 static uid() {
   return Math.random().toString(34).slice(2);
 }
}