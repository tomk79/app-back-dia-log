# app-back-dia-log

## for developer

### Initial Setup for develop

```
$ npm install -g gulp
$ git clone https://github.com/tomk79/app-back-dia-log.git
$ cd app-back-dia-log
$ git submodule update --init --recursive --force
$ npm install
```

### update submodules changes

```
$ npm run submodules-update
```

### Boot for develop

```
$ npm start
```

`npm start` でエラーが起きる場合は以下を試してください。

```
$ npm install nw
$ npm start
```


### Task Runner

```
$ gulp watch
```


### Build application

```
$ npm run build
```

`./build/dist/` にZIPファイルが出力されます。


### Build application cleanly

```
$ sh build/build_clean.sh [-i ${AppleIdentity}] {$branch_or_version}
```

ユーザーのホームディレクトリに、クリーンビルドされたZIPファイルが出力されます。

mac で実行してください。Windows では実行できません。
また、 node@6.9.1, npm@3.10.8 で動作することが確認されています。
node@10.15.0 の環境では、エラーが発生して失敗します(原因は不明)。


### node and npm version

- node@10.15.0
- npm@6.4.1

Mac で Windows 版をビルドするにあたり、次の環境が必要です。

- wine@2.0


## ライセンス - License

MIT License


## 作者 - Author

- Tomoya Koyanagi <tomk79@gmail.com>
- website: <https://www.pxt.jp/>
- Twitter: @tomk79 <https://twitter.com/tomk79/>
