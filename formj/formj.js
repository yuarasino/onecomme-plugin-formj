(() => {
  const escapeUrlExp = (text) => {
    const exp = /https?:\/\/[\w:%#&~=\/\$\?\(\)\.\+\-]+/g
    return text.replace(exp, '{$&}')
  }
  const searchEscExp = (text) => {
    const exp = /\{[^\}]+?\}/g
    return text.match(exp) || []
  }
  const replaceEscExp = (text, escs) => {
    escs.forEach((esc) => {
      text = text.replace(esc, "{esc}")
    })
    return text
  }
  const revertEscExp = (text, escs) => {
    escs.forEach((esc) => {
      text = text.replace("{esc}", esc.slice(1, -1))
    })
    return text
  }

  const replaceEnMpszManzuExp = (text) => {
    const exp = /(?:[0-9]|r5|赤5)+m(?![a-qs-z])/g
    text = text.replace(exp, (match) => {
      match = match.replace(/m/g, '')
      match = match.replace(/0|r5|赤5/g, '0')
      match = match.replace(/[0-9]/g, (tile) => {
        return id2svg(`m${tile}`)
      })
      return match
    })
    return text
  }
  const replaceEnMpszPinzuExp = (text) => {
    const exp = /(?:[0-9]|r5|赤5)+p(?![a-qs-z])/g
    text = text.replace(exp, (match) => {
      match = match.replace(/p/g, '')
      match = match.replace(/0|r5|赤5/g, '0')
      match = match.replace(/[0-9]/g, (tile) => {
        return id2svg(`p${tile}`)
      })
      return match
    })
    return text
  }
  const replaceEnMpszSouzuExp = (text) => {
    const exp = /(?:[0-9]|r5|赤5)+s(?![a-qs-z])/g
    text = text.replace(exp, (match) => {
      match = match.replace(/s/g, '')
      match = match.replace(/0|r5|赤5/g, '0')
      match = match.replace(/[0-9]/g, (tile) => {
        return id2svg(`s${tile}`)
      })
      return match
    })
    return text
  }
  const replaceEnMpszZihaiExp = (text) => {
    const exp = /[1-7]+z(?![a-qs-z])/g
    text = text.replace(exp, (match) => {
      match = match.replace(/z/g, '')
      match = match.replace(/[0-9]/g, (tile) => {
        return id2svg(`z${tile}`)
      })
      return match
    })
    return text
  }

  const replaceEmMpszManzuExp = (text) => {
    const exp = /(?:[０-９]|ｒ５|赤５)+ｍ(?![ａ-ｑｓ-ｚ])/g
    text = text.replace(exp, (match) => {
      match = match.replace(/ｍ/g, '')
      match = match.replace(/０|ｒ５|赤５/g, '０')
      match = match.replace(/[０-９]/g, (tile) => {
        return id2svg(`m${'０１２３４５６７８９'.indexOf(tile)}`)
      })
      return match
    })
    return text
  }
  const replaceEmMpszPinzuExp = (text) => {
    const exp = /(?:[０-９]|ｒ５|赤５)+ｐ(?![ａ-ｑｓ-ｚ])/g
    text = text.replace(exp, (match) => {
      match = match.replace(/ｐ/g, '')
      match = match.replace(/０|ｒ５|赤５/g, '０')
      match = match.replace(/[０-９]/g, (tile) => {
        return id2svg(`p${'０１２３４５６７８９'.indexOf(tile)}`)
      })
      return match
    })
    return text
  }
  const replaceEmMpszSouzuExp = (text) => {
    const exp = /(?:[０-９]|ｒ５|赤５)+ｓ(?![ａ-ｑｓ-ｚ])/g
    text = text.replace(exp, (match) => {
      match = match.replace(/ｓ/g, '')
      match = match.replace(/０|ｒ５|赤５/g, '０')
      match = match.replace(/[０-９]/g, (tile) => {
        return id2svg(`s${'０１２３４５６７８９'.indexOf(tile)}`)
      })
      return match
    })
    return text
  }
  const replaceEmMpszZihaiExp = (text) => {
    const exp = /(?:[１-７])+ｚ(?![ａ-ｑｓ-ｚ])/g
    text = text.replace(exp, (match) => {
      match = match.replace(/ｚ/g, '')
      match = match.replace(/[０-９]/g, (tile) => {
        return id2svg(`z${'０１２３４５６７８９'.indexOf(tile)}`)
      })
      return match
    })
    return text
  }

  const replaceEmSymbolZihaiExp = (text) => {
    const exp = /[東南西北白發中]+/g
    text = text.replace(exp, (match) => {
      match = match.replace(/[東南西北白發中]/g, (tile) => {
        return id2svg(`z${'零東南西北白發中'.indexOf(tile)}`)
      })
      return match
    })
    return text
  }

  const id2svg = (id) => {
    return `<svg class="tile"><use class="face" xlink:href="./formj/tiles.svg#${id}"></use></svg>`
  }

  /** 麻雀牌っぽい表現をsvgに置換 */
  window.comment4mj = (comment) => {
    const replaced = comment.data.replaced || false
    if (replaced) return

    let text = comment.data.comment
    text = escapeUrlExp(text)
    escs = searchEscExp(text)
    text = replaceEscExp(text, escs)

    text = replaceEnMpszManzuExp(text)
    text = replaceEnMpszPinzuExp(text)
    text = replaceEnMpszSouzuExp(text)
    text = replaceEnMpszZihaiExp(text)

    text = replaceEmMpszManzuExp(text)
    text = replaceEmMpszPinzuExp(text)
    text = replaceEmMpszSouzuExp(text)
    text = replaceEmMpszZihaiExp(text)

    text = replaceEmSymbolZihaiExp(text)

    text = revertEscExp(text, escs)
    comment.data.comment = text
    comment.data.replaced = true
  }

  /** headタグの最後にsvgのスタイルを追加 */
  document.head.insertAdjacentHTML(
    'beforeend',
    `<link rel="stylesheet" href="./formj/svg.css" />`
  )

  /** bodyタグの最後にsvgのフィルタを追加 */
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
