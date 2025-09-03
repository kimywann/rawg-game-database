import GameList from "@/components/features/GameList";
import { Game, Genre } from "@/types/game";

export default async function Home() {
  const mockGenres: Genre[] = [
    { id: 1, name: "Action", slug: "action", games_count: 1500 },
    { id: 2, name: "Adventure", slug: "adventure", games_count: 800 },
    { id: 3, name: "RPG", slug: "role-playing-games-rpg", games_count: 600 },
    { id: 4, name: "Shooter", slug: "shooter", games_count: 900 },
    { id: 5, name: "Strategy", slug: "strategy", games_count: 400 },
    { id: 6, name: "Simulation", slug: "simulation", games_count: 300 },
    { id: 7, name: "Puzzle", slug: "puzzle", games_count: 250 },
    { id: 8, name: "Racing", slug: "racing", games_count: 200 },
  ];

  // Mock 게임 데이터 - 장르 ID로 연결
  const games: Game[] = [
    {
      id: 1,
      name: "Vampire: The Masquerade – Bloodlines 2",
      background_image: "/example2.jpg",
      released: "2025-01-01",
      added: 100,
      genres: [
        mockGenres.find((g) => g.id === 1)!, // Action
        mockGenres.find((g) => g.id === 2)!, // Adventure
        mockGenres.find((g) => g.id === 3)!, // RPG
      ],
      rating: 4.5,
    },
    {
      id: 2,
      name: "Mafia: The Old Country",
      background_image: "/example2.jpg",
      released: "2025-01-02",
      added: 2000,
      genres: [
        mockGenres.find((g) => g.id === 1)!, // Action
        mockGenres.find((g) => g.id === 2)!, // Adventure
      ],
      rating: 3.8,
    },
    {
      id: 3,
      name: "Replaced",
      background_image: "/example2.jpg",
      released: "2025-01-03",
      added: 300,
      genres: [
        mockGenres.find((g) => g.id === 1)!, // Action
        mockGenres.find((g) => g.id === 2)!, // Adventure
        mockGenres.find((g) => g.id === 4)!, // Shooter
      ],
      rating: 4.3,
    },
    {
      id: 4,
      name: "Wuchang: Fallen Feathers",
      background_image: "/example2.jpg",
      released: "2025-01-03",
      added: 3020,
      genres: [
        mockGenres.find((g) => g.id === 1)!, // Action
        mockGenres.find((g) => g.id === 3)!, // RPG
      ],
      rating: 4.2,
    },
    {
      id: 5,
      name: "Crisis: Commandos Survival",
      background_image: "/example2.jpg",
      released: "2025-01-03",
      added: 3030,
      genres: [
        mockGenres.find((g) => g.id === 5)!, // Strategy
        mockGenres.find((g) => g.id === 1)!, // Action
      ],
      rating: 4.1,
    },
    {
      id: 6,
      name: "Racing Championship",
      background_image: "/example2.jpg",
      released: "2025-01-03",
      added: 3040,
      genres: [
        mockGenres.find((g) => g.id === 8)!, // Racing
        mockGenres.find((g) => g.id === 6)!, // Simulation
      ],
      rating: 4.0,
    },
    {
      id: 7,
      name: "Puzzle Master",
      background_image: "/example2.jpg",
      released: "2025-01-03",
      added: 3050,
      genres: [
        mockGenres.find((g) => g.id === 7)!, // Puzzle
      ],
      rating: 3.9,
    },
    {
      id: 8,
      name: "City Builder Pro",
      background_image: "/example2.jpg",
      released: "2025-01-03",
      added: 3060,
      genres: [
        mockGenres.find((g) => g.id === 6)!, // Simulation
        mockGenres.find((g) => g.id === 5)!, // Strategy
      ],
      rating: 3.8,
    },
    {
      id: 9,
      name: "Space Shooter Elite",
      background_image: "/example2.jpg",
      released: "2025-01-03",
      added: 3070,
      genres: [
        mockGenres.find((g) => g.id === 4)!, // Shooter
        mockGenres.find((g) => g.id === 1)!, // Action
      ],
      rating: 3.7,
    },
  ];

  return (
    <div className="flex">
      <main className="flex w-full flex-col items-center lg:flex-1 lg:items-start">
        <div className="flex flex-col items-center gap-2 text-center lg:items-start lg:text-left">
          <h1 className="text-4xl font-bold sm:text-5xl lg:text-7xl">
            New and trending
          </h1>
          <p className="text-sm sm:text-base">
            Based on player counts and release date
          </p>
        </div>
        <section className="w-full">
          <div className="mt-6 lg:mt-10">
            <GameList games={games} />
          </div>
        </section>
      </main>
    </div>
  );
}
