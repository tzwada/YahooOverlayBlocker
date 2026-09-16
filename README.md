# YahooOverlayBlocker（YOB）

Yahoo!ニュース、文春オンライン、FITNESS LOVEの対応する全面広告（オーバーレイ広告）を取り除き、記事を読みやすくするための macOS 向け Safari Web Extension です。このREADMEでは **YOB** と略します。

Safariの機能拡張一覧では「**Yニュース 全面広告ブロッカー**」と表示されます。リポジトリ名・Xcodeプロジェクト名は `YahooOverlayBlocker` です。

## 更新履歴

### FITNESS LOVE対応追加（2026-09-16、バージョン1.1）

- FITNESS LOVE（`fitnesslove.net` / `www.fitnesslove.net`）の全面広告枠 `#im_interstitial_b` を非表示にする機能を追加しました。
- 写真ページの「FITNESS LOVE」という案内を非表示・削除し、再挿入も監視します。
- 案内を消した後に残る写真とサムネイル一覧のぼかしを解除します。実ページで確認した対象要素に限定して適用します。
- ポップアップにFITNESS LOVEの実行状態と案内削除件数の診断表示を追加しました。
- サイトへのアクセス許可後、利用者のSafari環境で案内の非表示とぼかし解除を確認済みです。
- 拡張機能ターゲットのmacOS Deployment Targetを14.6に更新しました。

### 1.1（2026-09-15）

- **文春オンライン（`https://bunshun.jp/*`）に対応しました。** 全面広告と暗い背景を専用CSSで非表示にします。
- 「次のページを読む」（CM視聴・質問回答）の案内を削除し、後から表示・再挿入される場合にも対応しました。
- 案内を削除した後、読み進める途中でスクロールが止まる症状に対し、広告除去直後のスクロール復旧処理を追加しました。
- ポップアップの対象判定に文春オンラインを追加し、見出しを「YOB 全面広告ブロッカー」、対象表示を「対応サイト（広告非表示の対象）」に変更しました。
- 利用者のSafari環境で全面広告と案内の非表示を確認し、スクロール修正後も改善したとの報告を受けています。すべての広告形式・環境での動作を保証するものではありません。

## 主な機能

- `https://news.yahoo.co.jp/*`、`https://bunshun.jp/*`、`https://fitnesslove.net/*`、`https://www.fitnesslove.net/*` のページで動作します。
- Yahoo!ニュースでは `.yda_interstitial`、`#overlayAd`、`#interstitialAd` に一致する要素を削除します。
- Yahoo!ニュースではページのスクロールを妨げる一部のスタイルやクラスを解除します。
- Yahoo!ニュースではページ内の要素の追加・削除を監視し、後から挿入される広告にも対応します。
- 文春オンラインでは全面広告枠と暗い背景を非表示にし、CM視聴・質問回答の案内を削除します。後から挿入される対象広告や案内にも対応します。
- 文春オンラインでは案内の削除直後に残る縦スクロール制限を復旧します。
- FITNESS LOVEでは確認済みの全面広告枠と写真ページの案内を非表示にし、案内に伴う写真・サムネイルのぼかしも解除します。
- ツールバーのポップアップで、現在のタブが対象サイトかどうかを表示します。

広告の通信自体を遮断する仕組みではなく、ページ上の特定の要素を削除・非表示にする方式です。上記の対応サイト以外や、すべての広告形式には対応していません。

## 必要な環境

- macOSとSafari
- このプロジェクトをビルドできるXcodeとmacOS SDK
- 署名して実行する場合は、Xcodeで利用できるAppleの開発用署名設定

現在のプロジェクト設定では、ホストアプリが継承するmacOS Deployment Targetは **26.1**、拡張機能側は **14.6** です。アプリ全体をmacOS 14.6で利用できることを意味しません。これらは設定値であり、実機で確認済みの対応OS一覧ではありません。

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
5. 「Yニュース 全面広告ブロッカー」を有効にし、利用する対応サイトへのアクセスを許可します。
6. 対象サイトのページを開き直すか、再読み込みします。

