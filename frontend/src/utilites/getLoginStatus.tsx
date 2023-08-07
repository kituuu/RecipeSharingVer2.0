'use client'
import { getDataWithAuthToken } from "@/api/fetchDataWithAuthToken";

export default async function getLoginStatus() {
	try {
		const authtoken = sessionStorage.getItem('auth-token');
		let isLoggedIn = false;
	
		if (authtoken) {
		  isLoggedIn = await getDataWithAuthToken('http://localhost:8000/auth/test_token', authtoken);
		}
	
		return isLoggedIn;
	  } catch (e) {
		console.log(e);
		return false;
	  }
		  
}
