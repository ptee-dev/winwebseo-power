export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body className="bg-canvas text-ink antialiased">{children}</body>
		</html>
	)
}
