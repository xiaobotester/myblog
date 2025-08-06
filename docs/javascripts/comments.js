// Giscus评论系统配置
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
                欢迎在下方留言讨论，分享你的想法和建议！
            </p>
        `;
        
        // 将评论容器添加到文章内容后面
        const article = document.querySelector('article.md-content__inner');
        if (article) {
            article.appendChild(commentsContainer);
            
            // 创建Giscus脚本
            const script = document.createElement('script');
            script.src = 'https://giscus.app/client.js';
            script.setAttribute('data-repo', 'xiaobotester/myblog');
            script.setAttribute('data-repo-id', 'R_kgDONhqJJw');
            script.setAttribute('data-category', 'General');
            script.setAttribute('data-category-id', 'DIC_kwDONhqJJ84ClGWs');
            script.setAttribute('data-mapping', 'pathname');
            script.setAttribute('data-strict', '0');
            script.setAttribute('data-reactions-enabled', '1');
            script.setAttribute('data-emit-metadata', '0');
            script.setAttribute('data-input-position', 'bottom');
            script.setAttribute('data-theme', 'preferred_color_scheme');
            script.setAttribute('data-lang', 'zh-CN');
            script.crossOrigin = 'anonymous';
            script.async = true;
            
            commentsContainer.appendChild(script);
        }
    }
});

// 主题切换时更新评论系统主题
document.addEventListener('DOMContentLoaded', function() {
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'data-md-color-scheme') {
                const iframe = document.querySelector('iframe.giscus-frame');
                if (iframe) {
                    const theme = document.body.getAttribute('data-md-color-scheme') === 'slate' ? 'dark' : 'light';
                    iframe.contentWindow.postMessage({
                        giscus: {
                            setConfig: {
                                theme: theme
                            }
                        }
                    }, 'https://giscus.app');
                }
            }
        });
    });
    
    observer.observe(document.body, {
        attributes: true,
        attributeFilter: ['data-md-color-scheme']
    });
});