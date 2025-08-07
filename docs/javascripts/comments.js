document.addEventListener("DOMContentLoaded", function() {
  console.log("评论脚本已加载");
  
  // 在所有内容页面添加评论（排除首页和导航页）
  const contentElement = document.querySelector('.md-content__inner');
  const isContentPage = contentElement && (
    document.querySelector('.md-content__inner h1') || 
    !window.location.pathname.endsWith('/')
  );
  
  console.log("当前页面路径:", window.location.pathname);
  console.log("是否为内容页面:", isContentPage);
  
  if (isContentPage) {
    console.log("正在添加评论区...");
    
    // 创建评论区容器
    const commentsContainer = document.createElement('div');
    commentsContainer.id = 'comments';
    commentsContainer.style.marginTop = '3rem';
    commentsContainer.style.paddingTop = '2rem';
    commentsContainer.style.borderTop = '2px solid var(--md-default-fg-color--lightest)';
    
    // 创建评论区标题
    const commentsTitle = document.createElement('h3');
    commentsTitle.innerHTML = '💬 评论区';
    commentsTitle.style.color = 'var(--md-primary-fg-color)';
    commentsTitle.style.marginBottom = '1rem';
    commentsContainer.appendChild(commentsTitle);
    
    // 创建评论区说明
    const commentsDescription = document.createElement('p');
    commentsDescription.textContent = '欢迎留下您的想法和建议，评论基于 GitHub Issues 实现，需要 GitHub 账号。';
    commentsDescription.style.marginBottom = '1.5rem';
    commentsDescription.style.color = 'var(--md-default-fg-color--light)';
    commentsDescription.style.fontStyle = 'italic';
    commentsContainer.appendChild(commentsDescription);
    
    // 将评论区添加到文章末尾
    if (contentElement) {
      contentElement.appendChild(commentsContainer);
      console.log("评论容器已添加到页面");
      
      // 添加 Utterances 评论系统
      const script = document.createElement('script');
      script.src = 'https://utteranc.es/client.js';
      script.setAttribute('repo', 'xiaobotester/myblog');
      script.setAttribute('issue-term', 'pathname');
      script.setAttribute('label', '💬 博客评论');
      script.setAttribute('theme', document.body.getAttribute('data-md-color-scheme') === 'slate' ? 'github-dark' : 'github-light');
      script.setAttribute('crossorigin', 'anonymous');
      script.async = true;
      
      // 添加加载事件监听
      script.onload = function() {
        console.log("Utterances 脚本加载成功");
      };
      
      script.onerror = function() {
        console.error("Utterances 脚本加载失败");
        // 添加错误提示
        const errorMsg = document.createElement('div');
        errorMsg.style.color = 'red';
        errorMsg.style.padding = '1rem';
        errorMsg.style.border = '1px solid red';
        errorMsg.style.borderRadius = '4px';
        errorMsg.style.marginTop = '1rem';
        errorMsg.innerHTML = '<strong>评论加载失败</strong><br>请确保：<br>1. 仓库是公开的<br>2. 已安装 Utterances 应用<br>3. 网络连接正常';
        commentsContainer.appendChild(errorMsg);
      };
      
      commentsContainer.appendChild(script);
      console.log("Utterances 评论脚本已添加");
      
      // 监听主题切换，更新评论主题
      const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
          if (mutation.attributeName === 'data-md-color-scheme') {
            const theme = document.body.getAttribute('data-md-color-scheme') === 'slate' ? 'github-dark' : 'github-light';
            const utterances = document.querySelector('.utterances-frame');
            if (utterances) {
              console.log("更新评论主题为:", theme);
              const message = {
                type: 'set-theme',
                theme: theme
              };
              utterances.contentWindow.postMessage(message, 'https://utteranc.es');
            }
          }
        });
      });
      
      observer.observe(document.body, { attributes: true });
    }
  } else {
    console.log("当前页面不添加评论区");
  }
});