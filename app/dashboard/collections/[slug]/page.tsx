import { notFound } from "next/navigation";

const collections = {
  anime: {
    name: "Anime",
    description: "Premium anime-inspired keychains and collectibles.",
  },
  cartoon: {
    name: "Cartoon",
    description: "Iconic cartoon character collectibles.",
  },
};

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const collection = collections[slug as keyof typeof collections];

  if (!collection) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 py-20">
      <h1 className="text-6xl font-black">
        {collection.name}
      </h1>

      <p className="mt-5 text-neutral-400">
        {collection.description}
      </p>
    </main>
  );
}