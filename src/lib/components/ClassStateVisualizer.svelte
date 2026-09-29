<!-- src/lib/components/ClassStateVisualizer.svelte -->
<script lang="ts">
	import {
		Bell,
		CircleCheck,
		Layers,
		Plus,
		RotateCcw,
		Share2,
		Sparkles,
		Terminal,
		Trash2,
		User
	} from '@lucide/svelte';

	// 1. Svelte 5 Reactive Class State Definition
	class UserStore {
		user = $state({ name: 'Alex Rivera', role: 'Lead Architect', status: 'Active' });
		notifications = $state([
			{ id: 1, text: 'Svelte 5 Runes loaded', read: false },
			{ id: 2, text: 'Context initialized', read: true }
		]);

		// Derived signal inside class
		unreadCount = $derived(this.notifications.filter((n) => !n.read).length);

		updateName(newName: string) {
			this.user.name = newName;
		}

		toggleStatus() {
			this.user.status = this.user.status === 'Active' ? 'Away' : 'Active';
		}

		addNotification(text: string) {
			this.notifications.unshift({
				id: Date.now(),
				text,
				read: false
			});
		}

		markAsRead(id: number) {
			const item = this.notifications.find((n) => n.id === id);
			if (item) item.read = true;
		}

		clearAll() {
			this.notifications = [];
		}

		reset() {
			this.user = { name: 'Alex Rivera', role: 'Lead Architect', status: 'Active' };
			this.notifications = [
				{ id: 1, text: 'Svelte 5 Runes loaded', read: false },
				{ id: 2, text: 'Context initialized', read: true }
			];
		}
	}

	// Instantiate class state
	const store = new UserStore();

	let newNotificationText = $state('');

	function handleAddNotification(e: SubmitEvent) {
		e.preventDefault();
		if (!newNotificationText.trim()) return;
		store.addNotification(newNotificationText.trim());
		newNotificationText = '';
	}

	interface JsonToken {
		text: string;
		type: 'key' | 'string' | 'number' | 'boolean' | 'null' | 'punctuation' | 'whitespace';
	}

	function tokenizeJson(json: string): JsonToken[] {
		const tokens: JsonToken[] = [];
		const regex =
			/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(?:true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?|[{}[\],:]|\s+|[^\s{}[\],:]+)/g;
		let match: RegExpExecArray | null;

		while ((match = regex.exec(json)) !== null) {
			const str = match[0];
			if (/^"/.test(str)) {
				if (/:$/.test(str)) {
					tokens.push({ text: str.slice(0, -1), type: 'key' });
					tokens.push({ text: ':', type: 'punctuation' });
				} else {
					tokens.push({ text: str, type: 'string' });
				}
			} else if (/^(?:true|false)$/.test(str)) {
				tokens.push({ text: str, type: 'boolean' });
			} else if (str === 'null') {
				tokens.push({ text: str, type: 'null' });
			} else if (/^-?\d/.test(str)) {
				tokens.push({ text: str, type: 'number' });
			} else if (/^[{}[\],:]$/.test(str)) {
				tokens.push({ text: str, type: 'punctuation' });
			} else {
				tokens.push({ text: str, type: 'whitespace' });
			}
		}

		return tokens;
	}

	let jsonString = $derived(
		JSON.stringify(
			{
				user: store.user,
				unreadCount: store.unreadCount,
				notifications: store.notifications
			},
			null,
			2
		)
	);

	let jsonTokens = $derived(tokenizeJson(jsonString));
</script>

