import { NextRequest, NextResponse } from "next/server";
import { getUserMe } from "./lib/data/services/get-user-me";

export async function middleware(req: NextRequest) {
	const user = await getUserMe();
	const currentPath = req.nextUrl.pathname;

	if (currentPath.startsWith("/dashboard") && user?.ok === false) {
		return NextResponse.redirect(new URL("/signin", req.url));
	}

	if (
		user?.ok === true &&
		(currentPath.startsWith("/signin") || currentPath.startsWith("signup"))
	) {
		return NextResponse.redirect(new URL("/dashboard", req.url));
	}

	return NextResponse.next();
}
