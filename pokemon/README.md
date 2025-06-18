# Pokemon 宝可梦图鉴项目

一个基于React + Django的宝可梦图鉴应用，展示宝可梦信息并提供搜索和详情查看功能。

## 功能特性

### 前端功能 (React + TypeScript)
- 🎯 **宝可梦列表展示** - 网格布局展示所有宝可梦
- 🔍 **搜索功能** - 支持按名称、英文名或编号搜索
- 📱 **响应式设计** - 适配不同屏幕尺寸
- 🎨 **现代化UI** - 使用Ant Design组件库
- 💫 **交互效果** - 悬停动画和点击反馈
- 📋 **详情弹窗** - 点击卡片查看宝可梦详细信息
- 🏷️ **属性标签** - 彩色标签显示宝可梦类型

### 后端功能 (Django)
- 🗄️ **数据管理** - 宝可梦数据存储和管理
- 🔌 **RESTful API** - 提供数据接口
- 📊 **数据导入** - 支持批量导入宝可梦数据

## 技术栈

### 前端
- React 19.1.0
- TypeScript 4.9.5
- Ant Design 5.26.0
- Styled Components 6.1.19
- Axios 1.10.0

### 后端
- Django 4.x
- Django REST Framework
- SQLite/PostgreSQL

## 快速开始

### 前端启动
```bash
cd pokemon-frontend
npm install
npm start
```

### 后端启动
```bash
cd pokemon_backend
pip install -r requirements.txt
python manage.py runserver
```

## 项目结构

```
pokemon/
├── pokemon-frontend/          # React前端应用
│   ├── src/
│   │   ├── components/        # React组件
│   │   │   ├── PokemonList.tsx
│   │   │   └── PokemonCard.tsx
│   │   ├── App.tsx           # 主应用组件
│   │   └── index.tsx         # 应用入口
│   └── package.json
├── pokemon_backend/           # Django后端应用
│   ├── pokemon/              # 宝可梦应用
│   │   ├── models.py         # 数据模型
│   │   ├── views.py          # API视图
│   │   └── serializers.py    # 序列化器
│   └── manage.py
└── README.md
```

## 最新更新

### v1.1.0 - 搜索和详情功能
- ✅ 添加宝可梦搜索功能
- ✅ 实现详情弹窗展示
- ✅ 优化用户交互体验
- ✅ 改进响应式布局

## 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 许可证

MIT License 