開発中の未署名の拡張機能を試す場合は、Safariで「未署名の機能拡張を許可」の設定が必要になることがあります。設定の場所や条件は、Appleの[Safari Web Extensionの実行手順](https://developer.apple.com/documentation/safariservices/running-your-safari-web-extension)を参照してください。

別のMacへ配布する場合は、署名や配布方法も確認してください。参考：[Safari Web Extensionの配布](https://developer.apple.com/documentation/safariservices/distributing-your-safari-web-extension)。

## 使い方と動作確認

有効にすると、対象ページで自動的に処理が動きます。ポップアップ内にオン・オフの切り替えはありません。停止する場合はSafariの機能拡張設定で無効にします。

1. 上記の対応サイトのページを開きます。
2. Safariのツールバーから拡張機能のポップアップを開きます。
3. 対象タブでは「対応サイト（広告非表示の対象）」、それ以外では「対象外（このページでは動作しません）」と表示されるか確認します。
4. 対象の全面広告が表示されるページでは、広告が取り除かれ、スクロールできるかを確認します。

**「対応サイト」の表示はURLによる判定です。** FITNESS LOVEでは、スクリプトから応答を取得できると「処理実行中」と案内の削除件数を表示します。件数は現在のページでJavaScriptが削除した案内・対象のGoogle全面広告枠の数で、CSSによる非表示は含みません。「実行状態を取得できません」と表示されても、CSSが適用されていないとは限りません。

## 制限とトラブルシューティング

### 広告が消えない

- ページのURLが「主な機能」に記載した対象URLに一致することを確認してください。
- Safariで拡張機能が有効か、サイトへのアクセスが許可されているかを確認し、ページを再読み込みしてください。
- サイトの構造が変わると、現在のセレクターでは広告を検出できなくなります。その場合はYahoo!ニュース用の `content.js`、文春オンライン用の `bunshun.css`・`bunshun.js`、FITNESS LOVE用の `fitnesslove.css`・`fitnesslove.js` の見直しが必要です。
- Yahoo!ニュース用のコードは `document_idle` で読み込まれ、`DOMContentLoaded` とページ内の要素の追加・削除をきっかけに処理します。読み込み時点ですでにイベントが終了し、その後に要素の変化がない場合、初回の削除処理が実行されない可能性があります。

### ページの表示やスクロールがおかしい

Yahoo!ニュースのスクロール解除処理は、広告以外のダイアログが設定したスタイルにも影響する可能性があります。拡張機能を一時的に無効にし、ページを再読み込みして比較してください。

文春オンラインでは、CM視聴・質問回答の案内を削除した後のスクロール停止への対策を含んでいます。症状が再発する場合は、最新版を再ビルドしてページを再読み込みしてください。それでも止まる場合は、発生したURLと操作、Webインスペクタでの `html` / `body` のスタイルを確認すると原因の切り分けに役立ちます。

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
| `YahooOverlayBlocker Extension/Resources/content.js` | Yahoo!ニュースの広告要素の削除とスクロール解除 |
| `YahooOverlayBlocker Extension/Resources/bunshun.css` | 文春オンラインの全面広告枠の非表示 |
| `YahooOverlayBlocker Extension/Resources/bunshun.js` | CM視聴・質問回答の案内の削除、再挿入の監視、スクロール復旧 |
| `YahooOverlayBlocker Extension/Resources/fitnesslove.css` | FITNESS LOVEの全面広告枠の非表示と写真のぼかし解除 |
| `YahooOverlayBlocker Extension/Resources/fitnesslove.js` | FITNESS LOVEの案内の削除と再挿入の監視 |
| `YahooOverlayBlocker Extension/Resources/popup.html`、`popup.js` | 現在のタブの対象判定と表示 |
| `YahooOverlayBlocker Extension/Resources/_locales/` | 日本語・英語の名称と説明 |
| `YahooOverlayBlocker Extension/SafariWebExtensionHandler.swift` | ネイティブメッセージを受け取るハンドラー |

## データの扱い

現在の広告削除・ポップアップのコードには、外部サーバーへのデータ送信や閲覧履歴の保存処理はありません。対象ページのDOMを操作し、ポップアップでは現在のタブのURLを確認します。

ネイティブメッセージ用ハンドラーには、受信メッセージをシステムログへ出力して応答する処理があります。現在のJavaScriptからこのハンドラーを呼び出す処理はありません。

## 文春オンライン対応

- `https://bunshun.jp/*` に `bunshun.css` と `bunshun.js` を読み込みます。
- 全面広告の枠 `div[data-ca-profitx-tagid="46411"][data-ca-profitx-spotid="pfxad_46411"]` を非表示にします。2026-09-15 に提供されたSafari Webインスペクタ画像では、この枠のiframe内に、暗い背景を含む `#pfx_interstitial_wrap` が確認されています。
- `.fc-message-root` 直下の `.fc-monetization-dialog-container` も非表示にします。CSSのみでは表示が残るケースに対応するため、JavaScriptでも案内と前後のフォーカス用要素を削除し、再挿入やクラス・スタイルの変更を監視します。共有される `.fc-message-root` 自体は削除しません。閲覧権限や広告視聴済み状態は変更しないため、案内を隠しても次ページを開けるとは限りません。
- ページ読み込み開始時にCSSを適用するため、後から挿入される同じ枠も非表示になります。記事や通常広告は対象にしません。CM視聴・質問回答の案内を削除した直後の2秒間は、`html` / `body` の縦スクロールが `hidden` / `clip` で禁止されていれば復旧します。通常のダイアログを検出した場合は補正を戻します。
- Xcodeで再ビルド後、Safariの機能拡張設定で文春オンラインへのアクセスを許可し、記事を再読み込みしてください。
- ポップアップの対応表示はURLによる判定で、広告削除の成功やサイトアクセス許可を確認するものではありません。
- 広告枠IDの変更や別の配信形式には追加対応が必要です。実際のSafariで、全面広告と暗い背景が消え、記事のスクロール・リンク・通常のダイアログが動作することを確認してください。
- 利用者のSafari環境で、広告枠 `46411` の全面広告とCM視聴・質問回答の案内の非表示を確認済みです。スクロール修正後も改善したとの報告を受けています。すべての広告形式やSafariバージョンでの動作を確認したものではありません。

## FITNESS LOVE対応

- Google全面広告の追加形式として、`gpt_unit_/9176203,22484934497/1759871_0` というIDと `data-vignette-loaded="true"` を持つ `ins` 要素を非表示・削除します。iframe内部ではなく外枠を対象にし、遅れて属性が設定される場合や再挿入も監視します。この追加形式も2026-09-16に利用者のSafari環境で動作確認済みです。

- `https://fitnesslove.net/*` と `https://www.fitnesslove.net/*` に `fitnesslove.css` と `fitnesslove.js` を読み込みます。
- 提供されたSafari Webインスペクタ画像で確認できた `#im_interstitial_b` を非表示にします。通常のバナー広告やページのスクロール設定は変更しません。
- 「FITNESS LOVE」と表示される案内は `.reward-block.js-reward-modal` を対象に、内部の白い枠と覆いをまとめて非表示にし、JavaScriptでも親要素ごと削除します。後からの再挿入やクラスの変更も監視します。本文を含む `#content-w` は対象にしません。非表示にするだけで、閲覧権限や広告視聴済み状態を変更する処理はありません。
- 再ビルド後、Safariでサイトへのアクセスを許可し、ページを再読み込みしてください。広告と背景の非表示、読み進めた際のスクロールを確認してください。
- 写真ページでは、サイトが写真枠 `.mainbox > #nocopy ul[class="image_frame"]` とサムネイル一覧 `#gallery-1` に付けるぼかしを解除します。`body.attachment` 配下の対象に限定しています。
- Safariでこのサイトへのアクセスが許可されていないと処理は適用されません。許可後にページを再読み込みしてください。
- 2026-09-16、利用者のSafari環境で、アクセス許可後の案内の非表示と写真のぼかし解除を確認済みです。すべての広告形式や環境での動作を保証するものではありません。
- CSSでの非表示は広告通信・再生そのものを停止する処理ではありません。音声停止の確認は未実施です。

## ライセンス

現時点で、このリポジトリにはライセンスファイルは含まれていません。
