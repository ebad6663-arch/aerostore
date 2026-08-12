"use client";

interface Props {
  category: {
    id: string;
    name: string;
    slug: string;
    description: string | null;
  };
}

export default function CategoryForm({
  category,
}: Props) {
  return (
    <form className="space-y-4">

      <input
        defaultValue={category.name}
        placeholder="Category name"
        className="
        w-full
        rounded-lg
        border
        border-border
        bg-background
        px-4
        py-3
        "
      />

      <input
        defaultValue={category.slug}
        placeholder="Slug"
        className="
        w-full
        rounded-lg
        border
        border-border
        bg-background
        px-4
        py-3
        "
      />

      <textarea
        defaultValue={category.description ?? ""}
        placeholder="Description"
        className="
        w-full
        rounded-lg
        border
        border-border
        bg-background
        px-4
        py-3
        "
      />

      <button
        type="submit"
        className="
        rounded-lg
        bg-accent
        px-6
        py-3
        text-accent-foreground
        "
      >
        Save Category
      </button>

    </form>
  );
}