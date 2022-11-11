(() => {
  /** 変換してほしくない単語のリスト
   * 配信者さん自身の名前とかを想定してます
   * 一応正規表現も使えます
  */
  const denylist = [
    // "葛飾北斎",
    // "[東南西北]家"
  ]

  /** 変換してほしくない単語をプレースホルダに置き換える */
  const _escapeDnyExp = (text, table) => {
    denylist.forEach((dny, idx) => {
      const exp = new RegExp(dny, 'g')
      const hld = `{dny_${idx}}`
      const escs = text.match(exp) || []
      text = text.replace(exp, hld)
      table[hld] = escs
    })
    return [text, table]
  }
  /** 波かっこ付き文字列をプレースホルダに置き換える */
  const _escapeBrcExp = (text, table) => {
    const exp = /(?:\{[^\}]+?\})|(?:｛[^｝]+?｝)/g
    const hld = '{brc}'
    const escs = (text.match(exp) || []).map((esc) => esc.slice(1, -1))
    text = text.replace(exp, hld)
    table[hld] = escs
    return [text, table]
  }
  /** imgをプレースホルダに置き換える */
  const _escapeImgExp = (text, table) => {
    const exp = /<img (".*?"|'.*?'|[^'"])+?>/g
    const hld = '{img}'
    const escs = text.match(exp) || []
    text = text.replace(exp, hld)
    table[hld] = escs
    return [text, table]
  }
  /** urlをプレースホルダに置き換える */
  const _escapeUrlExp = (text, table) => {
    const exp = /https?:\/\/[\w:%#&~=\/\$\?\(\)\.\+\-]+/g
    const hld = '{url}'
    const escs = text.match(exp) || []
    text = text.replace(exp, hld)
    table[hld] = escs
    return [text, table]
  }
  /** プレースホルダを文字列に戻す */
  const _revertEscExp = (text, table) => {
    Object.entries(table).forEach(([hld, escs]) => {
      escs.forEach((esc) => {
        text = text.replace(hld, esc)
      })
    })
    return text
  }

  /** mpsz表記(半角)をsvgに置き換える */
  const _replaceEnMpszExp = (text, symbol, kind) => {
    const exp = new RegExp(`(?:[0-9\-]|r5|赤5)*(?:[0-9]|r5|赤5)${symbol}(?![a-qs-z])`, 'g')
    text = text.replace(exp, (match) => {
      match = match.replace(new RegExp(symbol), '')
      match = match.replace(/0|r5|赤5/g, '0')
      match = match.replace(/[0-9]/g, (tile) => {
        return _id2svg(`${kind}${tile}`)
      })
      return match
    })
    return text
  }
  /** mpsz表記(半角)の字牌をsvgに置き換える */
  const _replaceEnMpszZihaiExp = (text) => {
    const exp = /[1-7\-]*[1-7]z(?![a-qs-z])/g
    text = text.replace(exp, (match) => {
      match = match.replace(/z/g, '')
      match = match.replace(/[0-9]/g, (tile) => {
        return _id2svg(`z${tile}`)
      })
      return match
    })
    return text
  }

  /** mpsz表記(全角)をsvgに置き換える */
  const _replaceEmMpszExp = (text, symbol, kind) => {
    const exp = new RegExp(`(?:[０-９－ー\-]|ｒ５|赤５)*(?:[０-９]|ｒ５|赤５)${symbol}(?![ａ-ｑｓ-ｚ])`, 'g')
    text = text.replace(exp, (match) => {
      match = match.replace(new RegExp(symbol), '')
      match = match.replace(/０|ｒ５|赤５/g, '０')
      match = match.replace(/[０-９]/g, (tile) => {
        return _id2svg(`${kind}${'０１２３４５６７８９'.indexOf(tile)}`)
      })
      return match
    })
    return text
  }
  /** mpsz表記(全角)の字牌をsvgに置き換える */
  const _replaceEmMpszZihaiExp = (text) => {
    const exp = /[１-７－ー\-]*[１-７]ｚ(?![ａ-ｑｓ-ｚ])/g
    text = text.replace(exp, (match) => {
      match = match.replace(/ｚ/g, '')
      match = match.replace(/[０-９]/g, (tile) => {
        return _id2svg(`z${'０１２３４５６７８９'.indexOf(tile)}`)
      })
      return match
    })
    return text
  }

  /** 漢字表記(半角)をsvgに置き換える */
  const _replaceEnHanExp = (text, symbol, kind) => {
    const exp = new RegExp(`(?:[0-9\-]|r5|赤5)*(?:[0-9]|r5|赤5)${symbol}`, 'g')
    text = text.replace(exp, (match) => {
      match = match.replace(new RegExp(symbol), '')
      match = match.replace(/0|r5|赤5/g, '0')
      match = match.replace(/[0-9]/g, (tile) => {
        return _id2svg(`${kind}${'0123456789'.indexOf(tile)}`)
      })
      return match
    })
    return text
  }

  /** 漢字表記(全角)をsvgに置き換える */
  const _replaceEmHanExp = (text, symbol, kind) => {
    const exp = new RegExp(`(?:[０-９－ー\-]|ｒ５|赤５)*(?:[０-９]|ｒ５|赤５)${symbol}`, 'g')
    text = text.replace(exp, (match) => {
      match = match.replace(new RegExp(symbol), '')
      match = match.replace(/０|ｒ５|赤５/g, '０')
      match = match.replace(/[０-９]/g, (tile) => {
        return _id2svg(`${kind}${'０１２３４５６７８９'.indexOf(tile)}`)
      })
      return match
    })
    return text
  }

  /** 漢字表記(漢数字)をsvgに置き換える */
  const _replaceAllHanExp = (text, symbol, kind) => {
    const exp = new RegExp(`(?:[零一二三四五六七八九－ー\-]|ｒ五|赤五)*(?:[一二三四五六七八九－ー\-]|ｒ五|赤五)${symbol}`, 'g')
    text = text.replace(exp, (match) => {
      match = match.replace(new RegExp(symbol), '')
      match = match.replace(/零|ｒ五|赤五/g, '零')
      match = match.replace(/[零一二三四五六七八九]/g, (tile) => {
        return _id2svg(`${kind}${'零一二三四五六七八九'.indexOf(tile)}`)
      })
      return match
    })
    return text
  }

  /** 採譜記号表記(全角)の字牌をsvgに置き換える */
  const _replaceEmSymbolZihaiExp = (text) => {
    const exp = /[東南西北白發中発－ー\-]+/g
    text = text.replace(exp, (match) => {
      match = match.replace(/發|発/g, '發')
      match = match.replace(/[東南西北白發中]/g, (tile) => {
        return _id2svg(`z${'零東南西北白發中'.indexOf(tile)}`)
      })
      return match
    })
    return text
  }

  /** 牌のIDをsvgに置き換える */
  const _id2svg = (id) => {
    return `<svg class="tile"><use class="face" xlink:href="./formj/tiles.svg#${id}"></use></svg>`
  }

  /** 牌と前後の文字との間に間隔が空くようにする */
  const _wrapTextNode = (text) => {
    const parent = document.createElement('div')
    parent.innerHTML = text
    // テキストノードをspanタグで囲む
    parent.childNodes.forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        const node = document.createElement('span')
        node.innerText = child.textContent
        parent.replaceChild(node, child)
      }
    })
    // 牌と牌が連結しないときに隙間を空ける
    parent.childNodes.forEach((child, index) => {
      if (index + 1 > parent.childNodes.length - 1) {
        return
      }
      const nextChild = parent.childNodes[index + 1]
      if (child.classList.contains('tile') && !nextChild.classList.contains('tile')) {
        child.classList.add("margin")
      }
      if (!child.classList.contains('tile') && nextChild.classList.contains('tile')) {
        child.classList.add("margin")
      }
    })
    return parent.innerHTML
  }

  /** 麻雀牌っぽい表現をsvgに置き換える */
  window.comment4mj = (comment) => {
    // 一度変換されていたら変換しない
    const replaced = comment.data.replaced || false
    if (replaced) {
      return comment
    }

    let text = comment.data.comment;
    let table = {};
    ([text, table] = _escapeBrcExp(text, table));
    ([text, table] = _escapeDnyExp(text, table));
    ([text, table] = _escapeImgExp(text, table));
    ([text, table] = _escapeUrlExp(text, table));

    text = _replaceEnMpszExp(text, 'm', 'm')
    text = _replaceEnMpszExp(text, 'p', 'p')
    text = _replaceEnMpszExp(text, 's', 's')
    text = _replaceEnMpszZihaiExp(text)

    text = _replaceEmMpszExp(text, 'ｍ', 'm')
    text = _replaceEmMpszExp(text, 'ｐ', 'p')
    text = _replaceEmMpszExp(text, 'ｓ', 's')
    text = _replaceEmMpszZihaiExp(text)

    text = _replaceEnHanExp(text, '萬', 'm')
    text = _replaceEnHanExp(text, '筒', 'p')
    text = _replaceEnHanExp(text, '索', 's')

    text = _replaceEmHanExp(text, '萬', 'm')
    text = _replaceEmHanExp(text, '筒', 'p')
    text = _replaceEmHanExp(text, '索', 's')

    text = _replaceAllHanExp(text, '萬', 'm')
    text = _replaceAllHanExp(text, '筒', 'p')
    text = _replaceAllHanExp(text, '索', 's')

    text = _replaceEmSymbolZihaiExp(text)

    text = _revertEscExp(text, table)
    text = _wrapTextNode(text)
    comment.data.comment = text
    comment.data.replaced = true
    return comment
  }

  /** headタグの最後にsvgのスタイルを追加する */
  document.head.insertAdjacentHTML(
    'beforeend',
    `<link rel="stylesheet" href="./formj/svg.css" />`
  )

  /** bodyタグの最後にsvgのフィルタを追加する */
  document.body.insertAdjacentHTML(
    'beforeend',
    `<svg width="0" height="0">
      <defs>
        <filter id="inset-shadow">
          <feoffset dx="0" dy="0"></feoffset>
          <fegaussianblur stddeviation="1.5" result="offset-blur"></fegaussianblur>
          <fecomposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse"></fecomposite>
          <feflood flood-color="black" flood-opacity="1" result="color"></feflood>
          <fecomposite operator="in" in="color" in2="inverse" result="shadow"></fecomposite>
          <fecomposite operator="over" in="shadow" in2="SourceGraphic"></fecomposite>
        </filter>
      </defs>
    </svg>`
  )
})()
