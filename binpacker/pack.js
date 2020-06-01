const fs = require('fs')
const path = require('path')
const sharp = require('sharp')
const glob = require('fast-glob')
const { MaxRectsPacker } = require('maxrects-packer')

const spreadPixel = 2
const packer = new MaxRectsPacker(10000, 10000, spreadPixel * 2, {
  smart: true,
  pot: true,
  square: false,
  allowRotation: false,
  tag: false,
})


void async function() {
  const baseDir = '../resource_separate/assets'

  let entries = await glob([`${baseDir}/[d|m]/**/*.png`])

  entries = await Promise.all(
    entries.map(async entry => {
      let dir = path.dirname(entry).replace(`${baseDir}/`, '')
      let name = path.basename(entry).replace('.png', '_png')

      const image = sharp(entry)
      const { width, height } = await image.metadata()

      return {
        dir,
        name,
        image,
        width,
        height,
      }
    })
  )

  // sort for sprite filename grouping
  entries.sort((a, b) => a.dir.localeCompare(b.dir))

  let acc = {}
  entries.forEach(entry => {
    let sprite = ''
    const parents = entry.dir.split('/')
    for (let i = 0, len = parents.length; i < len; i += 1) {
      // ex. d -> d_ba -> d_ba_xxx -> d_ba_xxx_yyyy
      const name = (sprite + ' ' + parents[i]).trim().replace(/\s/g, '_')
      if (acc[name] instanceof Array) {
        // name at outermost dir, ex. d_ba
        sprite = name
        break
      }
      sprite = name
    }

    acc = {
      ...acc,
      [sprite]: [
        ...(acc[sprite] || []),
        {
          ...entry,
          sprite,
        },
      ],
    }
  })

  // console.log(Object.keys(acc))

  for (const sprite of Object.keys(acc)) {
    const images = acc[sprite]
    packer.addArray(images)
    packer.next()
  }

  for (const bin of packer.bins) {
    console.log(`packing ${bin.rects[0].sprite}`)

    let largestX = bin.rects[0]
    let largestY = bin.rects[0]
    for (let i = 1; i < bin.rects.length; i += 1) {
      if (bin.rects[i].x + bin.rects[i].width >= largestX.x + largestX.width)
        largestX = bin.rects[i]
      if (bin.rects[i].y + bin.rects[i].height >= largestY.y + largestY.height)
        largestY = bin.rects[i]
    }
    const canvasWidth = largestX.x + largestX.width + spreadPixel * 2
    const canvasHeight = largestY.y + largestY.height + spreadPixel * 2

    // console.log(canvasWidth, canvasHeight)
    // console.log(bin.rects.map(({ width, height, x, y }) => ({ width, height, x, y })))

    const channels = 4 // rgba

    let op = await sharp({
      create: {
        width: canvasWidth,
        height: canvasHeight,
        channels,
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      }
    })

    async function spreadImage({ sprite, name, image, width, height, x, y }) {
      if (spreadPixel < 1) {
        return {
          input: await image.ensureAlpha().toColorspace('srgb').toBuffer(),
          left: x,
          top: y,
        }
      }

      // console.log(`spreading ${sprite} - ${name} (${width}x${height})`)
      const oldBuffer = Array.from(await image.ensureAlpha().toColorspace('srgb').raw().toBuffer())
      let rows = []
      while (oldBuffer.length > 0)
        rows.push(oldBuffer.splice(0, width * channels))
      rows = rows.map(pixels => {
        const cols = []
        while (pixels.length > 0)
          cols.push(pixels.splice(0, channels))
        return cols
      })
      // spread top, bottom
      for (let s = 0; s < spreadPixel; s += 1) {
        rows.unshift(JSON.parse(JSON.stringify(rows[0])))
        rows.push(JSON.parse(JSON.stringify(rows[rows.length - 1])))
      }
      // spread left, right
      for (let i = 0; i < rows.length; i += 1) {
        let arr = []
        for (let s = 0; s < spreadPixel; s += 1) {
          const first = [...rows[i][0]]
          arr.push(first)
        }
        arr.push(...rows[i])
        for (let s = 0; s < spreadPixel; s += 1) {
          const last = [...rows[i][rows[i].length - 1]]
          arr.push(last)
        }
        rows[i] = arr
        // rows[i] = [
        //   first,
        //   ...rows[i],
        //   last,
        // ]
      }
      rows = rows.map(row => row.flat()).flat()
      const newImage = await sharp(Buffer.from(rows), {
        raw: {
          width: width + spreadPixel * 2,
          height: height + spreadPixel * 2,
          channels,
        },
      }).png().toBuffer()

      return {
        input: newImage,
        left: x,
        top: y,
      }
    }

    op = op.composite(await Promise.all(
      bin.rects.map(spreadImage)
    ))

    await op.png().toFile(`${bin.rects[0].sprite}.png`)

    const json = JSON.stringify({
      file: `${bin.rects[0].sprite}.png`,
      frames: bin.rects.reduce((acc, rect) => ({
        ...acc,
        [rect.name]: {
          x: rect.x + spreadPixel,
          y: rect.y + spreadPixel,
          w: rect.width,
          h: rect.height,
          offX: 0,
          offY: 0,
          sourceW: rect.width,
          sourceH: rect.height,
        },
      }), {})
    })

    fs.writeFileSync(`${bin.rects[0].sprite}.json`, json)
  }

  console.log('process completed')
  process.exit(0)
}()