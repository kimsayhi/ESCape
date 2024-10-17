export default function timeAgo(dateString: string | undefined): string {
  if (!dateString) {
    return "알 수 없음";
  }

  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return new Date(dateString).toLocaleDateString('ko-KR', options).replace(/\./g, '.').trim();
}
