# BGsystem3-timer

BGsystem3 桌面工具库下的考试倒计时工具。

## 技术栈

- [Tauri](https://tauri.app/)：桌面应用开发工具
- [Rust](https://www.rust-lang.org/)：后端语言
- [Vite](https://vitejs.dev/)：构建工具
- [Vue 3](https://vuejs.org/)：前端框架
- [TypeScript](https://www.typescriptlang.org/)：静态类型检查
- [ESLint](https://eslint.org/)：代码风格检查

## 开发

### 安装依赖

请确保环境配置完好：[Tauri-预先准备](https://tauri.app/zh-cn/v1/guides/getting-started/prerequisites)。

```sh
pnpm install
```

### 启动开发服务器

```sh
pnpm tauri dev
```

### 为生产环境打包

```sh
pnpm tauri build
```

### Lint

```sh
pnpm lint
```