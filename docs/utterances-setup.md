---
title: Utterances评论系统说明
date: 2024-01-01
categories:
  - 配置
tags:
  - Utterances
  - 评论系统
---

# 🎉 Utterances评论系统已配置完成

由于Giscus评论系统遇到配置问题，我已经为你切换到更稳定的**Utterances**评论系统。

## ✅ Utterances的优势

- **更稳定**：基于GitHub Issues，配置简单
- **无需额外设置**：不需要启用Discussions功能
- **完全免费**：GitHub Issues完全免费
- **主题自适应**：自动适配深浅色主题
- **中文支持**：完美支持中文评论

## 🔧 工作原理

- 每篇文章的评论会自动创建对应的GitHub Issue
- 评论数据存储在你的仓库的Issues中
- 访客需要GitHub账号才能评论
- 支持Markdown语法和@提及功能

## 🎨 功能特性

### 自动标签
- 所有评论Issue都会自动添加 `💬 博客评论` 标签
- 便于在GitHub中管理和筛选

### 主题适配
- 浅色模式：使用GitHub Light主题
- 深色模式：使用GitHub Dark主题
- 主题切换时评论区会自动更新

### 响应式设计
- 完美适配手机、平板、电脑
- 与博客整体风格保持一致

## 📋 使用说明

### 对于访客
1. 滚动到文章底部查看评论区
2. 点击"Sign in with GitHub"登录
3. 输入评论内容（支持Markdown）
4. 点击"Comment"发表评论

### 对于博主（你）
1. 在GitHub仓库的Issues页面可以看到所有评论
2. 可以直接在GitHub中回复和管理评论
3. 可以关闭或删除不当评论
4. 支持邮件通知新评论

## 🔍 管理评论

访问 https://github.com/xiaobotester/myblog/issues 可以：
- 查看所有评论Issue
- 筛选带有 `💬 博客评论` 标签的Issue
- 回复、编辑或关闭评论
- 设置邮件通知

## 🚀 立即测试

现在你可以：
1. 部署博客：`mkdocs gh-deploy`
2. 访问任意文章页面
3. 滚动到底部查看评论区
4. 尝试发表一条测试评论

评论系统现在应该可以正常工作了！🎉

---

**注意**：如果将来想切换回Giscus，只需要解决Discussions配置问题后，我可以帮你重新配置。