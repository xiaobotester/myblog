// 评论功能相关脚本
console.log('评论脚本已加载');

document.addEventListener('DOMContentLoaded', function() {
  // 初始化评论功能
  if (typeof initComments === 'function') {
    initComments();
  }
});