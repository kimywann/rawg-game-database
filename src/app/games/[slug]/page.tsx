import Link from "next/link";
import Image from "next/image";

const SlugPage = () => {
  const mockGenres = [
    { id: 1, name: "Action", slug: "action", games_count: 1500 },
    { id: 2, name: "Adventure", slug: "adventure", games_count: 800 },
    { id: 3, name: "RPG", slug: "role-playing-games-rpg", games_count: 600 },
  ];
  const mockData = {
    id: 1,
    name: "Vampire: The Masquerade – Bloodlines 2",
    about:
      "Vampire: The Masquerade – Bloodlines 2 is a role-playing game developed by Nacon and published by Deck13 Interactive. It is the sequel to Vampire: The Masquerade – Bloodlines, which was released in 2004.",
    background_image: [
      "/example2.jpg",
      "/example2.jpg",
      "/example2.jpg",
      "/example2.jpg",
      "/example2.jpg",
    ],
    released: "2025-01-01",
    added: 100,
    genres: [
      mockGenres.find((g) => g.id === 1)!, // Action
      mockGenres.find((g) => g.id === 2)!, // Adventure
      mockGenres.find((g) => g.id === 3)!, // RPG
    ],
    rating: 4.5,
  };
  return (
    <main className="mx-auto max-w-6xl px-4">
      <div className="flex items-center gap-2 text-xs text-zinc-500">
        <Link href="/" className="transition-colors hover:text-white">
          HOME
        </Link>
        <span>/</span>
        <Link href="/games" className="transition-colors hover:text-white">
          GAMES
        </Link>
        <span>/</span>
        <span>{mockData.name.toUpperCase()}</span>
      </div>
      <section className="flex">
        <div className="mt-5 flex flex-1 flex-col gap-4">
          <div className="flex h-5 w-22 items-center justify-center rounded-sm bg-white text-sm font-light text-black">
            <p>{mockData.released}</p>
          </div>
          <p className="text-7xl font-bold">{mockData.name}</p>
          <div className="mt-10 flex flex-col gap-2">
            <h3 className="text-2xl font-bold">About</h3>
            <p className="text-sm text-white">{mockData.about}</p>
          </div>
        </div>
        <div className="flex w-1/2 flex-col gap-4">
          {/* 메인 이미지 - 큰 사이즈 */}
          <div className="flex max-w-[520px] flex-col gap-4">
            <Image
              src={mockData.background_image[0]}
              alt={mockData.name}
              width={400}
              height={250}
              className="h-auto w-full rounded-lg"
            />
          </div>

          {/* 썸네일 이미지들 - 가로로 배열 */}
          <div className="grid grid-cols-2 gap-x-3 gap-y-4">
            <Image
              src={mockData.background_image[1]}
              alt={mockData.name}
              width={250}
              height={100}
              className="cursor-pointer rounded transition-opacity hover:opacity-80"
            />
            <Image
              src={mockData.background_image[2]}
              alt={mockData.name}
              width={250}
              height={100}
              className="cursor-pointer rounded transition-opacity hover:opacity-80"
            />
            <Image
              src={mockData.background_image[3]}
              alt={mockData.name}
              width={250}
              height={100}
              className="cursor-pointer rounded transition-opacity hover:opacity-80"
            />
            <div className="flex h-[140px] w-[250px] cursor-pointer items-center justify-center rounded-md bg-gray-800 opacity-70 transition-opacity hover:opacity-90">
              <span className="text-sm font-medium text-white">view all</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SlugPage;
