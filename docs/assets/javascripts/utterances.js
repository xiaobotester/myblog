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

// 初始化评论系统
function initComments() {
  // 等待页面加载完成
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupComments);
  } else {
    setupComments();
  }
}

// 设置评论区
function setupComments() {
  // 查找内容区域
  const contentArea = document.querySelector('.md-content__inner') || 
                     document.querySelector('article') || 
                     document.querySelector('main');
  
  if (!contentArea) {
    return;
  }
  
  // 移除旧的评论区
  const oldComments = document.getElementById('utterances-comment');
  if (oldComments) {
    oldComments.remove();
  }
  
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
  setTimeout(loadUtterances, 1000);
}

// 加载 Utterances
function loadUtterances() {
  const container = document.getElementById('utterances-comment');
  if (!container) {
    return;
  }
  
  // 移除加载提示
  const loadingDiv = container.querySelector('div');
  if (loadingDiv) {
    loadingDiv.remove();
  }
  
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
