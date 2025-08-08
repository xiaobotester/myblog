// 回到顶部脚本
console.log('回到顶部脚本已加载');

document.addEventListener('DOMContentLoaded', function() {
  // 创建回到顶部按钮（自定义样式 + SVG 图标）
  const backToTopButton = document.createElement('button');
  backToTopButton.id = 'back-to-top';
  backToTopButton.setAttribute('aria-label', '回到顶部');
  backToTopButton.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M7.41 15.41 12 10.83l4.59 4.58L18 14l-6-6-6 6z"/>
    </svg>
  `;
  backToTopButton.style.cssText = `
    position: fixed;
    bottom: 24px;
    right: 24px;
    width: 44px;
    height: 44px;
    border-radius: 12px;
    background-color: var(--md-primary-fg-color, #4f46e5);
    color: #fff;
    border: none;
    cursor: pointer;
    display: none;
    z-index: 9999;
    opacity: 0.9;
    transition: opacity 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  // 悬停与按压效果
  backToTopButton.addEventListener('mouseenter', function() {
    backToTopButton.style.opacity = '1';
    backToTopButton.style.transform = 'translateY(-2px)';
    backToTopButton.style.boxShadow = '0 12px 28px rgba(0,0,0,0.24)';
  });
  backToTopButton.addEventListener('mouseleave', function() {
    backToTopButton.style.opacity = '0.9';
    backToTopButton.style.transform = 'translateY(0)';
    backToTopButton.style.boxShadow = '0 8px 20px rgba(0,0,0,0.2)';
  });

  // 点击回到顶部
  backToTopButton.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  document.body.appendChild(backToTopButton);

  // 滚动显示/隐藏
  window.addEventListener('scroll', function() {
    const top = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    backToTopButton.style.display = top > 300 ? 'flex' : 'none';
  });
});