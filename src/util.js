export default {
    copyObject(o) {
        try {
            return JSON.parse(JSON.stringify(o))
        } catch (ex) {
            return null
        }
    },
    getImageData(uri) {
        return new Promise((resolve, reject) => {
            var image = new Image()
            image.onload = function () {
                resolve({
                    uri: image.src,
                    width: image.width,
                    height: image.height
                })
            }
            image.onerror = reject
            image.src = uri
        })
    },
    getLayerInfo(layers) {
        let w = 0
        let h = 0
        let ref = []
        let minVal = [1e5, 1e5]
        let minIndex = [0, 0]
        layers.forEach((item, index) => {
          let { x, y } = item.frame
          if (x < minVal[0]) {
            minVal[0] = x
            minIndex[0] = index
          }
          if (y < minVal[1]) {
            minVal[1] = y
            minIndex[1] = index
          }
        })
        if (minVal[0]) {
          minVal[0] = -minVal[0]
        }
        if (minVal[1]) {
          minVal[1] = -minVal[1]
        }

        layers.forEach(item => {
          let { width, height, x, y } = item.frame
          item.frame.x = x = x + minVal[0]
          item.frame.y = y = y + minVal[1]

          if (w < width + x) {
            w = width + x
          }
          if (h < height + y) {
            h = height + y
          }
          ref.push(item)
        })
        return [w, h, ref]
      }
}