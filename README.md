# Shota Arakawa | Portfolio

フルスタックエンジニア 荒川奨太のポートフォリオサイト。  
Nuxt 3 + Tailwind CSS で構築し、GitHub Pages で公開しています。

🔗 **https://shotaarakawa.github.io**

---

## 技術スタック

| 項目                   | 内容                        |
| ---------------------- | --------------------------- |
| フレームワーク         | [Nuxt 3](https://nuxt.com/) |
| 言語                   | TypeScript                  |
| スタイリング           | Tailwind CSS + CSS変数      |
| ホスティング           | GitHub Pages                |
| パッケージマネージャー | pnpm                        |

---

## フォルダ構成

```
it-portfolio/
├── pages/
│   ├── index.vue              # トップページ（About + Projects）
│   └── projects/[slug].vue    # プロジェクト詳細ページ
├── components/
│   ├── AppNav.vue
│   ├── HeroSection.vue
│   ├── ProjectCard.vue
│   ├── ProjectGrid.vue
│   └── AppFooter.vue
├── data/
│   └── projects.json          # ★ プロジェクトデータ（ここを編集）
├── public/
│   ├── favicon.svg
│   └── profile.jpg
├── types/
│   └── index.ts               # Project 型定義
└── nuxt.config.ts
```

---

## ローカル開発

```bash
# 依存パッケージのインストール
pnpm install

# 開発サーバー起動（http://localhost:3000）
pnpm run dev
```

---

## デプロイ

```bash
pnpm run deploy
```

内部では以下を自動実行します。

1. `nuxt generate` → `.output/public/` に静的ファイルを生成
2. `gh-pages` コマンドで `gh-pages` ブランチへ push
3. GitHub Pages が自動で公開（数分後に反映）

> **ブランチの役割**  
> `main` → ソースコード  
> `gh-pages` → ビルド済み公開ファイル（直接編集しない）

---

## プロジェクトの追加方法

`data/projects.json` にオブジェクトを追加するだけでカードが自動生成されます。

```json
{
  "slug": "new-project",
  "title": "プロジェクト名",
  "color": "amber",
  "icon": "ti ti-device-laptop",
  "thumbLabel": "NEW PROJECT",
  "description": "アプリの説明文",
  "tags": ["TypeScript", "Vue"],
  "siteUrl": "https://...",
  "githubUrl": "https://github.com/...",
  "wip": false
}
```

**`color` の選択肢**

| 値      | アクセントカラー      |
| ------- | --------------------- |
| `cyan`  | シアン（`#22d3ee`）   |
| `green` | グリーン（`#4ade80`） |
| `amber` | アンバー（`#f59e0b`） |

**`wip: true` にすると** サイトURL・GitHubリンクが非表示になり、`coming soon` バッジが表示されます。

追加後はデプロイを実行してください。

```bash
pnpm run deploy
```
