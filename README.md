# 我的个人博客

这是一个基于MkDocs和ReadTheDocs搭建的个人博客项目。

## 特点

- 使用MkDocs构建静态网站
- 使用ReadTheDocs托管文档
- 支持Markdown格式编写内容
- 响应式设计，适配各种设备

## 本地开发

1. 克隆仓库
   ```
   git clone https://github.com/yourusername/myblog.git
   cd myblog
   ```

2. 安装依赖
   ```
   pip install -r requirements.txt
   ```

3. 本地预览
   ```
   mkdocs serve
   ```

4. 构建静态网站
   ```
   mkdocs build
   ```

## 部署

本项目可以部署到ReadTheDocs或GitHub Pages。

### ReadTheDocs部署

1. 在ReadTheDocs上导入GitHub仓库
2. 配置构建设置
3. 触发构建

### GitHub Pages部署

```
mkdocs gh-deploy
```

## 许可证

MIT