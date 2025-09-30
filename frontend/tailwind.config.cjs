/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
			},
			fontSize: {
				xs: ["0.75rem", { lineHeight: "1rem" }], // 12px
				sm: ["0.875rem", { lineHeight: "1.25rem" }], // 14px
				base: ["1rem", { lineHeight: "1.5rem" }], // 16px
				lg: ["1.125rem", { lineHeight: "1.75rem" }], // 18px (better step)
				xl: ["1.25rem", { lineHeight: "1.75rem" }], // 20px
				"2xl": ["1.5rem", { lineHeight: "2rem" }], // 24px
				"3xl": ["1.875rem", { lineHeight: "2.25rem" }], // 30px
				"4xl": ["2.25rem", { lineHeight: "2.5rem" }], // 36px
				"5xl": ["3rem", { lineHeight: "1" }], // 48px
			},
			letterSpacing: {
				tighter: "-0.02em",
				normal: "0em",
				wide: "0.05em",
			},
			fontWeight: {
				light: "300",
				normal: "400",
				medium: "500",
				semibold: "600",
				bold: "700",
			},
			spacing: {
				7: "28px",
				9: "36px",
				11: "44px",
				13: "52px",
				14: "56px",
				15: "60px",
			},
			maxWidth: {
				content: "70ch",
			},
			borderRadius: {
				sm: "4px",
				DEFAULT: "8px",
				lg: "16px",
				xl: "24px",
				full: "9999px",
			},
			boxShadow: {
				sm: "0 1px 2px rgba(0, 0, 0, 0.05)",
				md: "0 4px 6px rgba(0, 0, 0, 0.1)",
				lg: "0 10px 15px rgba(0, 0, 0, 0.15)",
				xl: "0 20px 25px rgba(0, 0, 0, 0.2)",
			},
			transitionDuration: {
				fast: "150ms",
				DEFAULT: "300ms",
				slow: "500ms",
			},
			zIndex: {
				auto: "auto",
				base: 0,
				dropdown: 1000,
				sticky: 1100,
				modal: 1200,
				toast: 1300,
				tooltip: 1400,
			},
			colors: {
				text: Object.fromEntries(
					Array.from({ length: 10 }, (_, i) => [i * 100 || 50, `var(--text-${i * 100 || 50})`])
				),
				bg: Object.fromEntries(
					Array.from({ length: 10 }, (_, i) => [i * 100 || 50, `var(--background-${i * 100 || 50})`])
				),
				prim: Object.fromEntries(
					Array.from({ length: 10 }, (_, i) => [i * 100 || 50, `var(--primary-${i * 100 || 50})`])
				),
				seco: Object.fromEntries(
					Array.from({ length: 10 }, (_, i) => [i * 100 || 50, `var(--secondary-${i * 100 || 50})`])
				),
				acce: Object.fromEntries(
					Array.from({ length: 10 }, (_, i) => [i * 100 || 50, `var(--accent-${i * 100 || 50})`])
				),
			},
		},
	},
	plugins: [],
};
