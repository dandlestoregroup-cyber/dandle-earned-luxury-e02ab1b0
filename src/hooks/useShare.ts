export const useShare = () => {
  const share = async (title: string, text?: string) => {
    const shareData = {
      title,
      text: text || title,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {}
      return;
    }

    try {
      await navigator.clipboard.writeText(window.location.href);
    } catch {}
  };

  return { share };
};
