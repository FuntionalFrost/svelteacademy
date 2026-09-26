// src/lib/stores/learningStore.svelte.ts
import { browser } from '$app/environment';
import { CURRICULUM_TRACKS, getAllLessons, type TrackId } from '$lib/content/curriculum';

const STORAGE_KEY = 'svelteacademy_learning_progress_v1';

class LearningStore {
	// Reactive set of completed lesson keys: `${trackId}/${slug}`
	completed = $state<string[]>([]);
	initialized = $state<boolean>(false);

	constructor() {
		if (browser) {
			this.loadFromStorage();
		}
	}

	private loadFromStorage() {
		try {
			const data = localStorage.getItem(STORAGE_KEY);
			if (data) {
				const parsed = JSON.parse(data);
				if (Array.isArray(parsed)) {
					this.completed = parsed;
				}
			}
		} catch (e) {
			console.error('Failed to load learning progress:', e);
		} finally {
			this.initialized = true;
		}
	}

	private saveToStorage() {
		if (browser) {
			try {
				localStorage.setItem(STORAGE_KEY, JSON.stringify(this.completed));
			} catch (e) {
				console.error('Failed to save learning progress:', e);
			}
		}
	}

	isCompleted(trackId: string, slug: string): boolean {
		const key = `${trackId}/${slug}`;
		return this.completed.includes(key);
	}

	toggleCompleted(trackId: string, slug: string): boolean {
		const key = `${trackId}/${slug}`;
		const isDone = this.completed.includes(key);
		if (isDone) {
			this.completed = this.completed.filter((k) => k !== key);
		} else {
			this.completed = [...this.completed, key];
		}
		this.saveToStorage();
		return !isDone;
	}

	markCompleted(trackId: string, slug: string) {
		const key = `${trackId}/${slug}`;
		if (!this.completed.includes(key)) {
			this.completed = [...this.completed, key];
			this.saveToStorage();
		}
	}

	getTrackProgress(trackId: TrackId): { completed: number; total: number; percentage: number } {
		const track = CURRICULUM_TRACKS.find((t) => t.id === trackId);
		if (!track) return { completed: 0, total: 0, percentage: 0 };
		const total = track.lessons.length;
		const completed = track.lessons.filter((l) => this.isCompleted(l.trackId, l.slug)).length;
		const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
		return { completed, total, percentage };
	}

	isTrackCompleted(trackId: TrackId): boolean {
		const { completed, total } = this.getTrackProgress(trackId);
		return total > 0 && completed === total;
	}

	get overallProgress(): { completed: number; total: number; percentage: number } {
		const allLessons = getAllLessons();
		const total = allLessons.length;
		const completed = allLessons.filter((l) => this.isCompleted(l.trackId, l.slug)).length;
		const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
		return { completed, total, percentage };
	}

	resetProgress() {
		this.completed = [];
		if (browser) {
			localStorage.removeItem(STORAGE_KEY);
		}
	}
}

export const learningStore = new LearningStore();
