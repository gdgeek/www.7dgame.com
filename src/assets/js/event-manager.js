import { postEventInput, deleteEventInput } from '@/api/v1/event-input'
import { postEventOutput, deleteEventOutput } from '@/api/v1/event-output'

async function rebuild(node, inputs, outputs) {
  const ret = node
  const inodes = inputs.filter(item => {
    if (!node.inputs.find(item2 => item.uuid === item2.uuid)) {
      return true
    }
    return false
  })

  for (var i = 0; i < inodes.length; i++) {
    const response = await postEventInput({
      event_node_id: node.id,
      uuid: inodes[i].uuid,
      title: inodes[i].title
    })
    inodes[i].id = response.data.id
  }

  const dinodes = node.inputs.filter(item => {
    if (!inputs.find(item2 => item.uuid === item2.uuid)) {
      return true
    }
    return false
  })

  for (var i = 0; i < dinodes.length; i++) {
    await deleteEventInput(dinodes[i].id)
  }

  const onodes = outputs.filter(item => {
    if (!node.outputs.find(item2 => item.uuid === item2.uuid)) {
      return true
    }
    return false
  })

  for (var i = 0; i < onodes.length; i++) {
    const response = await postEventOutput({
      event_node_id: node.id,
      uuid: onodes[i].uuid,
      title: onodes[i].title
    })
    onodes[i].id = response.data.id
  }

  const donodes = node.outputs.filter(item => {
    if (!outputs.find(item2 => item.uuid === item2.uuid)) {
      return true
    }
    return false
  })

  for (var i = 0; i < donodes.length; i++) {
    await deleteEventOutput(donodes[i].id)
  }

  ret.inputs = inputs
  ret.outputs = outputs
  return ret
}
export default { rebuild }
