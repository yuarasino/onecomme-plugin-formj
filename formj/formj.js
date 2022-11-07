(() => {
  /** urlをエスケープして変換されないようにする*/
  const _escapeUrlExp = (text) => {
    const exp = /(?<!")https?:\/\/[\w:%#&~=\/\$\?\(\)\.\+\-]+(?!")/g
    return text.replace(exp, '{$&}')
  }
  /** html attributeをエスケープして変換されないようにする*/
  const _escapeAttrExp = (text) => {
    const exp = /(?<=(?:src|alt|href)=")[^"]+?(?=")/g
    return text.replace(exp, '{$&}')
  }
  /** エスケープされた文字列を検索する */
  const _searchEscExp = (text) => {
    const exp = /\{[^\}]+?\}/g
    return text.match(exp) || []
  }
  /** エスケープされた文字列をプレースホルダに置き換える */
  const _replaceEscExp = (text, escs) => {
    escs.forEach((esc) => {
      text = text.replace(esc, "{esc}")
    })
    return text
  }
  /** プレースホルダをエスケープされた文字列に戻す */
  const _revertEscExp = (text, escs) => {
    escs.forEach((esc) => {
      text = text.replace("{esc}", esc.slice(1, -1))
    })
    return text
  }

  /** mpsz表記(半角)の萬子をsvgに置き換える */
  const _replaceEnMpszManzuExp = (text) => {
    const exp = /(?:[0-9]|r5|赤5)+m(?![a-qs-z])/g
    text = text.replace(exp, (match) => {
      match = match.replace(/m/g, '')
      match = match.replace(/0|r5|赤5/g, '0')
      match = match.replace(/[0-9]/g, (tile) => {
        return _id2svg(`m${tile}`)
      })
      return match
    })
    return text
  }
  /** mpsz表記(半角)の筒子をsvgに置き換える */
  const _replaceEnMpszPinzuExp = (text) => {
    const exp = /(?:[0-9]|r5|赤5)+p(?![a-qs-z])/g
    text = text.replace(exp, (match) => {
      match = match.replace(/p/g, '')
      match = match.replace(/0|r5|赤5/g, '0')
      match = match.replace(/[0-9]/g, (tile) => {
        return _id2svg(`p${tile}`)
      })
      return match
    })
    return text
  }
  /** mpsz表記(半角)の索子をsvgに置き換える */
  const _replaceEnMpszSouzuExp = (text) => {
    const exp = /(?:[0-9]|r5|赤5)+s(?![a-qs-z])/g
    text = text.replace(exp, (match) => {
      match = match.replace(/s/g, '')
      match = match.replace(/0|r5|赤5/g, '0')
      match = match.replace(/[0-9]/g, (tile) => {
        return _id2svg(`s${tile}`)
      })
      return match
    })
    return text
  }
  /** mpsz表記(半角)の字牌をsvgに置き換える */
  const _replaceEnMpszZihaiExp = (text) => {
    const exp = /[1-7]+z(?![a-qs-z])/g
    text = text.replace(exp, (match) => {
      match = match.replace(/z/g, '')
      match = match.replace(/[0-9]/g, (tile) => {
        return _id2svg(`z${tile}`)
      })
      return match
    })
    return text
  }

  /** mpsz表記(全角)の萬子をsvgに置き換える */
  const _replaceEmMpszManzuExp = (text) => {
    const exp = /(?:[０-９]|ｒ５|赤５)+ｍ(?![ａ-ｑｓ-ｚ])/g
    text = text.replace(exp, (match) => {
      match = match.replace(/ｍ/g, '')
      match = match.replace(/０|ｒ５|赤５/g, '０')
      match = match.replace(/[０-９]/g, (tile) => {
        return _id2svg(`m${'０１２３４５６７８９'.indexOf(tile)}`)
      })
      return match
    })
    return text
  }
  /** mpsz表記(全角)の筒子をsvgに置き換える */
  const _replaceEmMpszPinzuExp = (text) => {
    const exp = /(?:[０-９]|ｒ５|赤５)+ｐ(?![ａ-ｑｓ-ｚ])/g
    text = text.replace(exp, (match) => {
      match = match.replace(/ｐ/g, '')
      match = match.replace(/０|ｒ５|赤５/g, '０')
      match = match.replace(/[０-９]/g, (tile) => {
        return _id2svg(`p${'０１２３４５６７８９'.indexOf(tile)}`)
      })
      return match
    })
    return text
  }
  /** mpsz表記(全角)の索子をsvgに置き換える */
  const _replaceEmMpszSouzuExp = (text) => {
    const exp = /(?:[０-９]|ｒ５|赤５)+ｓ(?![ａ-ｑｓ-ｚ])/g
    text = text.replace(exp, (match) => {
      match = match.replace(/ｓ/g, '')
      match = match.replace(/０|ｒ５|赤５/g, '０')
      match = match.replace(/[０-９]/g, (tile) => {
        return _id2svg(`s${'０１２３４５６７８９'.indexOf(tile)}`)
      })
      return match
    })
    return text
  }
  /** mpsz表記(全角)の字牌をsvgに置き換える */
  const _replaceEmMpszZihaiExp = (text) => {
    const exp = /(?:[１-７])+ｚ(?![ａ-ｑｓ-ｚ])/g
    text = text.replace(exp, (match) => {
      match = match.replace(/ｚ/g, '')
      match = match.replace(/[０-９]/g, (tile) => {
        return _id2svg(`z${'０１２３４５６７８９'.indexOf(tile)}`)
      })
      return match
    })
    return text
  }

  /** 採譜記号表記(全角)の字牌をsvgに置き換える */
  const _replaceEmSymbolZihaiExp = (text) => {
    const exp = /[東南西北白發中]+/g
    text = text.replace(exp, (match) => {
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


  /** 麻雀牌っぽい表現をsvgに置き換える */
  window.comment4mj = (comment) => {
    // 一度変換されていたら変換しない
    const replaced = comment.data.replaced || false
    if (replaced) {
      return comment
    }

    let text = comment.data.comment
    text = _escapeUrlExp(text)
    text = _escapeAttrExp(text)
    escs = _searchEscExp(text)
    text = _replaceEscExp(text, escs)

    text = _replaceEnMpszManzuExp(text)
    text = _replaceEnMpszPinzuExp(text)
    text = _replaceEnMpszSouzuExp(text)
    text = _replaceEnMpszZihaiExp(text)

    text = _replaceEmMpszManzuExp(text)
    text = _replaceEmMpszPinzuExp(text)
    text = _replaceEmMpszSouzuExp(text)
    text = _replaceEmMpszZihaiExp(text)

    text = _replaceEmSymbolZihaiExp(text)

    text = _revertEscExp(text, escs)
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
