import DataType from './type'
const data = {
  name: 'function_execute'
}
const block = {
  title: data.name,
  type: DataType.name,
  colour: DataType.colour,
  getBlockJson(root) {
    const json = {
      type: data.name,
      message0: '执行 %1',
      args0: [
        {
          type: 'field_dropdown',
          name: 'function',
          options: [
            ['redo', 'CS.MrPP.Lua.LuaExecuter.Redo()'],
            ['undo', 'CS.MrPP.Lua.LuaExecuter.Undo()'],
            ['boom_reset', 'CS.MrPP.Lua.LuaExecuter.BoomReset(target)'],
            ['sample_reset', 'CS.MrPP.Lua.LuaExecute.SampleReset(target)']
          ]
        }
      ],
      inputsInline: false,
      previousStatement: null,
      nextStatement: null,
      colour: DataType.colour,
      tooltip: '',
      helpUrl: ''
    }
    return json
  },
  getBlock: function (root) {
    const data = {
      init: function () {
        const json = block.getBlockJson(root)
        this.jsonInit(json)
      }
    }
    return data
  },
  getLua(index) {
    const lua = function (block) {
      var dropdown_function = block.getFieldValue('function')
      // TODO: Assemble Lua into code variable.
      var code = dropdown_function + '\n'
      return code
    }
    return lua
  },
  toolbox: {
    kind: 'block',
    type: data.name
  }
}
export default block
