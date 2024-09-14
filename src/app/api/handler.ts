﻿import { initializeApp } from "firebase/app"
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore"

const firebaseConfig = {
	apiKey: process.env.API_KEY,
	authDomain: process.env.AUTH_DOMAIN,
	projectId: process.env.PROJECT_ID,
	storageBucket: process.env.STORAGE_BUCKET,
	messagingSenderId: process.env.MESSAGING_SENDER_ID,
	appId: process.env.APP_ID,
	measurementId: process.env.MEASUREMENT_ID,
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export async function incrementViewCount(): Promise<number> {
	const docRef = doc(db, "viewCounter", "views")
	const docSnap = await getDoc(docRef)

	if (docSnap.exists()) {
		const count = docSnap.data().count
		await setDoc(docRef, { count: count + 1 })
		return count + 1
	} else {
		await setDoc(docRef, { count: 1 })
		return 1
	}
}

export function shortNumber(num: number): string {
	const units = ["", "K", "M", "B", "T"]
	let unitIndex = 0
	while (num >= 1000) {
		num /= 1000
		unitIndex++
	}
	return `${Math.round(num * 10) / 10}${units[unitIndex]}`
}
