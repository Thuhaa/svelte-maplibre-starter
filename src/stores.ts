import { writable } from "svelte/store";
import type { Map as MapLibreMap } from "maplibre-gl";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const map = writable<MapLibreMap>(null)
export const optionsList = writable<string[]>([])