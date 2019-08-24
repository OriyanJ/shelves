import { Volume } from "./volume.interface";

export interface VolumesPaginated {
    items?: Volume[];
    kind?: string;
    totalItems?: number;
}