import * as THREE from 'three'

class BaseGeometry extends THREE.BufferGeometry {
  constructor(end) {
    super() // 调用THREE.Geometry的构造函数

    this.type = 'PolyhedronGeometry'
  }

  mergeVertices(epsilon = 1e-4) {
    // 将BufferGeometry的顶点位置转换为THREE.Vector3数组
    const vertices = []
    const positionAttribute = this.getAttribute('position')
    for (let i = 0; i < positionAttribute.count; i++) {
      const vertex = new THREE.Vector3()
      vertex.fromBufferAttribute(positionAttribute, i)
      vertices.push(vertex)
    }

    // 用于存储每个唯一顶点的索引和合并后顶点的索引映射
    const verticesMap = {} // vertexIndex: mergedVertexIndex
    const unique = [] // 存储唯一顶点
    const changes = [] // 存储每个顶点对应的唯一顶点索引

    // 查找重复顶点
    for (let i = 0; i < vertices.length; i++) {
      const vertex = vertices[i]
      const key = `${Math.round(vertex.x / epsilon)}_${Math.round(
        vertex.y / epsilon
      )}_${Math.round(vertex.z / epsilon)}`
      if (verticesMap[key] === undefined) {
        verticesMap[key] = i
        unique.push(vertex)
        changes[i] = unique.length - 1
      } else {
        // 找到重复顶点
        changes[i] = changes[verticesMap[key]]
      }
    }

    // 重建几何体的顶点位置属性
    const positions = new Float32Array(unique.length * 3)
    for (let i = 0; i < unique.length; i++) {
      positions[i * 3] = unique[i].x
      positions[i * 3 + 1] = unique[i].y
      positions[i * 3 + 2] = unique[i].z
    }
    this.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    // 如果几何体使用了索引，则需要更新索引数组
    if (this.index) {
      const indices = this.index.array
      const newIndices = new indices.constructor(indices.length)
      for (let i = 0; i < indices.length; i++) {
        newIndices[i] = changes[indices[i]]
      }
      this.setIndex(new THREE.BufferAttribute(newIndices, 1))
    }
  }

  async init() {
    await this.asyncPrepare()
    await this.asyncIndices()
    await this.asyncRadius()
    this.mergeVertices()
    this.computeVertexNormals()
  }

  async asyncPrepare() {
    const range = 6000
    const l = this.input.vertices.length
    let i = 0

    this.addLoading(range, l, '处理立方体表面')

    while (i < l) {
      await this.asyncPrepareRange(l, i, range)
      this.loading()
      i += range
    }
  }

  async asyncPrepareRange(length, begin, range) {
    for (let j = begin; j < length && j < begin + range; j++) {
      this.prepare(this.input.vertices[j], this.input.uvs[j])
    }
    // 模拟异步操作
    await new Promise(resolve => setTimeout(resolve, 0))
  }

  async asyncRadius() {
    const range = 8000
    // 获取位置属性
    const positionAttribute = this.getAttribute('position')
    const l = positionAttribute.count // 获取顶点数量
    let i = 0

    this.addLoading(range, l, '调整立方体位置')

    while (i < l) {
      // 调用异步范围调整函数
      await this.asyncRadiusRange(positionAttribute, i, range)
      this.loading()
      i += range
    }
  }

  async asyncRadiusRange(positionAttribute, begin, range) {
    // 仅在此范围内处理顶点
    const end = Math.min(positionAttribute.count, begin + range)
    for (let j = begin; j < end; j++) {
      // 获取当前顶点的位置
      const x = positionAttribute.getX(j)
      const y = positionAttribute.getY(j)
      const z = positionAttribute.getZ(j)

      // 调整顶点位置
      positionAttribute.setXYZ(
        j,
        x * this.input.radius,
        y * this.input.radius,
        z * this.input.radius
      )
    }

    // 标记位置属性需要更新
    positionAttribute.needsUpdate = true

    // 模拟异步操作
    await new Promise(resolve => setTimeout(resolve, 0))
  }

