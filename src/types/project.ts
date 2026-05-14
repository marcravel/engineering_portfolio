// src/types/project.ts

export type Lang = 'en' | 'fr' | 'tr';

export type LocalizedString = Record<Lang, string>;

export interface Project {
    id: number;
    active: 0 | 1;
    slug: string;
    category: LocalizedString;
    title: LocalizedString;
    techStack: string[];
    description: LocalizedString;
    achievements?: LocalizedString;
    image?: string;
    // longDescription is a path string for active projects, or inline text for inactive ones
    longDescription?: LocalizedString | string;
    youtubeId?: string | null;
    gallery?: string[] | null;
}