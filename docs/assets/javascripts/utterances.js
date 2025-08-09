/**
 * 简化版 Utterances 评论系统
 * 确保评论系统能正常加载和显示
 */

// 配置
const CONFIG = {
  repo: 'xiaobotester/myblog',
  issueTerm: 'pathname',
  label: '💬 博客评论',
  theme: 'github-light'
};

// 去重与清理，确保页面上最多只有一个 Utterances，且与内置评论不冲突
function cleanupAndDedupe() {
  const materialComments = document.querySelector('[data-md-component="comments"]');
  // 如果主题已渲染内置评论，移除我们自定义的容器，避免双评论
  if (materialComments) {
    document.querySelectorAll('#utterances-comment').forEach(n => n.remove());
  }
  // 无论如何，都确保页面上至多只有一个 utterances iframe
  const iframes = Array.from(document.querySelectorAll('iframe[src*="utteranc.es"]'));
  if (iframes.length > 1) {
    // 保留第一个，移除多余的
    for (let i = 1; i < iframes.length; i++) {
      iframes[i].remove();
    }
  }
}

// 初始化评论系统
function initComments() {
  // 等待页面加载完成，稍作延迟以便主题内置评论优先生效
  const delayedSetup = () => setTimeout(setupComments, 120);
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', delayedSetup);
  } else {
    delayedSetup();
  }
}

// 设置评论区
function setupComments() {
  cleanupAndDedupe();
  // 查找内容区域
  const contentArea = document.querySelector('.md-content__inner') ||
                      document.querySelector('article') ||
                      document.querySelector('main');

  if (!contentArea) return;

  // 如果主题已挂载内置评论或页面已存在 utterances iframe，则不再注入，避免重复
  const materialComments = document.querySelector('[data-md-component="comments"]');
  const existingIframe = document.querySelector('iframe[src*="utteranc.es"]');

  if (materialComments || existingIframe) {
    // 清理我们旧的占位容器，交给已有的评论实现
    document.querySelectorAll('#utterances-comment').forEach(n => n.remove());
    return;
  }

  // 移除旧的评论区（准备重新创建）
  const oldComments = document.getElementById('utterances-comment');
  if (oldComments) oldComments.remove();

  // 创建评论区容器
  const container = document.createElement('div');
  container.id = 'utterances-comment';
  container.className = 'utterances-container';

  // 创建标题
  const title = document.createElement('h2');
  title.textContent = '💬 文章评论';
  title.className = 'utterances-title';

  // 创建加载提示
  const loadingDiv = document.createElement('div');
  loadingDiv.innerHTML = `
    <div style="
      text-align: center;
      padding: 2rem;
      color: #666;
      background: #f9f9f9;
      border-radius: 8px;
      margin: 1rem 0;
    ">
      <p>正在加载评论系统...</p>
      <button onclick="loadUtterances()" style="
        background: #007cba;
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 4px;
        cursor: pointer;
        margin-top: 10px;
      ">手动加载</button>
    </div>
  `;

  container.appendChild(title);
  container.appendChild(loadingDiv);
  contentArea.appendChild(container);

  // 延迟加载评论
  setTimeout(loadUtterances, 400);
}

// 加载 Utterances
function loadUtterances() {
  const container = document.getElementById('utterances-comment');
  if (!container) return;

  // 若已存在 iframe（可能由主题或之前加载产生），避免再次注入
  const anyExistingIframe = document.querySelector('iframe[src*="utteranc.es"]');
  if (anyExistingIframe) return;

  // 移除加载提示
  const loadingDiv = container.querySelector('div');
  if (loadingDiv) loadingDiv.remove();

  // 创建 Utterances 脚本
  const script = document.createElement('script');
  script.src = 'https://utteranc.es/client.js';
  script.setAttribute('repo', CONFIG.repo);
  script.setAttribute('issue-term', CONFIG.issueTerm);
  script.setAttribute('label', CONFIG.label);
  script.setAttribute('theme', CONFIG.theme);
  script.setAttribute('crossorigin', 'anonymous');
  script.async = true;

  // 错误处理
  script.onerror = function() {
    showError(container, '评论系统加载失败，请检查网络连接');
  };

  container.appendChild(script);
}

// 显示错误信息
function showError(container, message) {
  const errorDiv = document.createElement('div');
  errorDiv.innerHTML = `
    <div style="
      text-align: center;
      padding: 2rem;
      color: #d32f2f;
      background: #ffebee;
      border: 1px solid #ffcdd2;
      border-radius: 8px;
      margin: 1rem 0;
    ">
      <p>${message}</p>
      <button onclick="loadUtterances()" style="
        background: #d32f2f;
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 4px;
        cursor: pointer;
        margin-top: 10px;
      ">重试</button>
    </div>
  `;
  container.appendChild(errorDiv);
}

// 全局函数，供手动调用
window.loadUtterances = loadUtterances;

// 立即初始化
initComments();

// 适配 MkDocs Material 的 Instant Navigation：每次文档切换后重新挂载评论
if (window.document$ && typeof window.document$.subscribe === 'function') {
  window.document$.subscribe(() => {
    // 每次页面切换先清理再挂载，延迟等待内置评论完成
    cleanupAndDedupe();
    setTimeout(setupComments, 200);
  });
}

// 监听主题变化
document.addEventListener('DOMContentLoaded', function() {
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type === 'attributes' && mutation.attributeName === 'data-md-color-scheme') {
        // 可以在这里重新加载评论系统以适配新主题
      }
    });
  });
  
  observer.observe(document.body, {
    attributes: true,
    attributeFilter: ['data-md-color-scheme']
  });
});
