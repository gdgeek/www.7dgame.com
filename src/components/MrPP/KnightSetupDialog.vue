<template>
  <div>
    <el-dialog
      :visible.sync="dialogVisible"
      width="95%"
      height="100px"
      :show-close="false"
      @close="cancel()"
    >
      <json-editor ref="JsonEditor" :schema="schema" v-model="model">
        <el-button @click="submit">提交</el-button>
        <el-button @click="reset">重制</el-button>
      </json-editor>
    </el-dialog>
  </div>
</template>

<script>
import { Option } from 'element-ui'
import JsonEditor from 'vue-json-ui-editor'

JsonEditor.setComponent('form', 'el-form', ({ vm }) => {
  // vm is the JsonEditor VM
  const labelWidth = '120px'
  const model = vm.data
  const rules = {}
  function parseField(fields) {
    Object.keys(fields).forEach(key => {
      if (key.indexOf('$') === 0 && key !== '$sub') return
      const field = fields[key]
      if (field.$sub) {
        return parseField(field)
      }
      if (!field.name) return
      rules[field.name] = []
      // http://element.eleme.io/#/en-US/component/form#validation
      const type =
        field.schemaType === 'array' && field.type === 'radio'
          ? 'string'
          : field.schemaType
      const required = field.required
      const message = field.title
      const trigger = ['radio', 'checkbox', 'select'].includes(field.type)
        ? 'change'
        : 'blur'
      rules[field.name].push({ type, required, message, trigger })
      if (field.minlength !== undefined || field.maxlength !== undefined) {
        const max = field.maxlength || 255
        const min = field.minlength || 0
        const msg = `Length must between ${min} and ${max}`
        rules[field.name].push({ min, max, message: msg, trigger })
      }
    })
  }
  parseField(vm.fields)
  // returning the form props
  return { labelWidth, rules, model }
})
// http://element.eleme.io/#/en-US/component/form#validation
JsonEditor.setComponent('label', 'el-form-item', ({ field }) => ({
  prop: field.name
}))
JsonEditor.setComponent('email', 'el-input')
JsonEditor.setComponent('url', 'el-input')
JsonEditor.setComponent('number', 'el-input-number')
JsonEditor.setComponent('text', 'el-input')
JsonEditor.setComponent('textarea', 'el-input')
JsonEditor.setComponent('checkbox', 'el-checkbox')
JsonEditor.setComponent('checkboxgroup', 'el-checkbox-group')
JsonEditor.setComponent('radio', 'el-radio')
JsonEditor.setComponent('select', 'el-select')
JsonEditor.setComponent('switch', 'el-switch')
JsonEditor.setComponent('color', 'el-color-picker')
JsonEditor.setComponent('rate', 'el-rate')
// You can also use the component object
JsonEditor.setComponent('option', Option)
// By default `<h1/>` is used to render the form title.
// To override this, use the `title` type:
JsonEditor.setComponent('title', 'h2')
// By default `<p/>` is used to render the form title.
// To override this, use the `description` type:
JsonEditor.setComponent('description', 'small')
// By default `<div/>` is used to render the message error.
// To override this, use the `error` type:
JsonEditor.setComponent('error', 'el-alert', ({ vm }) => ({
  type: 'error',
  title: vm.error
}))
const SCHEMA = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  type: 'object',
  title: '测试',
  description: '相关数据',
  properties: {
    name: {
      type: 'string',
      minLength: 8,
      maxLength: 80,
      title: 'String',
      attrs: {
        placeholder: 'Your Full Name',
        title: 'Please enter your full name'
      }
    },
    sub: {
      title: 'SubTitle',
      description: 'SubDescription',
      type: 'object',
      properties: {
        sName: {
          minLength: 8,
          maxLength: 80,
          title: 'SubName',
          attrs: {
            placeholder: 'Sub Full Name',
            title: 'Please enter your full name'
          }
        },
        sUrl: {
          title: 'SubUrl',
          format: 'uri'
        },
        sub2: {
          type: 'object',
          title: 'Sub2Title',
          description: 'Sub2Description',
          properties: {
            sName2: {
              format: 'regex',
              title: 'Sub2Name',
              pattern: '*'
            },
            sAge: {
              type: 'integer',
              title: 'Sub2Age'
            }
          },
          required: ['sName2']
        }
      },
      required: ['sUrl']
    },
    lists: {
      type: 'string',
      title: 'List',
      enum: ['Daily New', 'Promotion'],
      attrs: {
        placeholder: 'Select your list subscription',
        title: 'Please select your list subscription'
      }
    },
    lists2: {
      type: 'array',
      title: 'List2',
      anyOf: [
        { value: 'daily', label: 'Daily New' },
        { value: 'promotion', label: 'Promotion' }
      ],
      attrs: {
        placeholder: 'Select your list subscription',
        title: 'Please select your list subscription'
      }
    },
    lists3: {
      type: 'array',
      title: 'List3',
      oneOf: [
        { value: 'daily', label: 'Daily New' },
        { value: 'promotion', label: 'Promotion' }
      ]
    },
    source: {
      type: 'string',
      maxLength: 120,
      title: 'Source',
      description: 'Ex. Using the NPM Search Engine',
      attrs: {
        type: 'textarea',
        placeholder: 'How did you hear about us?'
      }
    },
    rate: {
      type: 'number',
      title: 'Rate',
      default: 2,
      attrs: {
        type: 'rate',
        'allow-half': true
      }
    },
    color: {
      type: 'string',
      title: 'Color',
      default: '#409EFF',
      attrs: {
        type: 'color'
      }
    },
    agree: {
      type: 'boolean',
      title: 'Agree',
      description:
        'You agree to receive occasional updates and special offers for vue-json-schema updates.',
      default: false,
      attrs: {
        type: 'switch'
      }
    }
  },
  additionalProperties: false,
  required: ['name', 'email', 'lists']
}
export default {
  name: 'KnightDialog',
  components: {
    JsonEditor
  },
  data() {
    return {
      schema: SCHEMA,
      model: {
        name: 'Yourtion'
      },
      dialogVisible: false
    }
  },
  computed: {},
  methods: {
    async open(value, verse_id) {
      this.dialogVisible = true
    },
    async cancel() {
      this.dialogVisible = false
    },
    submit(_e) {
      alert(JSON.stringify(this.model))
    },
    reset() {
      this.$refs.JsonEditor.reset()
    }
  }
}
</script>
<style></style>
