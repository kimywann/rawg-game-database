import { redirect } from "next/navigation";

const ReleaseCalendarPage = () => {
  // 현재 날짜로 리다이렉트
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;

  redirect(`/video-game-releases/${currentYear}-${currentMonth}`);
};

export default ReleaseCalendarPage;
