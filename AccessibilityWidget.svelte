<script lang="ts">
	import * as m from '$lib/paraglide/messages.js';

	let isOpen = $state(false);

	// Accessibility state
	let fontSize = $state(100);
	let highContrast = $state(false);
	let reduceMotion = $state(false);
	let highlightLinks = $state(false);

	// Detect Mac for showing ⌥ instead of Alt
	let isMac = $state(false);
	let modKey = $derived(isMac ? '⌥' : 'Alt');

	// Load saved preferences on mount and check for #accessibility hash
	$effect(() => {
		if (typeof window !== 'undefined') {
			// Detect Mac platform
			isMac = /Mac|iPhone|iPad|iPod/.test(navigator.platform);

			const saved = localStorage.getItem('a11y-prefs');
			if (saved) {
				const prefs = JSON.parse(saved);
				fontSize = prefs.fontSize ?? 100;
				highContrast = prefs.highContrast ?? false;
				reduceMotion = prefs.reduceMotion ?? false;
				highlightLinks = prefs.highlightLinks ?? false;
			}

			// Open panel if URL has #accessibility hash
			if (window.location.hash === '#accessibility') {
				isOpen = true;
			}
		}
	});

	// Listen for hash changes to open panel when navigating to #accessibility
	function handleHashChange() {
		if (window.location.hash === '#accessibility') {
			isOpen = true;
		}
	}

	// Apply preferences reactively
	$effect(() => {
		if (typeof document !== 'undefined') {
			document.documentElement.style.fontSize = `${fontSize}%`;
			document.documentElement.classList.toggle('a11y-high-contrast', highContrast);
			document.documentElement.classList.toggle('a11y-reduce-motion', reduceMotion);
			document.documentElement.classList.toggle('a11y-highlight-links', highlightLinks);

			// Save to localStorage
			localStorage.setItem(
				'a11y-prefs',
				JSON.stringify({ fontSize, highContrast, reduceMotion, highlightLinks })
			);
		}
	});

	function adjustFontSize(delta: number) {
		fontSize = Math.min(150, Math.max(80, fontSize + delta));
	}

	function resetAll() {
		fontSize = 100;
		highContrast = false;
		reduceMotion = false;
		highlightLinks = false;
	}

	// Alt/Option key shortcuts (Israeli IS 5568 accessibility standard)
	// Uses e.code for cross-platform support (Mac Option key produces special chars with e.key)
	function handleKeydown(e: KeyboardEvent) {
		if (!e.altKey) return;

		switch (e.code) {
			// Navigation shortcuts (Israeli standard)
			case 'Digit1':
				e.preventDefault();
				document.getElementById('main-content')?.focus();
				window.location.hash = '';
				window.scrollTo({ top: 0, behavior: 'smooth' });
				break;
			case 'Digit2':
				e.preventDefault();
				document.getElementById('shop')?.focus();
				window.location.hash = 'shop';
				break;
			case 'Digit3':
				e.preventDefault();
				document.getElementById('story')?.focus();
				window.location.hash = 'story';
				break;
			case 'Digit4':
				e.preventDefault();
				document.getElementById('faq')?.focus();
				window.location.hash = 'faq';
				break;
			case 'Digit5':
				e.preventDefault();
				isOpen = !isOpen;
				break;
			// Accessibility feature shortcuts
			case 'Equal': // + or = key
				e.preventDefault();
				adjustFontSize(10);
				break;
			case 'Minus':
				e.preventDefault();
				adjustFontSize(-10);
				break;
			case 'Digit0':
				e.preventDefault();
				resetAll();
				break;
		}
	}
</script>

<svelte:window
	onclick={() => (isOpen = false)}
	onkeydown={handleKeydown}
	onhashchange={handleHashChange}
/>

