import "./globals.css";
import type { Metadata } from "next";

import { Archivo } from "next/font/google";

const inter = Archivo({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Create Next App",
  	description: "Generated by create next app",
};

type Props = {
	children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
	return (
		<html lang="en" className="overflow-x-hidden">
			<body className={`overflow-x-hidden ${inter.className}`}>
				<main className="m-5">
					{children}
				</main>
			</body>
		</html>
  	);
}