<div class="not-prose my-8 overflow-hidden rounded-2xl bg-zinc-950 text-zinc-100 shadow-2xl">
	<!-- Top Header Accent -->
	<div class="h-1 w-full bg-linear-to-r from-cyan-500 via-orange-500 to-emerald-500"></div>

	<!-- Component Title Bar -->
	<div class="flex items-center justify-between border-b border-zinc-800/80 p-4 pb-4 sm:p-5">
		<div class="flex items-center gap-2.5">
			<div
				class="flex size-9 items-center justify-center rounded-xl border border-orange-500/30 bg-orange-500/10 text-orange-400"
			>
				<Share2 class="size-5" />
			</div>
			<div>
				<h3 class="text-base font-bold text-zinc-100 sm:text-lg">
					Svelte 5 Class State & Context Inspector
				</h3>
				<p class="text-sm text-zinc-400">
					Demonstrating shared object reactivity across components via class instance
				</p>
			</div>
		</div>
		<button
			onclick={() => store.reset()}
			class="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-zinc-900 px-3 py-1.5 text-xs font-semibold whitespace-nowrap text-zinc-400 transition hover:bg-zinc-800 hover:text-zinc-100"
		>
			<RotateCcw class="size-3.5" />
			<span>Reset Class State</span>
		</button>
	</div>

	<div
		class="grid grid-cols-1 divide-y divide-zinc-800/60 lg:grid-cols-3 lg:divide-x lg:divide-y-0"
	>
		<!-- Component A: State Producer / Provider -->
		<div class="flex flex-col justify-between gap-4 p-5">
			<div class="flex items-center justify-between">
				<span
					class="flex items-center gap-1.5 font-mono text-xs font-bold tracking-wider text-cyan-400 uppercase"
				>
					<Layers class="size-4" />
					Component A (Provider)
				</span>
				<span
					class="rounded-md bg-cyan-500/10 px-2.5 py-0.5 font-mono text-xs font-bold text-cyan-400"
				>
					setContext()
				</span>
			</div>

			<div class="flex flex-1 flex-col justify-between gap-4">
				<!-- Profile Mutations -->
				<div class="space-y-3">
					<span class="block font-mono text-xs font-semibold text-zinc-400 uppercase">
						Mutate $state Object
					</span>

					<label class="block space-y-1.5 text-xs text-zinc-400">
						<span>Name</span>
						<input
							type="text"
							value={store.user.name}
							oninput={(e) => store.updateName(e.currentTarget.value)}
							class="focus:bg-zinc-850 w-full rounded-lg bg-zinc-900 px-3 py-2 text-sm font-medium text-zinc-100 focus:outline-none"
						/>
					</label>

					<div class="flex items-center justify-between pt-1">
						<span class="text-xs text-zinc-400">Status Flag</span>
						<button
							onclick={() => store.toggleStatus()}
							class="rounded-lg bg-zinc-900 px-3 py-1.5 font-mono text-xs font-bold text-zinc-200 transition hover:bg-zinc-800 active:scale-95"
						>
							Toggle ({store.user.status})
						</button>
					</div>
				</div>

				<!-- Add Notification Trigger -->
				<form onsubmit={handleAddNotification} class="space-y-2 pt-2">
					<span class="block font-mono text-xs font-semibold text-zinc-400 uppercase">
						Push to $state Array
					</span>
					<div class="flex items-center gap-2">
						<input
							type="text"
							bind:value={newNotificationText}
							placeholder="New notification..."
							aria-label="New notification message"
							class="focus:bg-zinc-850 min-w-0 flex-1 rounded-lg bg-zinc-900 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none"
						/>
						<button
							type="submit"
							class="inline-flex shrink-0 items-center gap-1 rounded-lg bg-cyan-500 px-3 py-2 font-mono text-xs font-bold text-zinc-950 shadow-xs transition hover:bg-cyan-400 active:scale-95"
						>
							<Plus class="size-3.5" />
							<span>Push</span>
						</button>
					</div>
				</form>
			</div>
		</div>

		<!-- Component B: State Consumer (Child) -->
		<div class="flex flex-col justify-between gap-4 p-5">
			<div class="flex items-center justify-between">
				<span
					class="flex items-center gap-1.5 font-mono text-xs font-bold tracking-wider text-emerald-400 uppercase"
				>
					<Sparkles class="size-4" />
					Component B (Consumer)
				</span>
				<span
					class="rounded-md bg-emerald-500/10 px-2.5 py-0.5 font-mono text-xs font-bold text-emerald-400"
				>
					getContext()
				</span>
			</div>

			<div class="flex flex-1 flex-col justify-between gap-4">
				<!-- Reactive Output Card -->
				<div class="space-y-2 rounded-xl bg-emerald-500/10 p-3.5">
					<div class="flex items-center justify-between">
						<div class="flex items-center gap-2">
							<User class="size-4 text-emerald-400" />
							<span class="text-sm font-bold text-zinc-100">{store.user.name}</span>
						</div>
						<span
							class="rounded-md px-2 py-0.5 font-mono text-xs font-bold {store.user.status ===
							'Active'
								? 'bg-emerald-500/20 text-emerald-400'
								: 'bg-amber-500/20 text-amber-400'}"
						>
							{store.user.status}
						</span>
					</div>
					<p class="font-mono text-xs text-zinc-400">{store.user.role}</p>
				</div>

				<!-- Live Notification Feed -->
				<div class="flex flex-1 flex-col justify-between">
					<div class="mb-2 flex items-center justify-between">
						<div class="flex items-center gap-1.5">
							<Bell class="size-4 text-zinc-400" />
							<span class="font-mono text-xs font-semibold text-zinc-400">
								Derived Unread ({store.unreadCount})
							</span>
						</div>
						{#if store.notifications.length > 0}
							<button
								onclick={() => store.clearAll()}
								class="flex items-center gap-1 font-mono text-xs text-zinc-400 hover:text-red-400"
							>
								<Trash2 class="size-3.5" />
								Clear
							</button>
						{/if}
					</div>

					<div class="max-h-44 flex-1 space-y-1.5 overflow-y-auto">
						{#each store.notifications as notification (notification.id)}
							<div
								class="flex items-center justify-between rounded-lg bg-zinc-900/60 p-2.5 text-xs transition {notification.read
									? 'opacity-50'
									: ''}"
							>
								<span class="font-medium text-zinc-200">{notification.text}</span>
								{#if !notification.read}
									<button
										onclick={() => store.markAsRead(notification.id)}
										class="p-1 text-emerald-400 hover:text-emerald-300"
										title="Mark as read"
										aria-label="Mark notification as read"
									>
										<CircleCheck class="size-4" />
									</button>
								{:else}
									<span class="p-1 text-zinc-600" title="Read">
										<CircleCheck class="size-4" />
									</span>
								{/if}
							</div>
						{/each}
						{#if store.notifications.length === 0}
							<div
								class="rounded-lg bg-zinc-900/30 p-4 text-center font-mono text-xs text-zinc-500"
							>
								No notifications in class state
							</div>
						{/if}
					</div>
				</div>
			</div>
		</div>

		<!-- Live JSON State Inspector -->
		<div class="flex flex-col justify-between gap-4 p-5">
			<div class="flex items-center justify-between">
				<span
					class="flex items-center gap-1.5 font-mono text-xs font-bold tracking-wider text-purple-400 uppercase"
				>
					<Terminal class="size-4" />
					Class Instance Dump
				</span>
				<span
					class="rounded-md bg-purple-500/10 px-2.5 py-0.5 font-mono text-xs font-bold text-purple-400"
				>
					Reactive Proxy
				</span>
			</div>

			<div
				class="flex flex-1 flex-col justify-between overflow-hidden rounded-xl bg-black/60 p-4 font-mono text-xs text-zinc-100 shadow-sm"
			>
				<div>
					<div class="mb-2 font-mono text-xs font-bold text-purple-400">
						// UserStore Instance State
					</div>
					<pre
						class="m-0! max-h-72 overflow-x-auto overflow-y-auto border-0! bg-transparent! p-0! font-mono text-xs leading-relaxed text-[#e6edf3] shadow-none!"><code
							>{#each jsonTokens as token, idx (idx)}{#if token.type === 'key'}<span
										class="font-semibold text-[#ff7b72]">{token.text}</span
									>{:else if token.type === 'string'}<span class="text-[#7ee787]">{token.text}</span
									>{:else if token.type === 'number'}<span class="text-[#79c0ff]">{token.text}</span
									>{:else if token.type === 'boolean'}<span class="font-semibold text-[#d2a8ff]"
										>{token.text}</span
									>{:else if token.type === 'null'}<span class="text-[#8b949e] italic"
										>{token.text}</span
									>{:else if token.type === 'punctuation'}<span class="text-[#c9d1d9]"
										>{token.text}</span
									>{:else}<span>{token.text}</span>{/if}{/each}</code
						></pre>
				</div>

				<div
					class="mt-3 flex items-center justify-between border-t border-zinc-800 pt-2.5 text-[11px] text-purple-300/70"
				>
					<span>✨ Deep $state proxy</span>
					<span>Auto-synced</span>
				</div>
			</div>
		</div>
	</div>
</div>
