/**
 * Utterances 评论系统集成脚本 - 高性能版本
 * 支持首次加载及导航切换时动态刷新，优化加载速度和渲染性能
 * v2.0.0
 */

// 立即执行的初始化函数，避免全局变量污染
(function() {
  // 性能计时器
  const perfTimer = {
    start: Date.now(),
    marks: {},
    mark(name) {
      this.marks[name] = Date.now() - this.start;
      console.debug(`[Utterances] 性能标记: ${name} = ${this.marks[name]}ms`);
    }
  };
  
  perfTimer.mark('初始化开始');
  
  // 配置常量
  const CONFIG = {
    repo: 'xiaobotester/myblog',
    issueTerm: 'pathname',
    label: '💬 博客评论',
    scriptUrl: 'https://utteranc.es/client.js',
    loadTimeout: 10000, // 10秒超时
    resources: [
      { type: 'preconnect', url: 'https://utteranc.es' },
      { type: 'preconnect', url: 'https://api.github.com' },
      { type: 'preconnect', url: 'https://github.com' },
      { type: 'preconnect', url: 'https://avatars.githubusercontent.com' },
      { type: 'preload', url: 'https://utteranc.es/client.js', as: 'script' }
    ]
  };
  
  // 立即开始资源预加载 - 使用 requestIdleCallback 在浏览器空闲时执行
  const preloadResources = () => {
    CONFIG.resources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = resource.type;
      link.href = resource.url;
      if (resource.as) link.as = resource.as;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });
    perfTimer.mark('资源预加载完成');
  };
  
  // 使用 requestIdleCallback 或 setTimeout 作为降级方案
  (window.requestIdleCallback || setTimeout)(preloadResources);
  
  // 使用 IntersectionObserver 实现懒加载
  let commentsLoaded = false;
  let lastPath = window.location.pathname;
  let observer = null;
  
  // 初始化评论区
  function initComments() {
    perfTimer.mark('初始化评论区');
    
    // 如果页面已经加载完成，立即添加评论区
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      setupCommentsArea();
    } else {
      // 否则等待 DOMContentLoaded 事件
      document.addEventListener('DOMContentLoaded', setupCommentsArea);
    }
    
    // 监听路径变化
    setupPathObserver();
  }
  
  // 设置路径变化监听
  function setupPathObserver() {
    // 使用 MutationObserver 监听 DOM 变化，检测路径变化
    const pathObserver = new MutationObserver(function() {
      if (window.location.pathname !== lastPath) {
        console.log('[Utterances] 检测到路径变化，重新加载评论区');
        lastPath = window.location.pathname;
        commentsLoaded = false;
        setupCommentsArea();
      }
    });
    
    pathObserver.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
  
  // 设置评论区
  function setupCommentsArea() {
    perfTimer.mark('设置评论区开始');
    
    // 查找内容区域
    const contentArea = document.querySelector('.md-content__inner') || 
                       document.querySelector('article') || 
                       document.querySelector('main');
    
    if (!contentArea) {
      console.error('[Utterances] 未找到内容区域，无法添加评论区');
      return;
    }
    
    // 移除旧的评论区
    const old = document.getElementById('utterances-comment');
    if (old) {
      old.remove();
      console.log('[Utterances] 移除旧评论区');
    }
    
    // 创建评论区容器
    const container = createCommentsContainer();
    contentArea.appendChild(container);
    
    // 使用 IntersectionObserver 实现懒加载
    setupLazyLoading(container);
    
    perfTimer.mark('设置评论区完成');
  }
  
  // 创建评论区容器
  function createCommentsContainer() {
    // 创建容器
    const container = document.createElement('div');
    container.id = 'utterances-comment';
    container.className = 'utterances-container';
    
    // 使用 will-change 提示浏览器预先创建合成层，减少重绘
    container.style.willChange = 'opacity, transform';
    container.style.opacity = '0';
    container.style.transform = 'translateY(20px)';
    container.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    
    // 预先设置容器高度，减少布局跳动
    container.style.minHeight = '150px';
    
    // 标题
    const title = document.createElement('h2');
    title.textContent = '💬 文章评论';
    title.className = 'utterances-title';
    
    // 创建占位符
    const placeholder = createPlaceholder();
    
    container.appendChild(title);
    container.appendChild(placeholder);
    
    // 立即显示容器，使用 requestAnimationFrame 确保在下一帧渲染
    requestAnimationFrame(() => {
      container.style.opacity = '1';
      container.style.transform = 'translateY(0)';
    });
    
    return container;
  }
  
  // 创建占位符
  function createPlaceholder() {
    const placeholder = document.createElement('div');
    placeholder.id = 'utterances-placeholder';
    placeholder.className = 'utterances-placeholder';
    
    // 使用更简洁的占位符，减少渲染负担
    placeholder.innerHTML = `
      <div class="placeholder-header">
        <div class="placeholder-tabs">
          <span class="tab active">写评论</span>
          <span class="tab">预览</span>
        </div>
      </div>
      <div class="placeholder-body">
        <div class="placeholder-textarea"></div>
        <div class="placeholder-footer">
          <small>⏳ 正在加载评论系统...</small>
          <div class="placeholder-button"></div>
        </div>
      </div>
    `;
    
    return placeholder;
  }
  
  // 设置懒加载
  function setupLazyLoading(container) {
    // 如果已经加载过评论，不再重复加载
    if (commentsLoaded) return;
    
    // 如果浏览器支持 IntersectionObserver
    if ('IntersectionObserver' in window) {
      // 清理旧的观察器
      if (observer) observer.disconnect();
      
      // 创建新的观察器
      observer = new IntersectionObserver((entries) => {
        // 当评论区进入视口
        if (entries[0].isIntersecting && !commentsLoaded) {
          perfTimer.mark('评论区进入视口');
          loadUtterancesScript(container);
          commentsLoaded = true;
          observer.disconnect();
        }
      }, {
        rootMargin: '200px 0px', // 提前200px加载
        threshold: 0.1
      });
      
      // 开始观察
      observer.observe(container);
      console.log('[Utterances] 设置懒加载观察器');
    } else {
      // 降级方案：如果不支持 IntersectionObserver，直接加载
      console.log('[Utterances] 浏览器不支持 IntersectionObserver，使用直接加载');
      loadUtterancesScript(container);
      commentsLoaded = true;
    }
  }
  
  // 加载 Utterances 脚本
  function loadUtterancesScript(container) {
    perfTimer.mark('开始加载评论脚本');
    
    const placeholder = container.querySelector('#utterances-placeholder');
    const startTime = Date.now();
    
    // 获取当前主题
    const theme = document.body.getAttribute('data-md-color-scheme');
    
    // 配置对象
    const config = {
      repo: CONFIG.repo,
      issueTerm: CONFIG.issueTerm,
      label: CONFIG.label,
      theme: theme === 'slate' ? 'github-dark' : 'github-light'
    };
    
    // 尝试使用缓存加载
    if (window.fastLoadUtterances) {
      console.log('[Utterances] 使用缓存快速加载');
      window.fastLoadUtterances(container, config);
    } else {
      console.log('[Utterances] 使用标准加载方式');
      
      // 使用 Worker 加载脚本，避免阻塞主线程
      if (window.Worker) {
        loadWithWorker(container, config);
      } else {
        // 降级方案：直接加载
        loadDirectly(container, config);
      }
    }
    
    // 设置加载超时
    const loadTimeout = setTimeout(() => {
      console.warn(`[Utterances] 加载超时 (${CONFIG.loadTimeout}ms)`);
      updateLoadingStatus(placeholder, '⚠️ 评论加载超时，请刷新页面重试', '#f44336');
    }, CONFIG.loadTimeout);
    
    // 检查加载状态
    setupLoadingCheck(container, placeholder, loadTimeout);
  }
  
  // 使用 Worker 加载脚本
  function loadWithWorker(container, config) {
    try {
      // 创建内联 Worker
      const workerBlob = new Blob([`
        self.onmessage = function() {
          fetch('${CONFIG.scriptUrl}')
            .then(response => {
              if (response.ok) return response.text();
              throw new Error('Failed to load script');
            })
            .then(script => {
              self.postMessage({ success: true });
            })
            .catch(error => {
              self.postMessage({ success: false, error: error.message });
            });
        };
      `], { type: 'application/javascript' });
      
      const workerUrl = URL.createObjectURL(workerBlob);
      const worker = new Worker(workerUrl);
      
      worker.onmessage = function(e) {
        if (e.data.success) {
          // Worker 成功预加载后，正式加载脚本
          loadDirectly(container, config);
        } else {
          console.error('[Utterances] Worker 加载失败:', e.data.error);
          loadDirectly(container, config); // 降级到直接加载
        }
        
        // 清理资源
        worker.terminate();
        URL.revokeObjectURL(workerUrl);
      };
      
      // 启动 Worker
      worker.postMessage('start');
      
    } catch (error) {
      console.error('[Utterances] Worker 创建失败:', error);
      loadDirectly(container, config); // 降级到直接加载
    }
  }
  
  // 直接加载脚本
  function loadDirectly(container, config) {
    const script = document.createElement('script');
    script.src = CONFIG.scriptUrl;
    script.setAttribute('repo', config.repo);
    script.setAttribute('issue-term', config.issueTerm);
    script.setAttribute('label', config.label);
    script.setAttribute('theme', config.theme);
    script.setAttribute('crossorigin', 'anonymous');
    script.async = true;
    
    container.appendChild(script);
  }
  
  // 设置加载状态检查
  function setupLoadingCheck(container, placeholder, loadTimeout) {
    // 使用 requestAnimationFrame 进行高效检查
    let checkCount = 0;
    const maxChecks = 400; // 最多检查10秒 (25fps)
    
    function checkFrame() {
      const utterancesFrame = container.querySelector('.utterances');
      
      if (utterancesFrame) {
        // 成功加载
        clearTimeout(loadTimeout);
        perfTimer.mark('评论框加载完成');
        
        // 平滑过渡
        if (placeholder && placeholder.parentNode) {
          placeholder.style.opacity = '0';
          placeholder.style.transform = 'translateY(10px)';
          
          // 等待淡出动画完成后移除
          setTimeout(() => {
            placeholder.remove();
            utterancesFrame.style.opacity = '1';
            utterancesFrame.style.visibility = 'visible';
          }, 300);
        }
        
        return;
      }
      
      // 继续检查，但限制检查次数
      checkCount++;
      if (checkCount < maxChecks) {
        requestAnimationFrame(checkFrame);
      }
      
      // 更新加载状态
      if (checkCount === 120) { // 约3秒
        updateLoadingStatus(placeholder, '⏳ 评论加载中，请稍候...', '#ff9800');
      }
    }
    
    // 开始检查
    requestAnimationFrame(checkFrame);
  }
  
  // 更新加载状态
  function updateLoadingStatus(placeholder, message, color) {
    if (!placeholder) return;
    
    const footer = placeholder.querySelector('.placeholder-footer small');
    if (footer) {
      footer.innerHTML = message;
      if (color) footer.style.color = color;
    }
  }
  
  // 立即初始化
  initComments();
  
  // 导出全局函数，用于手动刷新评论区
  window.refreshUtterances = function() {
    commentsLoaded = false;
    setupCommentsArea();
    return '评论区刷新请求已发送';
  };
  
  perfTimer.mark('初始化完成');
})();
