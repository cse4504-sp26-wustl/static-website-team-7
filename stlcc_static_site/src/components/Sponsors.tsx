import { useEffect, useState } from 'react';

const SPONSORS_PER_ROW = 5;
const MAX_SPONSORS = 100;

async function loadSponsorUrls(): Promise<string[]> {
	const urls: string[] = [];

	for (let index = 1; index <= MAX_SPONSORS; index++) {
		const url = `sponsors/sponsor${index}.png`;
		try {
			const res = await fetch(url);
			if (!res.ok) {
				break;
			}
			// Vite dev server returns 200 with HTML for unknown routes (SPA fallback).
			// Only accept the file if the server reports it as an image.
			const contentType = res.headers.get('Content-Type') ?? '';
			if (!contentType.includes('image/')) {
				break;
			}
			urls.push(url);
		} catch {
			break;
		}
	}

	return urls;
}

export function Sponsors() {
	const [sponsorUrls, setSponsorUrls] = useState<string[]>([]);

	useEffect(() => {
		let mounted = true;

		async function load(): Promise<void> {
			const urls = await loadSponsorUrls();
			if (mounted) {
				setSponsorUrls(urls);
			}
		}

		void load();

		return () => {
			mounted = false;
		};
	}, []);

	if (sponsorUrls.length === 0) {
		return null;
	}

	const rows: string[][] = [];
	for (let i = 0; i < sponsorUrls.length; i += SPONSORS_PER_ROW) {
		rows.push(sponsorUrls.slice(i, i + SPONSORS_PER_ROW));
	}

	return (
		<section className="sponsors-section">
			<h2>Sponsors</h2>
			{rows.map((row, rowIndex) => (
				<div key={rowIndex} className="sponsors-row">
					{row.map((url, imgIndex) => (
						<img
							key={imgIndex}
							src={url}
							alt={`Sponsor ${rowIndex * SPONSORS_PER_ROW + imgIndex + 1}`}
							className="sponsor-logo"
						/>
					))}
				</div>
			))}
		</section>
	);
}
