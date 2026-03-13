export function timeAgo(time) {
  if (!time) return "";

  const past = new Date(time);

  // 如果不是合法日期，直接回傳原字串
  if (Number.isNaN(past.getTime())) {
    return String(time);
  }

  const now = new Date();
  const diff = Math.floor((now - past) / 1000);

  if (diff < 60) return "剛剛";

  const minutes = Math.floor(diff / 60);
  if (minutes < 60) return `${minutes}分鐘前`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}小時前`;

  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}天前`;

  const months = Math.floor(days / 30);
  if (months < 12) return `${months}個月前`;

  const years = Math.floor(months / 12);
  return `${years}年前`;
}
