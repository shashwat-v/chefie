// utils/linkPreview.ts
export const getHostname = (url?: string) => {
  try {
    return url ? new URL(url).hostname.replace(/^www\./, "") : "";
  } catch {
    return "";
  }
};

export const getFavicon = (url?: string) =>
  url
    ? `https://www.google.com/s2/favicons?sz=64&domain_url=${encodeURIComponent(
        url
      )}`
    : "";

export const getYoutubeId = (url?: string) => {
  if (!url) return "";
  // handles youtu.be/<id>, youtube.com/watch?v=<id>, and /embed/<id>
  const m1 = url.match(/youtu\.be\/([A-Za-z0-9_-]{6,})/);
  const m2 = url.match(/[?&]v=([A-Za-z0-9_-]{6,})/);
  const m3 = url.match(/\/embed\/([A-Za-z0-9_-]{6,})/);
  return (m1?.[1] || m2?.[1] || m3?.[1] || "").trim();
};

export const getYoutubeThumb = (url?: string) => {
  const id = getYoutubeId(url);
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : "";
};
