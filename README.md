# 校园数字教学资源中心 · V0.2 前端骨架

> **状态：本地源码已编写，尚未完成在开发者电脑上安装依赖与运行验收；未部署腾讯云或正式上线。**

## 版本目标

首期书法模块。使用 Vue 3 + TypeScript + Vite + Vue Router 建立**电脑端和手机端共用的一套响应式网站**。

- 资源总站：`/`
- 书法年级入口：`/calligraphy`
- 五个年级：`/calligraphy/grade/1` 至 `/calligraphy/grade/5`
- 每年级第 2–14 周：`/calligraphy/grade/1/week/2` 等
- 预留单课直达：`/calligraphy/grade/1/week/2/lesson/3`
- 404 与非法年级/周次兜底

**注意：V0.2 视频区域是占位，不含真实 MP4 播放；不要将它当成已经上线的课程。**

## 本地启动（Windows PowerShell）

首先安装 Node.js（建议 22 LTS，版本需满足 `>=20.19.0`）和 Git。

```powershell
cd school-digital-resource-center
node -v
npm install
npm run dev
```

打开终端显示的地址（通常是 `http://localhost:5173`）。请不要直接双击 `index.html`，Vite 必须通过本地开发服务运行。

## 检查与构建

```powershell
npm run type-check
npm run build
npm run preview
```

开发服务器默认允许局域网访问，在同一 Wi-Fi 下可用电脑局域网 IP + 5173 端口进行手机测试（Windows 防火墙可能需要放行）。手机可通过浏览器访问 `http://<电脑局域网IP>:5173`，**不要将这个临时地址打印在教材二维码上**。

## 样本数据说明

`src/modules/calligraphy/data/catalog.ts` 仅包含项目来源资料中 65 个周次概要、主题（五年级主题暂无资料，保持空）和一年级下册第 2 周的 6 个课程标题示例。**未声称已经导入或校验 741 个 MP4**。V0.4 才批量生成最终课程目录，V0.3 开始接入获授权的视频样本。

## 代码分工

```text
src/
  main.ts
  App.vue
  components/                  共用 Header / Footer / 面包屑
  pages/                       总站、404
  router/index.ts              统一业务路由
  modules/calligraphy/
    types/catalog.ts           类型
    data/catalog.ts            已知周次概要与样本条目
    pages/                     书法、年级、周次界面
  styles/global.css            电脑/手机响应式样式
```

`docs/` 和 `prototype/` 留存 V0.1 需求、二维码规范与低保真原型；`docs/V0.2_执行与Git验收.md` 给出本次检查与上传步骤。

## Git 约定（每阶段验收后执行一次）

V0.2 通过本地验收后：

```powershell
git init -b main             # 仅首次执行；已有仓库则跳过
git add .
git commit -m "feat: complete v0.2 responsive app scaffold"
git tag v0.2
# 若尚未关联远端，先在 GitHub 创建空仓库，再执行：
git remote add origin https://github.com/<你的GitHub用户名>/school-digital-resource-center.git
git push -u origin main
git push origin v0.2
```

如果 V0.1 已在 Git 中提交，**不要重新初始化仓库**。先用 `git remote -v` 检查 origin；已关联远端则跳过 `git remote add`。tag 之前若已有 `v0.2`，不要覆盖，应核对后处理。

如需导出课程视频，请使用另行受控的存储方式，`.gitignore` 已忽略 `.mp4` 及 `.env` 密钥。由于正式仓库地址未提供，**本工作包尚未执行 GitHub push**。

## 部署提醒

使用 Vue Router 的 `createWebHistory`，正式静态托管必须将未知前端路由回退到 `index.html`，否则扫码深链接刷新可能返回 404；V0.5 需要在腾讯云正式测试这一项。

### 可复用的阶段发布脚本

第一次关联好 GitHub 远端后，每个阶段**验收通过**再运行：

```powershell
.\scripts\publish-stage.ps1 -Version v0.2 -Message "feat: complete v0.2 responsive scaffold"
```

脚本会先运行 `type-check` 与 `build`，两者成功后才尝试 commit、tag 与 push。V0.3、V0.4 等阶段只需替换版本号和说明。**没有远端地址或未通过验收时不要执行。**
