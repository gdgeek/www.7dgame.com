import { postMeta, putMeta } from './meta.js'
import { postVerse, putVerse } from './verse.js'
import { v4 as uuidv4 } from 'uuid'

export function createVerseFromPolygen(name, resource) {
  const info = JSON.parse(resource.info)
  const r = 0.5 / info.size.y
  const scale = { x: r, y: r, z: r }
  const position = {
    x: -info.center.x * r,
    y: -info.center.y * r,
    z: -info.center.z * r
  }

  return new Promise(async (resolve, reject) => {
    const json = {
      name,
      description: '通过模型[' + resource.name + ']创建的简单场景。',
      course: -1
    }

    const vd = {
      name,
      info: JSON.stringify(json),
      image_id: resource.image_id,
      version: 2
    }
    try {
    } catch (e) {}
    postVerse(vd)
      .then(response => {
        const verse = response.data
        const md = {
          name: 'Polygen:' + resource.name,
          verse_id: response.data.id,
          image_id: resource.image_id
        }
        postMeta(md)
          .then(response => {
            const meta = response.data

            const vj = {
              type: 'Verse',
              parameters: {
                uuid: uuidv4(),
                //id: verse.id,
                space: { id: -1, occlusion: false }
              },
              children: {
                metas: [
                  {
                    type: 'Meta',
                    parameters: {
                      uuid: uuidv4(),
                      id: meta.id,
                      title: 'polygen',
                      transform: {
                        position: { x: 0, y: 0, z: 2 },
                        rotate: { x: 0, y: 0, z: 0 },
                        scale: { x: 1, y: 1, z: 1 }
                      },
                      active: true
                    }
                  }
                ]
              }
            }

            putVerse(verse.id, { data: JSON.stringify(vj) })
              .then(response => {
                const mj = {
                  type: 'MetaRoot',
                  parameters: {
                    uuid: uuidv4()
                    // id: meta.id
                  },
                  children: {
                    entities: [
                      {
                        type: 'Polygen',
                        parameters: {
                          uuid: uuidv4(),
                          name: 'expression',
                          transform: {
                            position: position,
                            rotate: { x: 0, y: 0, z: 0 },
                            scale: scale
                          },
                          active: true,
                          polygen: resource.id
                        },
                        children: {
                          entities: [],
                          components: []
                        }
                      }
                    ],
                    addons: [
                      {
                        type: 'Toolbar',
                        parameters: {
                          uuid: uuidv4(),
                          destory: false
                        },
                        children: { buttons: [] }
                      }
                    ]
                  }
                }

                putMeta(meta.id, { data: JSON.stringify(mj) })
                  .then(response => {
                    resolve()
                  })
                  .catch(error => reject(error))
              })
              .catch(error => reject(error))
          })
          .catch(error => reject(error))
      })
      .catch(error => reject(error))
  })
}
