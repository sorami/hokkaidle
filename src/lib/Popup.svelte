<div id="title">
  <span class="green">HOKKAID</span>LE
</div>

<div id="container">
  <section>
    <p>
      北海道の市町村を地図で当てるゲームです。Inspired by <a
        href="https://sorami.dev"
        target="_blank">Wordle</a
      >.
    </p>
    <p>
      他にも、<a href="https://oec.world/en/tradle/" target="_blank">Tradle</a
      >、
      <a href="https://worldle.teuteuf.fr/" target="_blank">Worldle</a>、
      <a href="https://countryle.com/" target="_blank">Countryle</a>、
      <a href="https://www.flagle.io/" target="_blank">Flagle</a>、
      <a href="https://shikuchoson.jp/" target="_blank">ShiKuChoSon</a
      >にインスパイアされました。
    </p>
  </section>

  <section>
    <div class="heading">遊び方</div>
    <p>
      北海道の市町村がランダムに選択され、ページ上部に提示されます。左側にある「目」のアイコンで、表示するかぼかすかを切り替えできます。
    </p>
    <p>
      地図をクリックして、市町村を当ててください。外れた場合には<span
        class="gray">灰色</span
      >、外れたけど同じ地域（振興局）には<span class="yellow">黄色</span
      >、正解した場合には
      <span class="green">緑色</span>になります。
    </p>
    <p>
      クリックした結果は、ページ下部のマス目に表示されます。本家Wordleと同じように、その文字が正解市町村に含まれない場合は<span
        class="gray">灰色</span
      >、含まれるが位置が違う場合は<span class="yellow">黄色</span
      >、含まれていてかつ位置が同じ場合には<span class="green">緑色</span
      >になります。またマス目の左側には、正解市町村への大まかな距離と方角が矢印で表されます。マス目の右側にある「?」のアイコンをホバー/タッチすると、Wikipediaの概要文とリンクが表示されます。
    </p>
  </section>

  <section>
    <div class="heading">データ</div>
    <p>
      地形データには、<a href="https://nlftp.mlit.go.jp/ksj/" target="_blank"
        >国土数値情報</a
      >（国土交通省）をTopoJSONに整理した<a
        href="https://github.com/smartnews-smri/japan-topography"
        target="_blank">smartnews-smri/japan-topography</a
      >（スマートニュース
      メディア研究所）を基に、札幌市の区部をマージしたものを利用しています。マージ処理の詳細は、次のノートブックで確認できます:
      <a
        href="https://observablehq.com/@sorami/hokkaido-topojson-merge-sapporo"
        target="_blank"
        >北海道のTopoJSON: 札幌市の区をマージ / Sorami Hisamoto / Observable</a
      >
    </p>
    <p>
      市町村の位置情報には、国土数値情報の市区町村役場データを基にしました。役場の存在しない北方地域6村については、Geoshapeリポジトリ（国立情報学研究所
      北本研究室）の<a
        href="https://geoshape.ex.nii.ac.jp/city/"
        target="_blank">歴史的行政区域データセットβ版</a
      >で指定されている代表点を採用しました。
    </p>
    <p>
      市町村の概要テキストには、<a href="https://ja.wikipedia.org/"
        >Wikipedia日本語版</a
      >の情報をリンクト・オープン・データとして公開している<a
        href="https://ja.dbpedia.org/"
        target="_blank">DBpedia Japanese</a
      >から取得したものを利用しました。
    </p>
    <p>
      データ準備処理の詳細は、次のノートブックで確認できます: <a
        href="https://github.com/sorami/hokkaidle/blob/main/preprocess/preprocess.ipynb"
        target="_blank">hokkaidle/preprocess.ipynb at main · sorami/hokkaidle</a
      >
    </p>
  </section>

  <section>
    <div class="heading">ライブラリ</div>
    <p>
      <a href="https://d3js.org/" target="_blank">D3.js</a>,
      <a href="https://turfjs.org/" target="_blank">Turf.js</a>
      ,
      <a href="https://svelte.dev/" target="_blank">Svelte</a>,
      <a href="https://vitejs.dev/" target="_blank">Vite</a>,
      <a href="https://github.com/topojson/topojson-client" target="_blank"
        >topojson/topojson-client</a
      >,
      <a href="https://github.com/flekschas/svelte-simple-modal" target="_blank"
        >flekschas/svelte-simple-modal</a
      >,
      <a href="https://party.js.org/" target="_blank">party.js</a>,
      <a href="https://sass-lang.com/" target="_blank">Sass</a>,
      <a href="https://github.com/filipelinhares/ress" target="_blank"
        >filipelinhares/ress</a
      >,
      <a href="https://fonts.google.com/icons" target="_blank">Material Icons</a
      >
    </p>
    <p>
      コードはGitHubで公開しています: <a
        href="https://github.com/sorami/hokkaidle"
        target="_blank">sorami/hokkaidle</a
      >
    </p>
  </section>
</div>

<footer>
  <a href="https://sorami.dev/" target="_blank">sorami.dev</a>
</footer>

<style lang="scss">
  * {
    color: $tone-2;
  }

  a {
    text-decoration: underline solid 1.25px;
    &:hover {
      color: $green;
    }
  }

  #title {
    font-size: 1.4em;
    font-family: "Bevan", serif;
    text-align: center;
    color: $tone-1;
    .green {
      color: $green;
      &:hover {
        color: $yellow;
      }
    }
  }

  #container {
    display: flex;
    flex-direction: column;
    row-gap: 2em;
    margin: 2em 1.5em;

    section {
      display: flex;
      flex-direction: column;
      row-gap: 0.75em;
    }

    .heading {
      font-weight: 700;
      margin-bottom: 0em;
    }

    p {
      line-height: 1.4em;
      font-size: 0.9em;
      word-break: break-all;

      span {
        color: $tone-7;
        padding: 0em 0.25em;
        margin: 0em 0.1em;

        &.gray {
          background-color: $tone-3;
        }
        &.yellow {
          background-color: $yellow;
        }
        &.green {
          background-color: $green;
        }
      }
    }
  }

  footer {
    padding: 0;
    text-align: center;
    font-family: Bevan, serif;
    font-size: 0.85em;
    a {
      color: $tone-2;
      text-decoration: none;
      opacity: 0.5;
      &:hover {
        color: $green;
        opacity: 1;
      }
    }
  }
</style>
