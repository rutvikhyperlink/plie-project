import AsyncStorage from "@react-native-async-storage/async-storage";

export function setUserToken(userToken:any) {
 return new Promise((resolve, reject) => {
 try {
 AsyncStorage.setItem('loginUserToken',userToken)
 .then(() => resolve(true))
 .catch(e => reject(e));
 } catch (e) {
 reject(e);
 }
 });
}

export function getUserToken() {
 return new Promise((resolve, reject) => {
 try {
 AsyncStorage.getItem('loginUserToken')
 .then((data:any) => resolve(data))
 .catch(e => reject(e));
 } catch (e) {
 reject(e);
 }
 });
}