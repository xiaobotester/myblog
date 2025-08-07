/**
 * Utterances 评论系统集成脚本
 * 支持首次加载及导航切换时动态刷新
 */

// 激进预加载策略 - 立即开始预加载和预连接
const preconnect1 = document.createElement('link');
preconnect1.rel = 'preconnect';
preconnect1.href = 'https://utteranc.es';
document.head.appendChild(preconnect1);

const preconnect2 = document.createElement('link');
preconnect2.rel = 'preconnect';
preconnect2.href = 'https://api.github.com';
document.head.appendChild(preconnect2);

const preloadScript = document.createElement('link');
preloadScript.rel = 'preload';
preloadScript.href = 'https://utteranc.es/client.js';
preloadScript.as = 'script';
preloadScript.crossOrigin = 'anonymous';
document.head.appendChild(preloadScript);

// 立即开始预加载脚本到内存
const prefetchScript = document.createElement('script');
prefetchScript.src = 'https://utteranc.es/client.js';
prefetchScript.async = true;
prefetchScript.style.display = 'none';
document.head.appendChild(prefetchScript);

// 页面加载完成后立即初始化
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initComments);
} else {
  initComments();
}

let lastPath = '';

function initComments() {
  addCommentsSection();
  lastPath = window.location.pathname;
  
  // 使用 MutationObserver 替代 setInterval 提高性能
  const observer = new MutationObserver(function() {
    if (window.location.pathname !== lastPath) {
      console.log('[Utterances] 路径变化，重新加载评论区');
      addCommentsSection();
      lastPath = window.location.pathname;
    }
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

function addCommentsSection() {
  console.log('[Utterances] 添加评论区');
  
  // 使用更高效的选择器
  const contentArea = document.querySelector('.md-content__inner') || 
                     document.querySelector('article') || 
                     document.querySelector('main');
  
  if (!contentArea) {
    console.error('[Utterances] 未找到内容区域');
    return;
  }

  // 移除旧的评论区
  const old = document.getElementById('utterances-comment');
  if (old) {
    old.remove();
    console.log('[Utterances] 移除旧评论区');
  }

  // 创建评论区容器，但先不显示
  const container = document.createElement('div');
  container.id = 'utterances-comment';
  container.className = 'utterances-container';
  container.style.opacity = '0';
  container.style.transform = 'translateY(20px)';
  container.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

  // 标题
  const title = document.createElement('h2');
  title.textContent = '💬 文章评论';
  title.className = 'utterances-title';
  
  // 创建占位符，模拟评论框的样式
  const placeholder = document.createElement('div');
  placeholder.id = 'utterances-placeholder';
  placeholder.className = 'utterances-placeholder';
  placeholder.innerHTML = `
    <div class="placeholder-header">
      <div class="placeholder-tabs">
        <span class="tab active">写评论</span>
        <span class="tab">预览</span>
      </div>
    </div>
    <div class="placeholder-body">
      <textarea placeholder="在这里写下你的评论..." disabled></textarea>
      <div class="placeholder-footer">
        <small>⏳ 正在加载评论系统...</small>
        <button disabled>评论</button>
      </div>
    </div>
  `;

  container.appendChild(title);
  container.appendChild(placeholder);
  contentArea.appendChild(container);

  // 立即显示容器
  setTimeout(() => {
    container.style.opacity = '1';
    container.style.transform = 'translateY(0)';
  }, 50);

  // 立即开始加载 Utterances 脚本
  loadUtterancesScript(container, placeholder);
}

function loadUtterancesScript(container, placeholder) {
  const startTime = Date.now();
  
  // 获取当前主题
  const theme = document.body.getAttribute('data-md-color-scheme');
  
  // 配置对象
  const config = {
    repo: 'xiaobotester/myblog',
    issueTerm: 'pathname',
    label: '💬 博客评论',
    theme: theme === 'slate' ? 'github-dark' : 'github-light'
  };
  
  // 尝试使用快速缓存加载
  if (window.fastLoadUtterances) {
    console.log('[Utterances] 使用缓存快速加载');
    window.fastLoadUtterances(container, config);
  } else {
    console.log('[Utterances] 使用标准加载方式');
    // 回退到标准加载
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
  
  // 超快速检查 - 每25ms检查一次
  const ultraFastCheck = setInterval(() => {
    const utterancesFrame = container.querySelector('.utterances');
    if (utterancesFrame) {
      clearInterval(ultraFastCheck);
      console.log(`[Utterances] 评论框渲染完成，耗时: ${Date.now() - startTime}ms`);
      
      // 立即替换占位符，无动画延迟
      if (placeholder && placeholder.parentNode) {
        placeholder.style.display = 'none';
        utterancesFrame.style.opacity = '1';
        utterancesFrame.style.visibility = 'visible';
      }
    }
  }, 25);

  // 1.5秒后强制移除占位符
  setTimeout(() => {
    clearInterval(ultraFastCheck);
    if (placeholder && placeholder.parentNode) {
      placeholder.remove();
      console.log('[Utterances] 强制移除占位符');
    }
  }, 1500);
  
  // 错误处理
  setTimeout(() => {
    if (placeholder && placeholder.parentNode) {
      const footer = placeholder.querySelector('.placeholder-footer small');
      if (footer && !container.querySelector('.utterances')) {
        footer.innerHTML = '⚠️ 评论加载较慢，请稍候...';
        footer.style.color = '#ff9800';
      }
    }
  }, 3000);
}
