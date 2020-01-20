const handleLangList = body => {
  body.forEach(item => {
    item.name = item.label
  })
  let tempObj = {}
  body.forEach(item => {
    if (item.short[0] in tempObj) {
      tempObj[item.short[0]].push(item)
    } else {
      tempObj[item.short[0]] = [item]
    }
  })
  const cityIndex = Object.keys(tempObj).sort()
  let newObj = {}
  for (let i = 0; i < cityIndex.length; i++) {
    newObj[cityIndex[i]] = tempObj[cityIndex[i]]
  }
  let newList = []
  for (var key in newObj) {
    newList.push({ name: key, items: newObj[key] })
  }
  return newList
}
export {
  handleLangList
}
