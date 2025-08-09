# 我的个人博客

这是一个基于MkDocs和ReadTheDocs搭建的个人博客项目。本文档详细介绍了博客的搭建过程、配置方法以及Git相关设置。

## 博客特点

- 使用MkDocs构建静态网站
- 支持ReadTheDocs和GitHub Pages双平台托管
- 支持Markdown格式编写内容
- 响应式设计，适配各种设备
- 支持代码高亮和数学公式
- 支持评论系统集成
- 支持搜索功能
- 支持自定义主题

## 博客搭建详细步骤

### 1. 环境准备

首先需要安装Python和pip，然后安装MkDocs及相关插件：

```bash
# 安装MkDocs
pip install mkdocs

# 安装Material主题（推荐）
pip install mkdocs-material

# 安装常用插件
pip install mkdocs-minify-plugin  # 压缩HTML
pip install mkdocs-git-revision-date-localized-plugin  # 显示最后更新日期
pip install mkdocs-awesome-pages-plugin  # 自定义导航
pip install mkdocs-redirects  # URL重定向
```

### 2. 项目结构与配置

MkDocs项目由文档目录（docs/）和配置文件（mkdocs.yml）组成。文档目录存放Markdown文件，配置文件定义站点设置、主题、插件等。

在配置文件中，你可以设置站点名称、主题、导航结构、Markdown扩展和插件等。Material主题提供了丰富的自定义选项，包括颜色、字体、布局等。

## 本地开发

1. 克隆仓库
   ```bash
   git clone https://github.com/yourusername/myblog.git
   cd myblog
   ```

2. 安装依赖
   ```bash
   pip install -r requirements.txt
   ```

3. 本地预览
   ```bash
   mkdocs serve
   ```
   此命令会启动一个本地服务器，通常在 http://127.0.0.1:8000 访问。它支持热重载，当你修改文件时会自动刷新。

4. 构建静态网站
   ```bash
   mkdocs build
   ```
   此命令会在 `site` 目录下生成静态网站文件。

## Git配置与功能开启

### 1. Git基础配置

首先确保你的Git仓库已正确设置：

```bash
# 初始化Git仓库（如果尚未初始化）
git init

# 设置用户信息
git config user.name "你的名字"
git config user.email "你的邮箱"

# 添加远程仓库
git remote add origin https://github.com/yourusername/myblog.git
```

### 2. Git分支策略

推荐使用以下分支策略：

- `master`：主分支，用于发布
- `develop`：开发分支，用于日常开发
- `feature/*`：功能分支，用于开发新功能
- `hotfix/*`：热修复分支，用于紧急修复

### 3. GitHub Pages配置

要启用GitHub Pages，需要进行以下设置：

1. 在GitHub仓库页面，点击"Settings"
2. 滚动到"GitHub Pages"部分
3. 在"Source"下拉菜单中选择：
   - 使用`gh-deploy`部署：选择`gh-pages`分支
   - 使用`docs`目录部署：选择`master`分支和`/docs`目录
4. 点击"Save"

也可以使用MkDocs的自动部署命令：

```bash
mkdocs gh-deploy
```

此命令会自动构建网站并推送到`gh-pages`分支。

### 4. 启用GitHub Actions自动部署

创建`.github/workflows/deploy.yml`文件：

```yaml
name: Deploy MkDocs

on:
  push:
    branches:
      - master

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0
      - uses: actions/setup-python@v4
        with:
          python-version: 3.x
      - run: pip install -r requirements.txt
      - run: mkdocs gh-deploy --force
```

### 5. 启用评论系统

可以集成Disqus、Utterances或Giscus评论系统：

#### Utterances配置（基于GitHub Issues）

1. 在GitHub上安装[Utterances App](https://github.com/apps/utterances)
2. 在`mkdocs.yml`中添加相关配置
3. 创建评论加载脚本

### 6. 启用Google Analytics

在`mkdocs.yml`中添加Google Analytics配置，设置你的跟踪ID。

### 7. 启用站点地图

安装mkdocs-sitemap插件并在配置文件中添加相应设置。

### 8. Git LFS配置（用于大文件存储）

如果博客中有大量图片或其他大文件，建议使用Git LFS：

```bash
# 安装Git LFS
git lfs install

# 跟踪特定文件类型
git lfs track "*.jpg" "*.png" "*.pdf"

# 确保.gitattributes被提交
git add .gitattributes
git commit -m "配置Git LFS跟踪文件类型"
```

## 部署选项

### 1. ReadTheDocs部署

1. 在[ReadTheDocs](https://readthedocs.org/)上注册账号
2. 导入你的GitHub仓库
3. 在项目设置中配置文档类型和配置文件
4. 触发构建

需要在仓库根目录创建`.readthedocs.yml`文件进行相关配置。

### 2. GitHub Pages部署

使用MkDocs内置命令：

```bash
mkdocs gh-deploy
```

或设置GitHub Actions自动部署（如上文所述）。

### 3. Netlify部署

1. 在[Netlify](https://www.netlify.com/)上注册账号
2. 导入你的GitHub仓库
3. 配置构建命令和发布目录

## 常见问题与解决方案

1. **图片路径问题**：使用相对路径引用图片，例如`![图片](../assets/images/pic.jpg)`

2. **中文搜索问题**：在配置文件中使用日语分词器可以更好地处理中文

3. **自定义域名**：在GitHub Pages设置中添加自定义域名，并创建`docs/CNAME`文件

4. **版本控制**：使用`mike`插件管理多个文档版本

## 许可证

MIT