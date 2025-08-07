// 评论功能相关脚本
console.log('评论脚本已加载');

document.addEventListener('DOMContentLoaded', function() {
  // 延迟检查评论区是否正确加载
  setTimeout(function() {
    if (typeof checkCommentsLoaded === 'function') {
      checkCommentsLoaded();
    }
  }, 2000);
});

// 监听主题切换事件
document.addEventListener('DOMContentLoaded', function() {
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type === 'attributes' && mutation.attributeName === 'data-md-color-scheme') {
        if (typeof updateCommentsTheme === 'function') {
          setTimeout(updateCommentsTheme, 500);
        }
      }
    });
  });
  
  observer.observe(document.body, {
    attributes: true,
    attributeFilter: ['data-md-color-scheme']
  });
});
