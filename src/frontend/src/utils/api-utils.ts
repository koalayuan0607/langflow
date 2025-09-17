/**
 * 构造带有jwtoken参数的URL
 * @param baseUrl 基础URL
 * @returns 带有jwtoken参数的URL
 */
export function buildUrlWithJwtoken(baseUrl: string): string {
  const thirdPartyToken = sessionStorage.getItem('thirdPartyToken');

  if (!thirdPartyToken) {
    return baseUrl;
  }

  // 检查URL中是否已经有参数
  const hasParams = baseUrl.includes('?');
  const separator = hasParams ? '&' : '?';

  return `${baseUrl}${separator}jwtoken=${thirdPartyToken}`;
}