  async asyncIndices() {
    const range = 4000
    const l = this.input.indices.length / 3
    let i = 0

    this.addLoading(range, l, '创建立方体索引')

    while (i < l) {
      await this.asyncIndicesRange(l, i, range)
      this.loading()
      i += range
    }
  }

  async asyncIndicesRange(length, begin, range) {
    const colorArray = new Float32Array(1000 * 3) // vertices.length是顶点的数量，*3因为颜色是RGB

    // 填充colorArray，这里只是一个示例，具体填充方式取决于你的需求
    for (let i = 0; i < 1000; i++) {
      colorArray[i * 3] = Math.random() // R
      colorArray[i * 3 + 1] = Math.random() // G
      colorArray[i * 3 + 2] = Math.random() // B
    }

    // 创建颜色属性并添加到几何体中
    const colorAttribute = new THREE.BufferAttribute(colorArray, 3)
    this.setAttribute('color', colorAttribute)
    // 获取位置和颜色属性的引用
    const positions = this.getAttribute('position').array
    const colors = this.getAttribute('color').array
    const indicesArray = new Uint32Array(range * 3) // 假设每个面3个顶点，适用于range内的面

    let indicesCount = 0

    for (let j = begin; j < length && j < begin + range; j++) {
      // 计算颜色
      const colorIdx = Math.floor(j / 2) % this.input.colors.length
      const color = new THREE.Color(this.input.colors[colorIdx])

      // 处理每个面的顶点和颜色
      for (let k = 0; k < 3; k++) {
        // 每个面3个顶点
        const vertexIndex = this.input.indices[j * 3 + k]
        const positionIndex = vertexIndex * 3
        const colorIndex = vertexIndex * 3

        // 假设positions已经填充

        // 设置颜色
        colors[colorIndex] = color.r
        colors[colorIndex + 1] = color.g
        colors[colorIndex + 2] = color.b

        // 设置索引
        indicesArray[indicesCount++] = vertexIndex
      }
    }

    // 更新BufferGeometry的索引属性
    if (!this.index) {
      this.setIndex(new THREE.BufferAttribute(indicesArray, 1))
    } else {
      const existingIndices = this.index.array
      existingIndices.set(indicesArray, begin * 3) // 假设begin是面的开始索引而非顶点
      this.index.needsUpdate = true
    }

    // 标记颜色属性需要更新
    this.getAttribute('color').needsUpdate = true

    // 模拟异步操作
    await new Promise(resolve => setTimeout(resolve, 0))
  }

  addLoading(range, length, text) {
    // 实现加载逻辑
    if (this.loadbar) {
      this.loadbar.stage(text, Math.ceil(length / range))
    } else {
      console.log(text + 'range' + Math.ceil(length / range))
    }
  }

  loading() {
    // 实现加载步骤逻辑
    if (typeof this.loadbar != 'undefined') {
      this.loadbar.step()
    } else {
      console.log('do it')
    }
  }
  async asyncPrepareRange(length, begin, range) {
    // 获取或初始化position和uv属性
    let positionAttribute = this.getAttribute('position')
    let uvAttribute = this.getAttribute('uv')

    if (!positionAttribute || !uvAttribute) {
      // 假设你在这里根据length初始化或重新分配缓冲区
      // 这里只是一个示例，具体实现取决于你的需求
      const positions = new Float32Array(length * 3) // 每个顶点3个值(x, y, z)
      const uvs = new Float32Array(length * 2) // 每个顶点2个值(u, v)

      positionAttribute = new THREE.BufferAttribute(positions, 3)
      uvAttribute = new THREE.BufferAttribute(uvs, 2)

      this.setAttribute('position', positionAttribute)
      this.setAttribute('uv', uvAttribute)
    }

    for (let j = begin; j < length && j < begin + range; j++) {
      // 直接更新顶点和UV缓冲区
      const vertex = this.input.vertices[j]
      const uv = this.input.uvs[j]

      positionAttribute.setXYZ(j, vertex.x, vertex.y, vertex.z)
      uvAttribute.setXY(j, uv.x, uv.y)
    }

    // 标记属性需要更新
    positionAttribute.needsUpdate = true
    uvAttribute.needsUpdate = true

    // 模拟异步操作，如果有必要
    await new Promise(resolve => setTimeout(resolve, 0))
  }

