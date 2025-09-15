import { Suspense } from "react";
import Container from "@/components/layout/Container";
import { Skeleton } from "@/components/ui/Skeleton";
import InfiniteScrollWrapper from "@/components/common/InfiniteScrollWrapper";

interface SearchPageProps {
  searchParams: {
    query?: string;
  };
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.query || "";

  return (
    <Container>
      <div className="py-6">  
        <h1 className="mb-6 text-2xl font-bold text-white">
          {query ? `"${query}" 검색 결과` : "검색 결과"}
        </h1>
        <Suspense fallback={<Skeleton />}>
          <InfiniteScrollWrapper type="search" searchQuery={query} />
        </Suspense>
      </div>
    </Container>
  );
}
