export const handleLangList = body => {
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

export const hotCityList = body => {
  let obj = {}

  obj.items = []
  if (body) {
    body.forEach(item => {
      obj.items.push({ label: item.label, value: item.value, name: item.label })
      obj.name = '热门城市'
    })
  } else {
    obj.items.push({ label: localStorage.getItem('cityname'), name: localStorage.getItem('cityname') })
    obj.name = '当前定位'
  }
  obj = [obj]
  return obj
}

export const handlePickerData = obj => {
  obj.text = obj.label
  obj.children.forEach(item => {
    item.text = item.label
    if (item.children) {
      item.children.forEach(item1 => {
        item1.text = item1.label
        if (item1.children) {
          delete item1.children
        }
      })
    }
  })
  return obj
}
