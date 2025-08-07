/**
 * Utterances 缓存优化脚本
 * 使用本地存储和预加载来加速评论区加载
 */

// 缓存 Utterances 脚本内容
const UTTERANCES_CACHE_KEY = 'utterances_script_cache';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24小时

// 预加载并缓存 Utterances 脚本
async function preloadUtterancesScript() {
  try {
    const cached = localStorage.getItem(UTTERANCES_CACHE_KEY);
    const cacheTime = localStorage.getItem(UTTERANCES_CACHE_KEY + '_time');
    
    // 检查缓存是否有效
    if (cached && cacheTime && (Date.now() - parseInt(cacheTime)) < CACHE_DURATION) {
      console.log('[Utterances Cache] 使用缓存的脚本');
      return cached;
    }
    
    // 获取最新脚本
    console.log('[Utterances Cache] 获取最新脚本');
    const response = await fetch('https://utteranc.es/client.js', {
      cache: 'force-cache',
      mode: 'cors'
    });
    
    if (response.ok) {
      const scriptContent = await response.text();
      localStorage.setItem(UTTERANCES_CACHE_KEY, scriptContent);
      localStorage.setItem(UTTERANCES_CACHE_KEY + '_time', Date.now().toString());
      return scriptContent;
    }
  } catch (error) {
    console.warn('[Utterances Cache] 预加载失败，使用标准加载方式', error);
  }
  
  return null;
}

// 立即开始预加载
preloadUtterancesScript();

// 快速加载 Utterances 的函数
window.fastLoadUtterances = function(container, config) {
  const startTime = Date.now();
  
  // 尝试使用缓存的脚本
  const cachedScript = localStorage.getItem(UTTERANCES_CACHE_KEY);
  
  if (cachedScript) {
    console.log('[Utterances Cache] 使用缓存快速加载');
    
    // 创建一个包装脚本来执行缓存的内容
    const script = document.createElement('script');
    script.textContent = `
      (function() {
        ${cachedScript}
      })();
    `;
    
    // 设置 Utterances 配置
    const configScript = document.createElement('script');
    configScript.setAttribute('repo', config.repo);
    configScript.setAttribute('issue-term', config.issueTerm);
    configScript.setAttribute('label', config.label);
    configScript.setAttribute('theme', config.theme);
    configScript.setAttribute('crossorigin', 'anonymous');
    configScript.src = 'https://utteranc.es/client.js';
    configScript.async = true;
    
    container.appendChild(configScript);
    
    console.log(`[Utterances Cache] 缓存加载完成，耗时: ${Date.now() - startTime}ms`);
  } else {
    // 回退到标准加载方式
    console.log('[Utterances Cache] 回退到标准加载');
    const script = document.createElement('script');
    script.src = 'https://utteranc.es/client.js';
    script.setAttribute('repo', config.repo);
    script.setAttribute('issue-term', config.issueTerm);
    script.setAttribute('label', config.label);
    script.setAttribute('theme', config.theme);
    script.setAttribute('crossorigin', 'anonymous');
    script.async = true;
    
    container.appendChild(script);
  }
};

// DNS 预解析和预连接
const dnsPreconnects = [
  'https://utteranc.es',
  'https://api.github.com',
  'https://github.com',
  'https://avatars.githubusercontent.com'
];

dnsPreconnects.forEach(url => {
  const link = document.createElement('link');
  link.rel = 'preconnect';
  link.href = url;
  link.crossOrigin = 'anonymous';
  document.head.appendChild(link);
});