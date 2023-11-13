import {UserProfile} from "./userProfile.ts";

export type Tools = {
    id: string;
    name: string;
    image: string;
    categories: Category[];
    author: string;
    location: string;
    description: string;
    timestamp : Date;
    user: UserProfile;

}


export type Category = "GARDEN" | "TOOLS" | "KITCHEN" | "PLUMBING" | "ELECTRONICS" | "SEWING" | "OTHER";

const categoryTranslations: Record<Category, string> = {
    GARDEN: "GARTEN",
    TOOLS: "WERKZEUGE",
    KITCHEN: "KÜCHE",
    PLUMBING: "SANITÄR",
    ELECTRONICS: "ELEKTRONIK",
    SEWING: "NÄHEN & STRICKEN",
    OTHER: "SONSTIGES",
};
const categoryImages: Record<Category, string> = {
    GARDEN: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=1170&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    TOOLS: "https://images.unsplash.com/photo-1508872558182-ffc7f1b387f9?auto=format&fit=crop&q=80&w=1170&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    KITCHEN: "https://images.unsplash.com/photo-1556910602-38f53e68e15d?auto=format&fit=crop&q=80&w=1325&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    PLUMBING: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&q=80&w=1374&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ELECTRONICS: "https://images.unsplash.com/photo-1555864326-5cf22ef123cf?auto=format&fit=crop&q=80&w=1167&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    SEWING: "https://images.unsplash.com/photo-1528578577235-b963df6db908?auto=format&fit=crop&q=80&w=1170&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    OTHER: "https://images.unsplash.com/photo-1472289065668-ce650ac443d2?auto=format&fit=crop&q=80&w=1169&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
};

export const allCategories: Category[] = ["GARDEN", "TOOLS", "KITCHEN", "PLUMBING", "ELECTRONICS", "SEWING", "OTHER"];

// Funktion zum Abrufen der deutschen Übersetzung
export function getCategoryTranslation(category: Category): string {
    return categoryTranslations[category];
}
export function getCategoryImage(category: Category): string {
    return categoryImages[category];
}