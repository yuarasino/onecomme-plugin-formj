# onecomme-plugin-formj

![](https://img.shields.io/github/downloads/yuarasino/onecomme-plugin-formj/total)
![](https://img.shields.io/github/v/release/yuarasino/onecomme-plugin-formj)
![](https://img.shields.io/badge/onecomme-v4.0%2B-orange)
![](https://img.shields.io/github/license/yuarasino/onecomme-plugin-formj)
![](https://img.shields.io/youtube/channel/views/UCxUnuWTQGLw5dO_dl0oqrrg?style=social)

麻雀配信向けわんコメプラグイン

![](./docs/images/formj.png)


## Overview

コメント欄の麻雀牌っぽいものを画像に置き換えて見た目を楽しくします！  
わんコメのほとんどのテンプレートに導入できます


## Requirement

わんコメ v4.0+ [Download](https://onecomme.com/)


## Download

わんコメプラグイン「formj」 [formj-v1.0.0.zip](https://github.com/yuarasino/onecomme-plugin-formj/releases/download/v1.0.0/formj-v1.0.0.zip)  
プラグイン導入済みテンプレート「basic4mj」 
[basic4mj-v1.0.0.zip](https://github.com/yuarasino/onecomme-plugin-formj/releases/download/v1.0.0/basic4mj-v1.0.0.zip)


## Usage: 「basic4mj」テンプレートの導入方法

わんコメを使ったことがない人やbasicテンプレートを使っている人向けの「basic4mj」導入方法です  
わんコメデフォルトの「basic」テンプレートに「formj」プラグインを導入したテンプレートで、フォルダをコピーするだけですぐに使い始めることができます  
他のテンプレート(yurucampなど)を使っている人は、[Advanced](./docs/advanced.md)の項目を見てください

[Usage: 「basic4mj」テンプレートの導入方法](./docs/usage.md)


## Advanced: 他のテンプレートへの「formj」導入方法

他のテンプレート(yurucampなど)を使っている人向けの「formj」導入方法です

[Advanced: ほかのテンプレートへの「formj」導入方法](./docs/advanced.md)

## FAQ

### どの表記に対応していますか

mpsz表記(半角・全角)と東南西北白發中の表記に対応してます  
mpsz(半角)表記例: 1p、123p、12233m123p123s44zツモ1m  
mpsz(全角)表記例: １ｐ、１２３ｐ、１２２３３ｍ１２３ｐ１２３ｓ４４ｚツモ１ｍ  
字牌表記例: 東、白發中  
赤ドラ表記例: 0m、r5m、赤5m、赤５ｍ

### フレンドコードなどに「1p」などが入ってしまって変換されたくない

`フレンドコード: {a1pmj}` のように `{}` で囲むと変換されなくなります

### フォントを変えたら牌がずれてしまう

OBSのカスタムCSSに以下のCSSを追加してください  
数値は使っているフォントに合わせて調整してください

```css
.tile {
  width: 30px;  /* 牌の横幅 */
  height: 42px;  /* 牌の縦幅 */
  vertical-align: -12px;  /* 牌の上下の位置 */
}
```

### 【対応検討中】採譜記号表記(一二三①②③１２３)の表記には対応していますか

今のところ対応していません  
要望が多ければ対応したいと思っています  
ただ、麻雀役の名前や配信者の名前などに漢数字があることが多く、それが全部変換されちゃうと見づらいので、どうしようかなと思ってます

### 【対応困難】「東京」「南入」などが変換されてしまう

仕様です  
真面目に対応しようとすると麻雀専用に辞書を作って形態素解析したりしないといけないので難しいです……  
(例えば前後に他の漢字が続かないっていうルールだと東切りとか変換されなかったり)  
ギリギリ読めるからいいやって感じで使ってもらえるとありがたいです


## Contribution

ぜひ不具合報告や改善要望をしてもらえると嬉しいです！  
GitHubのIssueかTwitterのDMまでお願いします


## Author

新篠ゆう [Twitter](https://twitter.com/yuarasino)


## License

GPL [License](./LICENSE)
