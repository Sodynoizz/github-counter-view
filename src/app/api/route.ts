import { NextRequest, NextResponse } from "next/server"
import { incrementViewCount, shortNumber } from "./handler"
import axios from "axios"

export async function GET(req: NextRequest) {
	const count = await incrementViewCount()
	const shortCount = shortNumber(count)

	const params = new URLSearchParams({
		label: "Views",
		logo: "github",
		message: shortCount,
		color: "purple",
		style: "for-the-badge",
	})

	const url = `https://img.shields.io/static/v1?${params.toString()}`

	try {
		const response = await axios.get(url, { responseType: "text" })
		const svg = response.data

		return new NextResponse(svg, {
			headers: {
				"Content-Type": "image/svg+xml",
				"Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
				Pragma: "no-cache",
				Expires: "0",
			},
		})
	} catch (error) {
		return new NextResponse("Error fetching SVG", { status: 500 })
	}
}
