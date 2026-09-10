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
</script>

<div class="not-prose my-8 overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
	<!-- Top Header Accent -->
	<div class="h-1 w-full bg-linear-to-r from-cyan-500 via-primary to-emerald-500"></div>

	<!-- Component Title Bar -->
	<div class="flex items-center justify-between border-b border-border bg-muted/40 p-4 sm:p-5">
		<div class="flex items-center gap-2.5">
			<div class="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
				<Share2 class="size-5" />
			</div>
			<div>
				<h3 class="text-base font-bold text-foreground sm:text-lg">
					Svelte 5 Class State & Context Inspector
				</h3>
				<p class="text-sm text-muted-foreground">
					Demonstrating shared object reactivity across components via class instance
				</p>
			</div>
		</div>
		<button
			onclick={() => store.reset()}
			class="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-sm font-semibold whitespace-nowrap text-muted-foreground transition hover:border-primary/50 hover:text-foreground"
		>
			<RotateCcw class="size-4" />
			<span>Reset Class State</span>
		</button>
	</div>

	<div class="grid grid-cols-1 divide-y divide-border lg:grid-cols-3 lg:divide-x lg:divide-y-0">
		<!-- Component A: State Producer / Provider -->
		<div class="flex flex-col justify-between gap-4 p-5">
			<div class="flex items-center justify-between">
				<span
					class="flex items-center gap-1.5 font-mono text-sm font-bold tracking-wider text-cyan-500 uppercase"
				>
					<Layers class="size-4" />
					Component A (Provider)
				</span>
				<span
					class="rounded-md bg-cyan-500/10 px-2.5 py-0.5 font-mono text-sm font-bold text-cyan-500"
				>
					setContext()
				</span>
			</div>

			<div class="flex flex-1 flex-col justify-between gap-4">
				<!-- Profile Mutations -->
				<div class="space-y-3 rounded-xl border border-border bg-background/60 p-4 shadow-xs">
					<span class="block font-mono text-sm font-semibold text-muted-foreground">
						Mutate $state Object
					</span>

					<!-- Control directly nested inside label -->
					<label class="block space-y-1.5 text-sm text-muted-foreground">
						<span>Name</span>
						<input
							type="text"
							value={store.user.name}
							oninput={(e) => store.updateName(e.currentTarget.value)}
							class="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-foreground focus:border-primary focus:outline-none"
						/>
					</label>

					<div class="flex items-center justify-between pt-1">
						<span class="text-sm text-muted-foreground">Status Flag</span>
						<button
							onclick={() => store.toggleStatus()}
							class="rounded-md border border-border bg-muted/50 px-2.5 py-1 font-mono text-sm font-bold transition hover:bg-muted active:scale-95"
						>
							Toggle ({store.user.status})
						</button>
					</div>
				</div>

				<!-- Add Notification Trigger -->
				<form
					onsubmit={handleAddNotification}
					class="space-y-3 rounded-xl border border-border bg-background/60 p-4 shadow-xs"
				>
					<span class="block font-mono text-sm font-semibold text-muted-foreground">
						Push to $state Array
					</span>
					<div class="flex gap-2">
						<input
							type="text"
							bind:value={newNotificationText}
							placeholder="New notification..."
							aria-label="New notification message"
							class="flex-1 rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
						/>
						<button
							type="submit"
							class="inline-flex shrink-0 items-center gap-1 rounded-lg bg-primary px-3.5 py-2 font-mono text-sm font-bold text-primary-foreground shadow-xs transition hover:bg-primary/90 active:scale-95"
						>
							<Plus class="size-4" />
							Push
						</button>
					</div>
				</form>
			</div>
		</div>

		<!-- Component B: State Consumer (Child) -->
		<div class="flex flex-col justify-between gap-4 bg-muted/10 p-5">
			<div class="flex items-center justify-between">
				<span
					class="flex items-center gap-1.5 font-mono text-sm font-bold tracking-wider text-emerald-500 uppercase"
				>
					<Sparkles class="size-4" />
					Component B (Consumer)
				</span>
				<span
					class="rounded-md bg-emerald-500/10 px-2.5 py-0.5 font-mono text-sm font-bold text-emerald-500"
				>
					getContext()
				</span>
			</div>

			<div class="flex flex-1 flex-col justify-between gap-4">
				<!-- Reactive Output Card -->
				<div
					class="space-y-3 rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4 shadow-xs"
				>
					<div class="flex items-center justify-between">
						<div class="flex items-center gap-2">
							<User class="size-4 text-emerald-500" />
							<span class="text-sm font-bold text-foreground">{store.user.name}</span>
						</div>
						<span
							class="rounded-md px-2.5 py-0.5 font-mono text-sm font-bold {store.user.status ===
							'Active'
								? 'bg-emerald-500/20 text-emerald-500'
								: 'bg-amber-500/20 text-amber-500'}"
						>
							{store.user.status}
						</span>
					</div>
					<p class="font-mono text-sm text-muted-foreground">{store.user.role}</p>
				</div>

				<!-- Live Notification Feed -->
				<div
					class="flex flex-1 flex-col justify-between rounded-xl border border-border bg-background/60 p-4 shadow-xs"
				>
					<div class="mb-2.5 flex items-center justify-between">
						<div class="flex items-center gap-1.5">
							<Bell class="size-4 text-muted-foreground" />
							<span class="font-mono text-sm font-semibold text-muted-foreground">
								Derived Unread ({store.unreadCount})
							</span>
						</div>
						{#if store.notifications.length > 0}
							<button
								onclick={() => store.clearAll()}
								class="flex items-center gap-1 font-mono text-sm text-muted-foreground hover:text-red-400"
							>
								<Trash2 class="size-3.5" />
								Clear
							</button>
						{/if}
					</div>

					<div class="max-h-48 flex-1 space-y-2 overflow-y-auto">
						{#each store.notifications as notification (notification.id)}
							<div
								class="flex items-center justify-between rounded-lg border border-border bg-card p-2.5 text-sm transition {notification.read
									? 'opacity-60'
									: ''}"
							>
								<span class="font-medium text-foreground">{notification.text}</span>
								{#if !notification.read}
									<button
										onclick={() => store.markAsRead(notification.id)}
										class="p-1 text-emerald-500 hover:text-emerald-400"
										title="Mark as read"
										aria-label="Mark notification as read"
									>
										<CircleCheck class="size-4" />
									</button>
								{:else}
									<span class="p-1 text-muted-foreground/40" title="Read">
										<CircleCheck class="size-4" />
									</span>
								{/if}
							</div>
						{/each}
						{#if store.notifications.length === 0}
							<div
								class="rounded-lg border border-dashed border-border p-4 text-center font-mono text-sm text-muted-foreground"
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
					class="flex items-center gap-1.5 font-mono text-sm font-bold tracking-wider text-purple-400 uppercase"
				>
					<Terminal class="size-4" />
					Class Instance Dump
				</span>
				<span
					class="rounded-md bg-purple-500/10 px-2.5 py-0.5 font-mono text-sm font-bold text-purple-400"
				>
					Reactive Proxy
				</span>
			</div>

			<div
				class="flex flex-1 flex-col justify-between overflow-hidden rounded-xl border border-purple-500/20 bg-zinc-950 p-4 font-mono text-sm text-zinc-300 shadow-inner"
			>
				<div>
					<div class="mb-2 text-sm font-bold text-purple-400">// UserStore Instance State</div>
					<pre
						class="m-0! max-h-72 overflow-x-auto border-0! bg-transparent! p-0! font-mono text-sm leading-relaxed text-zinc-300 shadow-none!"><code
							>{JSON.stringify(
								{
									user: store.user,
									unreadCount: store.unreadCount,
									notifications: store.notifications
								},
								null,
								2
							)}</code
						></pre>
				</div>

				<div
					class="mt-3 flex items-center justify-between border-t border-zinc-800/80 pt-2.5 text-xs text-purple-300/60"
				>
					<span>✨ Deep $state proxy</span>
					<span>Auto-synced</span>
				</div>
			</div>
		</div>
	</div>
</div>
