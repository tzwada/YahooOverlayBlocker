# YahooOverlayBlocker（YOB）

Yahoo!ニュースの全面広告（オーバーレイ広告）を取り除き、記事を読みやすくするための macOS 向け Safari Web Extension です。このREADMEでは **YOB** と略します。

Safariの機能拡張一覧では「**Yニュース 全面広告ブロッカー**」と表示されます。リポジトリ名・Xcodeプロジェクト名は `YahooOverlayBlocker` です。

## 主な機能

- `https://news.yahoo.co.jp/*` のページで動作します。
- `.yda_interstitial`、`#overlayAd`、`#interstitialAd` に一致する要素を削除します。
- ページのスクロールを妨げる一部のスタイルやクラスを解除します。
- ページ内の要素の追加・削除を監視し、後から挿入される広告にも対応します。
- ツールバーのポップアップで、現在のタブが対象サイトかどうかを表示します。

広告の通信自体を遮断する仕組みではなく、ページ上の特定の要素を削除する方式です。Yahoo!ニュース以外のサイトや、すべての広告形式には対応していません。

## 必要な環境

- macOSとSafari
- このプロジェクトをビルドできるXcodeとmacOS SDK
- 署名して実行する場合は、Xcodeで利用できるAppleの開発用署名設定

現在のプロジェクト設定では、ホストアプリが継承するmacOS Deployment Targetは **26.1**、拡張機能側は **11.0** です。アプリ全体をmacOS 11で利用できることを意味しません。これらは設定値であり、実機で確認済みの対応OS一覧ではありません。

## ソースコードの取得

```sh
mkdir -p ~/Developer
cd ~/Developer
git clone https://github.com/tzwada/YahooOverlayBlocker.git
```

すでに同名フォルダがある場合は、その内容を確認してください。既存のcloneがある場合は、再度cloneする必要はありません。非公開リポジトリへのアクセスには、権限のあるGitHubアカウントの認証が必要です。

## Xcodeからビルドして利用する

1. `YahooOverlayBlocker.xcodeproj` をXcodeで開きます。
2. アプリと拡張機能の各ターゲットで **Signing & Capabilities** を確認し、自分の開発環境に合う **Team** を選択します。
3. アプリのスキーム `YahooOverlayBlocker` と実行先のMacを選び、**Product → Run** でビルドして起動します。
4. アプリ内のボタン、または **Safari → 設定 → 機能拡張** から機能拡張の設定を開きます。
5. 「Yニュース 全面広告ブロッカー」を有効にし、Yahoo!ニュースへのアクセスを許可します。
6. Yahoo!ニュースのページを開き直すか、再読み込みします。

開発中の未署名の拡張機能を試す場合は、Safariで「未署名の機能拡張を許可」の設定が必要になることがあります。設定の場所や条件は、Appleの[Safari Web Extensionの実行手順](https://developer.apple.com/documentation/safariservices/running-your-safari-web-extension)を参照してください。

別のMacへ配布する場合は、署名や配布方法も確認してください。参考：[Safari Web Extensionの配布](https://developer.apple.com/documentation/safariservices/distributing-your-safari-web-extension)。

## 使い方と動作確認

有効にすると、対象ページで自動的に処理が動きます。ポップアップ内にオン・オフの切り替えはありません。停止する場合はSafariの機能拡張設定で無効にします。

1. `https://news.yahoo.co.jp/` 配下のページを開きます。
2. Safariのツールバーから拡張機能のポップアップを開きます。
3. 対象タブでは「保護対象（広告ブロック中）」、それ以外では「対象外（このページでは動作しません）」と表示されるか確認します。
4. 対象の全面広告が表示されるページでは、広告が取り除かれ、スクロールできるかを確認します。

**ポップアップの表示はURLによる判定です。** 広告の検出・削除に成功したことを示す実績表示ではありません。

## 制限とトラブルシューティング

### 広告が消えない

- ページのURLが `https://news.yahoo.co.jp/` で始まることを確認してください。
- Safariで拡張機能が有効か、サイトへのアクセスが許可されているかを確認し、ページを再読み込みしてください。
- サイトの構造が変わると、現在のセレクターでは広告を検出できなくなります。その場合は `content.js` の見直しが必要です。
- 現在のコードは `document_idle` で読み込まれ、`DOMContentLoaded` とページ内の要素の追加・削除をきっかけに処理します。読み込み時点ですでにイベントが終了し、その後に要素の変化がない場合、初回の削除処理が実行されない可能性があります。

### ページの表示やスクロールがおかしい

スクロール解除処理は、広告以外のダイアログが設定したスタイルにも影響する可能性があります。拡張機能を一時的に無効にし、ページを再読み込みして比較してください。

### ポップアップが「判定中...」のままになる

現在のタブのURL取得に失敗した場合のエラー表示は未実装です。サイトへのアクセス許可を確認してください。開発時はSafariの開発者向け機能でポップアップのエラーを確認します。

### ビルドできない・機能拡張が見つからない

Xcodeの対応SDK、Deployment Target、両ターゲットの署名設定を確認してください。まずホストアプリをビルドして起動し、その後Safariの機能拡張設定を確認します。

Bundle Identifierを変更する場合は、拡張機能の設定に加えて `ViewController.swift` の `extensionBundleIdentifier` も一致させてください。

## プロジェクト構成

| パス | 役割 |
| --- | --- |
| `YahooOverlayBlocker.xcodeproj/` | Xcodeプロジェクトとビルド設定 |
| `YahooOverlayBlocker/` | 拡張機能の有効状態を表示し、Safariの設定を開くmacOSアプリ |
| `YahooOverlayBlocker Extension/Resources/manifest.json` | 対象URL、拡張機能名、スクリプトなどの定義 |
| `YahooOverlayBlocker Extension/Resources/content.js` | 広告要素の削除とスクロール解除 |
| `YahooOverlayBlocker Extension/Resources/popup.html`、`popup.js` | 現在のタブの対象判定と表示 |
| `YahooOverlayBlocker Extension/Resources/_locales/` | 日本語・英語の名称と説明 |
| `YahooOverlayBlocker Extension/SafariWebExtensionHandler.swift` | ネイティブメッセージを受け取るハンドラー |

## データの扱い

現在の広告削除・ポップアップのコードには、外部サーバーへのデータ送信や閲覧履歴の保存処理はありません。対象ページのDOMを操作し、ポップアップでは現在のタブのURLを確認します。

ネイティブメッセージ用ハンドラーには、受信メッセージをシステムログへ出力して応答する処理があります。現在のJavaScriptからこのハンドラーを呼び出す処理はありません。

## ライセンス

現時点で、このリポジトリにはライセンスファイルは含まれていません。