<div class="fixed start-6 z-[9999]" style="bottom: calc(1.5rem + env(safe-area-inset-bottom, 0px));">
	<!-- Main accessibility button -->
	<button
		type="button"
		class="a11y-btn flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-[var(--leaf)] text-white shadow-lg transition-all duration-300 ease-out hover:scale-110 hover:shadow-xl focus:outline-none"
		class:a11y-btn-open={isOpen}
		onclick={(e) => {
			e.stopPropagation();
			isOpen = !isOpen;
		}}
		aria-label={m.a11y_button_label()}
		aria-expanded={isOpen}
		aria-haspopup="dialog"
	>
		<!-- Accessibility icon (universal access symbol) -->
		<svg class="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
			<path
				d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9H15V22H13V16H11V22H9V9H3V7H21V9Z"
			/>
		</svg>
	</button>

	<!-- Accessibility panel -->
	{#if isOpen}
		<div
			class="absolute start-0 bottom-16 w-72 max-w-[calc(100vw-3rem)] overflow-hidden rounded-2xl border border-white/80 bg-white/95 shadow-2xl backdrop-blur-sm"
			role="dialog"
			aria-label={m.a11y_panel_title()}
			tabindex="-1"
			onclick={(e) => e.stopPropagation()}
			onkeydown={(e) => e.key === 'Escape' && (isOpen = false)}
		>
			<!-- Header -->
			<div class="border-b border-[var(--ink)]/10 bg-[var(--leaf)] px-4 py-3 text-white">
				<div class="flex items-center justify-between">
					<h2 class="text-sm font-semibold">{m.a11y_panel_title()}</h2>
					<kbd class="rounded bg-white/20 px-1.5 py-0.5 font-mono text-[13px] font-bold"
						>{modKey}+5</kbd
					>
				</div>
			</div>

			<div class="space-y-3 p-4">
				<!-- Navigation shortcuts -->
				<div class="space-y-1.5">
					<span class="block text-[13px] font-medium text-[var(--muted)]"
						>{m.a11y_nav_shortcuts()}</span
					>
					<div class="grid grid-cols-2 gap-1.5 text-[13px] text-[var(--muted)]">
						<div class="flex items-center gap-1.5">
							<kbd class="rounded bg-[var(--stone)] px-1.5 py-0.5 font-mono text-[13px] font-bold"
								>{modKey}+1</kbd
							>
							<span>{m.a11y_nav_home()}</span>
						</div>
						<div class="flex items-center gap-1.5">
							<kbd class="rounded bg-[var(--stone)] px-1.5 py-0.5 font-mono text-[13px] font-bold"
								>{modKey}+2</kbd
							>
							<span>{m.nav_shop()}</span>
						</div>
						<div class="flex items-center gap-1.5">
							<kbd class="rounded bg-[var(--stone)] px-1.5 py-0.5 font-mono text-[13px] font-bold"
								>{modKey}+3</kbd
							>
							<span>{m.nav_story()}</span>
						</div>
						<div class="flex items-center gap-1.5">
							<kbd class="rounded bg-[var(--stone)] px-1.5 py-0.5 font-mono text-[13px] font-bold"
								>{modKey}+4</kbd
							>
							<span>{m.nav_faq()}</span>
						</div>
					</div>
				</div>

				<hr class="border-[var(--ink)]/10" />

				<!-- Font size -->
				<div class="space-y-2">
					<div class="flex items-center justify-between">
						<span class="block text-[13px] font-medium text-[var(--muted)]" id="font-size-label">
							{m.a11y_font_size()} ({fontSize}%)
						</span>
						<kbd
							class="rounded bg-[var(--stone)] px-1.5 py-0.5 font-mono text-[13px] font-bold text-[var(--muted)]"
							>{modKey}+/−</kbd
						>
					</div>
					<div class="flex items-center gap-2">
						<button
							type="button"
							class="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--ink)]/20 bg-[var(--stone)] text-[var(--ink)] transition-colors hover:bg-[var(--honey)]/30 disabled:opacity-50"
							onclick={() => adjustFontSize(-10)}
							disabled={fontSize <= 80}
							aria-label={m.a11y_decrease_font()}
						>
							<span class="text-lg font-bold">−</span>
						</button>
						<div class="h-2 flex-1 overflow-hidden rounded-full bg-[var(--stone)]">
							<div
								class="h-full bg-[var(--leaf)] transition-all"
								style="width: {((fontSize - 80) / 70) * 100}%"
							></div>
						</div>
						<button
							type="button"
							class="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--ink)]/20 bg-[var(--stone)] text-[var(--ink)] transition-colors hover:bg-[var(--honey)]/30 disabled:opacity-50"
							onclick={() => adjustFontSize(10)}
							disabled={fontSize >= 150}
							aria-label={m.a11y_increase_font()}
						>
							<span class="text-lg font-bold">+</span>
						</button>
					</div>
				</div>

				<!-- Toggle options -->
				<div class="space-y-2">
					<!-- High contrast -->
					<button
						type="button"
						class="flex w-full items-center justify-between rounded-lg border px-3 py-2 text-start text-sm transition-colors {highContrast
							? 'border-[var(--leaf)] bg-[var(--leaf)]/10 text-[var(--leaf)]'
							: 'border-[var(--ink)]/20 bg-[var(--stone)] text-[var(--ink)] hover:bg-[var(--honey)]/20'}"
						onclick={() => (highContrast = !highContrast)}
						aria-pressed={highContrast}
					>
						<span>{m.a11y_high_contrast()}</span>
						<span class="text-xs">{highContrast ? '✓' : ''}</span>
					</button>

					<!-- Highlight links -->
					<button
						type="button"
						class="flex w-full items-center justify-between rounded-lg border px-3 py-2 text-start text-sm transition-colors {highlightLinks
							? 'border-[var(--leaf)] bg-[var(--leaf)]/10 text-[var(--leaf)]'
							: 'border-[var(--ink)]/20 bg-[var(--stone)] text-[var(--ink)] hover:bg-[var(--honey)]/20'}"
						onclick={() => (highlightLinks = !highlightLinks)}
						aria-pressed={highlightLinks}
					>
						<span>{m.a11y_highlight_links()}</span>
						<span class="text-xs">{highlightLinks ? '✓' : ''}</span>
					</button>

					<!-- Reduce motion -->
					<button
						type="button"
						class="flex w-full items-center justify-between rounded-lg border px-3 py-2 text-start text-sm transition-colors {reduceMotion
							? 'border-[var(--leaf)] bg-[var(--leaf)]/10 text-[var(--leaf)]'
							: 'border-[var(--ink)]/20 bg-[var(--stone)] text-[var(--ink)] hover:bg-[var(--honey)]/20'}"
						onclick={() => (reduceMotion = !reduceMotion)}
						aria-pressed={reduceMotion}
					>
						<span>{m.a11y_reduce_motion()}</span>
						<span class="text-xs">{reduceMotion ? '✓' : ''}</span>
					</button>
				</div>

				<!-- Reset button -->
				<button
					type="button"
					class="flex w-full items-center justify-between rounded-lg border border-[var(--ink)]/20 bg-white px-3 py-2 text-sm text-[var(--muted)] transition-colors hover:bg-[var(--stone)] hover:text-[var(--ink)]"
					onclick={resetAll}
				>
					<span>{m.a11y_reset()}</span>
					<kbd class="rounded bg-[var(--stone)] px-1.5 py-0.5 font-mono text-[13px] font-bold"
						>{modKey}+0</kbd
					>
				</button>
			</div>

			<!-- Footer with statement link -->
			<div class="border-t border-[var(--ink)]/10 px-4 py-2 text-center">
				<a
					href="#accessibility"
					class="text-xs text-[var(--muted)] underline hover:text-[var(--ink)]"
				>
					{m.a11y_statement_link()}
				</a>
			</div>
		</div>
	{/if}
</div>

<style>
	.a11y-btn {
		box-shadow:
			0 0 0 0 white,
			0 0 0 0 var(--honey),
			0 10px 15px -3px rgb(0 0 0 / 0.1);
	}

	.a11y-btn:focus-visible,
	.a11y-btn-open {
		box-shadow:
			0 0 0 2px white,
			0 0 0 4px var(--honey),
			0 10px 15px -3px rgb(0 0 0 / 0.1);
	}

	.a11y-btn svg {
		transition: transform 0.2s ease;
	}

	.a11y-btn:hover svg {
		transform: scale(1.1);
	}

	.a11y-btn-open svg {
		transform: scale(1.1);
	}
</style>