  async buildInput(voxel, maps, oft, colors) {
    const p = {
      idx: 0,
      cdx: 0,
      map: maps,
      rgba: colors,
      oft: oft,
      vox: voxel
    }

    const range = 1000
    const l = p.vox.length
    let i = 0

    this.addLoading(range, l, '格式化立方体数据')

    while (i < l) {
      await this.buildInputRange(p, i, range)
      this.loading()
      i += range
    }
  }
  async buildInputRange(p, begin, range) {
    var that = this
    return new Promise(resolve => {
      for (var i = begin; i < p.vox.length && i < begin + range; i++) {
        var x = p.vox[i].x
        var y = p.vox[i].y
        var z = p.vox[i].z
        var color = new THREE.Color(p.rgba[p.vox[i].c - 1])

        if (!p.map['p_' + x + '_' + y + '_' + (z - 1)]) {
          this.input.vertices.push(
            new THREE.Vector3(
              x * 2 - 1 + p.oft.x,
              y * 2 - 1 + p.oft.y,
              z * 2 - 1 + p.oft.z
            ), //front
            new THREE.Vector3(
              x * 2 + 1 + p.oft.x,
              y * 2 - 1 + p.oft.y,
              z * 2 - 1 + p.oft.z
            ),
            new THREE.Vector3(
              x * 2 + 1 + p.oft.x,
              y * 2 + 1 + p.oft.y,
              z * 2 - 1 + p.oft.z
            ),
            new THREE.Vector3(
              x * 2 - 1 + p.oft.x,
              y * 2 + 1 + p.oft.y,
              z * 2 - 1 + p.oft.z
            )
          )

          var m = 0
          m |= p.map['p_' + (x + 1) + '_' + (y + 1) + '_' + (z - 1)] ? 1 : 0
          m |= p.map['p_' + x + '_' + (y + 1) + '_' + (z - 1)] ? 2 : 0
          m |= p.map['p_' + (x - 1) + '_' + (y + 1) + '_' + (z - 1)] ? 4 : 0

          m |= p.map['p_' + (x + 1) + '_' + y + '_' + (z - 1)] ? 8 : 0
          m |= p.map['p_' + (x - 1) + '_' + y + '_' + (z - 1)] ? 16 : 0

          m |= p.map['p_' + (x + 1) + '_' + (y - 1) + '_' + (z - 1)] ? 32 : 0
          m |= p.map['p_' + x + '_' + (y - 1) + '_' + (z - 1)] ? 64 : 0
          m |= p.map['p_' + (x - 1) + '_' + (y - 1) + '_' + (z - 1)] ? 128 : 0

          that.makeUV(m)
          that.input.indices.push(
            p.idx + 2,
            p.idx + 1,
            p.idx + 0,
            p.idx + 0,
            p.idx + 3,
            p.idx + 2
          )
          p.idx += 4

          that.input.colors[p.cdx] = new THREE.Color(
            color.r * 0.6,
            color.g * 0.6,
            color.b * 0.6
          )
          p.cdx += 1
        }
        if (!p.map['p_' + (x - 1) + '_' + y + '_' + z]) {
          that.input.vertices.push(
            new THREE.Vector3(
              x * 2 - 1 + p.oft.x,
              y * 2 + 1 + p.oft.y,
              z * 2 + 1 + p.oft.z
            ), //left
            new THREE.Vector3(
              x * 2 - 1 + p.oft.x,
              y * 2 - 1 + p.oft.y,
              z * 2 + 1 + p.oft.z
            ),
            new THREE.Vector3(
              x * 2 - 1 + p.oft.x,
              y * 2 - 1 + p.oft.y,
              z * 2 - 1 + p.oft.z
            ),
            new THREE.Vector3(
              x * 2 - 1 + p.oft.x,
              y * 2 + 1 + p.oft.y,
              z * 2 - 1 + p.oft.z
            )
          )

          var m = 0

          m |= p.map['p_' + (x - 1) + '_' + (y - 1) + '_' + (z - 1)] ? 1 : 0
          m |= p.map['p_' + (x - 1) + '_' + y + '_' + (z - 1)] ? 2 : 0
          m |= p.map['p_' + (x - 1) + '_' + (y + 1) + '_' + (z - 1)] ? 4 : 0

          m |= p.map['p_' + (x - 1) + '_' + (y - 1) + '_' + z] ? 8 : 0
          m |= p.map['p_' + (x - 1) + '_' + (y + 1) + '_' + z] ? 16 : 0

          m |= p.map['p_' + (x - 1) + '_' + (y - 1) + '_' + (z + 1)] ? 32 : 0
          m |= p.map['p_' + (x - 1) + '_' + y + '_' + (z + 1)] ? 64 : 0
          m |= p.map['p_' + (x - 1) + '_' + (y + 1) + '_' + (z + 1)] ? 128 : 0

          that.makeUV(m)
          that.input.indices.push(
            p.idx + 2,
            p.idx + 1,
            p.idx + 0,
            p.idx + 0,
            p.idx + 3,
            p.idx + 2
          )
          p.idx += 4

          that.input.colors[p.cdx] = new THREE.Color(
            color.r * 0.8,
            color.g * 0.8,
            color.b * 0.8
          )
          p.cdx += 1
        }
        if (!p.map['p_' + x + '_' + (y - 1) + '_' + z]) {
          that.input.vertices.push(
            new THREE.Vector3(
              x * 2 + 1 + p.oft.x,
              y * 2 - 1 + p.oft.y,
              z * 2 + 1 + p.oft.z
            ), //down
            new THREE.Vector3(
              x * 2 + 1 + p.oft.x,
              y * 2 - 1 + p.oft.y,
              z * 2 - 1 + p.oft.z
            ),
            new THREE.Vector3(
              x * 2 - 1 + p.oft.x,
              y * 2 - 1 + p.oft.y,
              z * 2 - 1 + p.oft.z
            ),
            new THREE.Vector3(
              x * 2 - 1 + p.oft.x,
              y * 2 - 1 + p.oft.y,
              z * 2 + 1 + p.oft.z
            )
          )

          var m = 0
          m |= p.map['p_' + (x - 1) + '_' + (y - 1) + '_' + (z - 1)] ? 1 : 0
          m |= p.map['p_' + x + '_' + (y - 1) + '_' + (z - 1)] ? 8 : 0
          m |= p.map['p_' + (x + 1) + '_' + (y - 1) + '_' + (z - 1)] ? 32 : 0

          m |= p.map['p_' + (x - 1) + '_' + (y - 1) + '_' + z] ? 2 : 0
          m |= p.map['p_' + (x + 1) + '_' + (y - 1) + '_' + z] ? 64 : 0

          m |= p.map['p_' + (x - 1) + '_' + (y - 1) + '_' + (z + 1)] ? 4 : 0
          m |= p.map['p_' + x + '_' + (y - 1) + '_' + (z + 1)] ? 16 : 0
          m |= p.map['p_' + (x + 1) + '_' + (y - 1) + '_' + (z + 1)] ? 128 : 0

          that.makeUV(m)
          that.input.indices.push(
            p.idx + 2,
            p.idx + 1,
            p.idx + 0,
            p.idx + 0,
            p.idx + 3,
            p.idx + 2
          )
          p.idx += 4

          that.input.colors[p.cdx] = new THREE.Color(
            color.r * 1,
            color.g * 1,
            color.b * 1
          )
          p.cdx += 1
        }

        if (!p.map['p_' + (x + 1) + '_' + y + '_' + z]) {
          that.input.vertices.push(
            new THREE.Vector3(
              x * 2 + 1 + p.oft.x,
              y * 2 + 1 + p.oft.y,
              z * 2 + 1 + p.oft.z
            ), //right
            new THREE.Vector3(
              x * 2 + 1 + p.oft.x,
              y * 2 + 1 + p.oft.y,
              z * 2 - 1 + p.oft.z
            ),
            new THREE.Vector3(
              x * 2 + 1 + p.oft.x,
              y * 2 - 1 + p.oft.y,
              z * 2 - 1 + p.oft.z
            ),
            new THREE.Vector3(
              x * 2 + 1 + p.oft.x,
              y * 2 - 1 + p.oft.y,
              z * 2 + 1 + p.oft.z
            )
          )

          var m = 0
          m |= p.map['p_' + (x + 1) + '_' + (y + 1) + '_' + (z + 1)] ? 128 : 0
          m |= p.map['p_' + (x + 1) + '_' + y + '_' + (z + 1)] ? 16 : 0
          m |= p.map['p_' + (x + 1) + '_' + (y - 1) + '_' + (z + 1)] ? 4 : 0

          m |= p.map['p_' + (x + 1) + '_' + (y + 1) + '_' + z] ? 64 : 0
          m |= p.map['p_' + (x + 1) + '_' + (y - 1) + '_' + z] ? 2 : 0

          m |= p.map['p_' + (x + 1) + '_' + (y + 1) + '_' + (z - 1)] ? 32 : 0
          m |= p.map['p_' + (x + 1) + '_' + y + '_' + (z - 1)] ? 8 : 0
          m |= p.map['p_' + (x + 1) + '_' + (y - 1) + '_' + (z - 1)] ? 1 : 0

          that.makeUV(m)
          that.input.indices.push(
            p.idx + 2,
            p.idx + 1,
            p.idx + 0,
            p.idx + 0,
            p.idx + 3,
            p.idx + 2
          )
          p.idx += 4

          that.input.colors[p.cdx] = new THREE.Color(
            color.r * 0.7,
            color.g * 0.7,
            color.b * 0.7
          )
          p.cdx += 1
        }

        if (!p.map['p_' + x + '_' + (y + 1) + '_' + z]) {
          that.input.vertices.push(
            new THREE.Vector3(
              x * 2 - 1 + p.oft.x,
              y * 2 + 1 + p.oft.y,
              z * 2 + 1 + p.oft.z
            ), //up
            new THREE.Vector3(
              x * 2 - 1 + p.oft.x,
              y * 2 + 1 + p.oft.y,
              z * 2 - 1 + p.oft.z
            ),
            new THREE.Vector3(
              x * 2 + 1 + p.oft.x,
              y * 2 + 1 + p.oft.y,
              z * 2 - 1 + p.oft.z
            ),
            new THREE.Vector3(
              x * 2 + 1 + p.oft.x,
              y * 2 + 1 + p.oft.y,
              z * 2 + 1 + p.oft.z
            )
          )

          var m = 0
          m |= p.map['p_' + (x - 1) + '_' + (y + 1) + '_' + (z + 1)] ? 128 : 0
          m |= p.map['p_' + x + '_' + (y + 1) + '_' + (z + 1)] ? 16 : 0
          m |= p.map['p_' + (x + 1) + '_' + (y + 1) + '_' + (z + 1)] ? 4 : 0

          m |= p.map['p_' + (x - 1) + '_' + (y + 1) + '_' + z] ? 64 : 0
          m |= p.map['p_' + (x + 1) + '_' + (y + 1) + '_' + z] ? 2 : 0

          m |= p.map['p_' + (x + 1) + '_' + (y + 1) + '_' + (z - 1)] ? 1 : 0
          m |= p.map['p_' + x + '_' + (y + 1) + '_' + (z - 1)] ? 8 : 0
          m |= p.map['p_' + (x - 1) + '_' + (y + 1) + '_' + (z - 1)] ? 32 : 0

          that.makeUV(m)
          that.input.indices.push(
            p.idx + 2,
            p.idx + 1,
            p.idx + 0,
            p.idx + 0,
            p.idx + 3,
            p.idx + 2
          )
          p.idx += 4
          //colors[j] = color;
          that.input.colors[p.cdx] = new THREE.Color(
            color.r * 1,
            color.g * 1,
            color.b * 1
          )
          p.cdx += 1
        }

        if (!p.map['p_' + x + '_' + y + '_' + (z + 1)]) {
          that.input.vertices.push(
            new THREE.Vector3(
              x * 2 + 1 + p.oft.x,
              y * 2 + 1 + p.oft.y,
              z * 2 + 1 + p.oft.z
            ), //back
            new THREE.Vector3(
              x * 2 + 1 + p.oft.x,
              y * 2 - 1 + p.oft.y,
              z * 2 + 1 + p.oft.z
            ),
            new THREE.Vector3(
              x * 2 - 1 + p.oft.x,
              y * 2 - 1 + p.oft.y,
              z * 2 + 1 + p.oft.z
            ),
            new THREE.Vector3(
              x * 2 - 1 + p.oft.x,
              y * 2 + 1 + p.oft.y,
              z * 2 + 1 + p.oft.z
            )
          )

          var m = 0
          m |= p.map['p_' + (x - 1) + '_' + (y - 1) + '_' + (z + 1)] ? 1 : 0
          m |= p.map['p_' + x + '_' + (y - 1) + '_' + (z + 1)] ? 8 : 0
          m |= p.map['p_' + (x + 1) + '_' + (y - 1) + '_' + (z + 1)] ? 32 : 0

          m |= p.map['p_' + (x - 1) + '_' + y + '_' + (z + 1)] ? 2 : 0
          m |= p.map['p_' + (x + 1) + '_' + y + '_' + (z + 1)] ? 64 : 0

          m |= p.map['p_' + (x - 1) + '_' + (y + 1) + '_' + (z + 1)] ? 4 : 0
          m |= p.map['p_' + x + '_' + (y + 1) + '_' + (z + 1)] ? 16 : 0
          m |= p.map['p_' + (x + 1) + '_' + (y + 1) + '_' + (z + 1)] ? 128 : 0
          /**/

          that.makeUV(m)
          that.input.indices.push(
            p.idx + 2,
            p.idx + 1,
            p.idx + 0,
            p.idx + 0,
            p.idx + 3,
            p.idx + 2
          )
          p.idx += 4

          that.input.colors[p.cdx] = new THREE.Color(
            color.r * 0.6 + 0.2,
            color.g * 0.6 + 0.2,
            color.b * 0.6 + 0.2
          )
          p.cdx += 1
        }

        p.map['p_' + p.vox[i].x + '_' + p.vox[i].y + '_' + p.vox[i].z] =
          p.vox[i].c
      }

      setTimeout(() => {
        resolve()
      }, 0)
    })
  }

  makeUV(i) {
    var that = this
    var unit = 1.0 / 16

    var u = (i & 0xf) * unit
    var v = 1.0 - unit * (((i >> 0x4) & 0xf) + 1) + 2 / 64
    that.input.uvs.push(
      new THREE.Vector2(u, v + unit / 2),
      new THREE.Vector2(u + unit / 2, v + unit / 2),
      new THREE.Vector2(u + unit / 2, v),
      new THREE.Vector2(u, v)
    )
  }
}

export { BaseGeometry }
