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
		<div class="flex items-center gap-2">
			<Share2 class="size-5 text-primary" />
			<div>
				<h3 class="text-sm font-bold text-foreground sm:text-base">
					Svelte 5 Class State & Context Inspector
				</h3>
				<p class="text-xs text-muted-foreground">
					Demonstrating shared object reactivity across components via class instance
				</p>
			</div>
		</div>
		<button
			onclick={() => store.reset()}
			class="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-semibold text-muted-foreground transition hover:border-primary/50 hover:text-foreground"
		>
			<RotateCcw class="size-3.5" />
			<span>Reset Class State</span>
		</button>
	</div>

	<div class="grid grid-cols-1 divide-y divide-border lg:grid-cols-3 lg:divide-x lg:divide-y-0">
		<!-- Component A: State Producer / Provider -->
		<div class="flex flex-col gap-4 p-5">
			<div class="flex items-center justify-between">
				<span
					class="flex items-center gap-1.5 font-mono text-xs font-bold tracking-wider text-cyan-500 uppercase"
				>
					<Layers class="size-3.5" />
					Component A (Provider)
				</span>
				<span
					class="rounded bg-cyan-500/10 px-2 py-0.5 font-mono text-[10px] font-bold text-cyan-500"
				>
					setContext()
				</span>
			</div>

			<div class="space-y-4">
				<!-- Profile Mutations -->
				<div class="space-y-3 rounded-xl border border-border bg-background/60 p-4">
					<span class="block font-mono text-xs font-semibold text-muted-foreground">
						Mutate $state Object
					</span>

					<!-- Control directly nested inside label -->
					<label class="block space-y-1.5 text-xs text-muted-foreground">
						<span>Name</span>
						<input
							type="text"
							value={store.user.name}
							oninput={(e) => store.updateName(e.currentTarget.value)}
							class="w-full rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground focus:border-primary focus:outline-none"
						/>
					</label>

					<div class="flex items-center justify-between pt-1">
						<span class="text-xs text-muted-foreground">Status Flag</span>
						<button
							onclick={() => store.toggleStatus()}
							class="rounded-md border border-border bg-muted/50 px-2.5 py-1 font-mono text-xs font-bold transition hover:bg-muted"
						>
							Toggle ({store.user.status})
						</button>
					</div>
				</div>

				<!-- Add Notification Trigger -->
				<form
					onsubmit={handleAddNotification}
					class="space-y-3 rounded-xl border border-border bg-background/60 p-4"
				>
					<span class="block font-mono text-xs font-semibold text-muted-foreground">
						Push to $state Array
					</span>
					<div class="flex gap-2">
						<input
							type="text"
							bind:value={newNotificationText}
							placeholder="New notification..."
							aria-label="New notification message"
							class="flex-1 rounded-lg border border-border bg-card px-3 py-1.5 text-xs text-foreground focus:border-primary focus:outline-none"
						/>
						<button
							type="submit"
							class="inline-flex items-center gap-1 rounded-lg bg-primary px-3 py-1.5 font-mono text-xs font-bold text-primary-foreground hover:bg-primary/90"
						>
							<Plus class="size-3.5" />
							Push
						</button>
					</div>
				</form>
			</div>
		</div>

		<!-- Component B: State Consumer (Child) -->
		<div class="flex flex-col gap-4 bg-muted/10 p-5">
			<div class="flex items-center justify-between">
				<span
					class="flex items-center gap-1.5 font-mono text-xs font-bold tracking-wider text-emerald-500 uppercase"
				>
					<Sparkles class="size-3.5" />
					Component B (Consumer)
				</span>
				<span
					class="rounded bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-500"
				>
					getContext()
				</span>
			</div>

			<!-- Reactive Output Card -->
			<div class="space-y-3 rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4">
				<div class="flex items-center justify-between">
					<div class="flex items-center gap-2">
						<User class="size-4 text-emerald-500" />
						<span class="text-xs font-bold text-foreground">{store.user.name}</span>
					</div>
					<span
						class="rounded-md px-2 py-0.5 font-mono text-[10px] font-bold {store.user.status ===
						'Active'
							? 'bg-emerald-500/20 text-emerald-500'
							: 'bg-amber-500/20 text-amber-500'}"
					>
						{store.user.status}
					</span>
				</div>
				<p class="font-mono text-xs text-muted-foreground">{store.user.role}</p>
			</div>

			<!-- Live Notification Feed -->
			<div class="flex flex-1 flex-col space-y-2">
				<div class="flex items-center justify-between">
					<div class="flex items-center gap-1.5">
						<Bell class="size-3.5 text-muted-foreground" />
						<span class="font-mono text-xs font-semibold text-muted-foreground">
							Derived Unread ({store.unreadCount})
						</span>
					</div>
					{#if store.notifications.length > 0}
						<button
							onclick={() => store.clearAll()}
							class="flex items-center gap-1 font-mono text-[10px] text-muted-foreground hover:text-red-400"
						>
							<Trash2 class="size-3" />
							Clear
						</button>
					{/if}
				</div>

				<div class="max-h-48 flex-1 space-y-2 overflow-y-auto">
					{#each store.notifications as notification (notification.id)}
						<div
							class="flex items-center justify-between rounded-lg border border-border bg-background/80 p-2.5 text-xs transition {notification.read
								? 'opacity-50'
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
									<CircleCheck class="size-3.5" />
								</button>
							{/if}
						</div>
					{/each}
					{#if store.notifications.length === 0}
						<div
							class="rounded-lg border border-dashed border-border p-4 text-center font-mono text-xs text-muted-foreground"
						>
							No notifications in class state
						</div>
					{/if}
				</div>
			</div>
		</div>

		<!-- Live JSON State Inspector -->
		<div class="flex flex-col gap-4 p-5">
			<div class="flex items-center justify-between">
				<span class="font-mono text-xs font-bold tracking-wider text-purple-500 uppercase">
					Class Instance Dump
				</span>
				<span class="font-mono text-[10px] text-muted-foreground">Reactive Proxy</span>
			</div>

			<div
				class="flex-1 overflow-hidden rounded-xl border border-border bg-zinc-950 p-4 font-mono text-xs text-zinc-300"
			>
				<div class="mb-2 text-[10px] font-bold text-purple-400">// UserStore Instance State</div>
				<pre class="overflow-x-auto text-[11px] leading-relaxed"><code
						>{JSON.stringify(
							{
								user: store.user,
								unreadCount: store.unreadCount,
								totalNotifications: store.notifications.length
							},
							null,
							2
						)}</code
					></pre>
			</div>
		</div>
	</div>
</div>
