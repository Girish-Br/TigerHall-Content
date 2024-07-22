export const useResizeImage = (url: string, width: number, height: number): string => {
    const urlObj = new URL(url);
    urlObj.pathname = `/resize/${width}x${height}${urlObj.pathname}`;
    return urlObj.toString();
};
