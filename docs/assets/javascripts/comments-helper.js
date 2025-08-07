// 评论辅助功能脚本
console.log('评论辅助脚本已加载');

// 辅助函数：检查评论区是否正确加载
function checkCommentsLoaded() {
  const commentsSection = document.getElementById('utterances-comment');
  if (commentsSection) {
    console.log('Utterances评论区域已找到');
    return true;
  }
  console.log('未找到Utterances评论区域');
  return false;
}

// 辅助函数：主题切换时更新评论区主题
function updateCommentsTheme() {
  const utterancesFrame = document.querySelector('.utterances-frame');
  if (utterancesFrame) {
    const theme = document.body.getAttribute('data-md-color-scheme');
    const newTheme = theme === 'slate' ? 'github-dark' : 'github-light';
    utterancesFrame.contentWindow.postMessage(
      { type: 'set-theme', theme: newTheme },
      'https://utteranc.es'
    );
  }
}
