// Utterances评论系统配置（更稳定的替代方案）
document.addEventListener('DOMContentLoaded', function() {
    // 检查是否在文章页面（非首页）
    if (window.location.pathname !== '/' && window.location.pathname !== '/index.html') {
        // 创建评论容器
        const commentsContainer = document.createElement('div');
        commentsContainer.id = 'comments';
        commentsContainer.innerHTML = `
            <hr style="margin: 2rem 0;">
            <h3>💬 评论区</h3>
            <p style="color: var(--md-default-fg-color--light); margin-bottom: 1rem;">
                欢迎在下方留言讨论，分享你的想法和建议！评论将以GitHub Issues的形式保存。
            </p>
        `;
        
        // 将评论容器添加到文章内容后面
        const article = document.querySelector('article.md-content__inner');
        if (article) {
            article.appendChild(commentsContainer);
            
            // 创建Utterances脚本
            const script = document.createElement('script');
            script.src = 'https://utteranc.es/client.js';
            script.setAttribute('repo', 'xiaobotester/myblog');
            script.setAttribute('issue-term', 'pathname');
            script.setAttribute('label', '💬 博客评论');
            
            // 根据当前主题设置评论主题
            const currentTheme = document.body.getAttribute('data-md-color-scheme');
            const utterancesTheme = currentTheme === 'slate' ? 'github-dark' : 'github-light';
            script.setAttribute('theme', utterancesTheme);
            
            script.crossOrigin = 'anonymous';
            script.async = true;
            
            commentsContainer.appendChild(script);
        }
    }
});

// 主题切换时更新Utterances主题
document.addEventListener('DOMContentLoaded', function() {
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'data-md-color-scheme') {
                const utterancesFrame = document.querySelector('.utterances-frame');
                if (utterancesFrame) {
                    const theme = document.body.getAttribute('data-md-color-scheme') === 'slate' ? 'github-dark' : 'github-light';
                    const message = {
                        type: 'set-theme',
                        theme: theme
                    };
                    utterancesFrame.contentWindow.postMessage(message, 'https://utteranc.es');
                }
            }
        });
    });
    
    observer.observe(document.body, {
        attributes: true,
        attributeFilter: ['data-md-color-scheme']
    });
});
