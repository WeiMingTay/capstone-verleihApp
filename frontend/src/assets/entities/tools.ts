export type Tools = {
    id: string;
    name: string;
    image: string;
    category: Category;
    author: string;
    location: string;
    description: string;
    timestamp: string;

}


type Category = "GARDEN" | "TOOLS" | "KITCHEN" | "PLUMBING" | "ELECTRONICS" | "SEWING" | "OTHER";

const categoryTranslations: Record<Category, string> = {
    GARDEN: "GARTEN",
    TOOLS: "WERKZEUGE",
    KITCHEN: "KÜCHE",
    PLUMBING: "SANITÄR",
    ELECTRONICS: "ELEKTRONIK",
    SEWING: "NÄHEN & STRICKEN",
    OTHER: "SONSTIGES",
};

export const allCategories: Category[] = ["GARDEN", "TOOLS", "KITCHEN", "PLUMBING", "ELECTRONICS", "SEWING", "OTHER"];

// Funktion zum Abrufen der deutschen Übersetzung
export function getCategoryTranslation(category: Category): string {
    return categoryTranslations[category];
}