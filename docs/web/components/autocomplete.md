---
title: Autocomplete 自动补全输入框
meta:
  - name: description
    content: 封装表单组件实现通过配置动态生成表单
---

# Autocomplete

[ElAutocomplete]([Autocomplete 自动补全输入框 | Element Plus (element-plus.org)](https://element-plus.org/zh-CN/component/autocomplete.html)) 自动完成增强

## 使用

静态数据，使用`bindingKey`选中后绑定数据，`config`配置选项

:::demo

```vue
<template>
<n-card title="静态数据">
    <div style="margin-bottom: 10px">{{ formStatic }}</div>
    <el-form :inline="true" :model="formStatic" class="demo-form-inline">
      <el-form-item label="框架名称">
        <n-autocomplete
          v-model:form="formStatic"
          :bindingKey="{ link: 'value2' }"
          v-model="formStatic.value1"
          :data="staticData"
          :config="{ value: 'value', desc: 'link' }"
        >
        </n-autocomplete>
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="formStatic.value2"></el-input>
      </el-form-item>
       <el-form-item label="其它">
        <el-input v-model="formStatic.value3"></el-input>
      </el-form-item>
    </el-form>
  </n-card>
</template>

<script lang="ts">
import { ref } from 'vue'
export default {
  setup() {
   
const formStatic = ref({
   value2: '',
   value1: '',
   value3: '' 
})

const staticData = [
  { value: 'vue', link: 'http://github.com/vuejs/vue' },
  { value: 'element', link: 'https://github.com/ElemeFE/element' },
  { value: 'cooking', link: 'https://github.com/ElemeFE/cooking' },
  { value: 'mint-ui', link: 'https://github.com/ElemeFE/mint-ui' },
  { value: 'vuex', link: 'https://github.com/vuejs/vuex' },
  { value: 'vue-router', link: 'https://github.com/vuejs/vue-router' },
  { value: 'babel', link: 'https://github.com/babel/babel' }
]

    return {
     formStatic,
     staticData
    }
  }
}

</script>
```

:::

### 远程加载数据

获取焦点的时候会加载一次数据。`remote-config`远程加载配置

:::demo

```vue
<template>
<NCard title="加载一次远程数据">
    <div style="margin-bottom: 10px">{{ formRemoteOneOff }}</div>
    <el-form :inline="true" :model="formRemoteOneOff" class="demo-form-inline">
      <el-form-item label="用户名称">
        <NAutocomplete
          v-model:form="formRemoteOneOff"
          value-key="username"
          :bindingKey="{ email: 'mail', 'company.name': 'companyName.addr' }"
          v-model="formRemoteOneOff.username"
          :remote-config="{
            url: 'http://jsonplaceholder.typicode.com/users',
          }"
          :config="{ value: 'name', desc: 'email' }"
        >
        </NAutocomplete>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="formRemoteOneOff.mail"></el-input>
      </el-form-item>
      <el-form-item label="公司名称">
        <el-input v-model="formRemoteOneOff.companyName.addr"></el-input>
      </el-form-item>
    </el-form>
  </NCard>
</template> 
<script>
import { ref } from 'vue'

export default {
  setup() {
    const formRemoteOneOff = ref({
  companyName: { addr: null }
})

    return {
      formRemoteOneOff
    }
  }
}  
</script>
```

:::



### 远程搜索

本地数据如果没匹配到数据会从服务器加载，需要配置`remote-search`

:::demo

```vue
<template> 
<NCard title="远程搜索">
    <div style="margin-bottom: 10px">{{ formRemoteSearch }}</div>
    <el-form :model="formRemoteSearch" class="demo-form-inline">
      <el-form-item label="用户主键">
        <NAutocomplete
          v-model:form="formRemoteSearch"
          value-key="id"
          remote-search
          remoteSearchFieldKey="postId"
          :bindingKey="{
            name: 'postName',
            email: 'content.email',
            body: 'content.body',
          }"
          v-model="formRemoteSearch.id"
          :remote-config="{
            url: 'https://jsonplaceholder.typicode.com/comments',
          }"
          :display-key="['postId', 'name', 'body']"
          :searchKey="['name', 'email', 'postId', 'body']"
        >
        </NAutocomplete>
      </el-form-item>
      <el-form-item label="用户名称">
        <el-input v-model="formRemoteSearch.postName"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="formRemoteSearch.content.email"></el-input>
      </el-form-item>
      <el-form-item label="帖子内容">
        <el-input v-model="formRemoteSearch.content.body"></el-input>
      </el-form-item>
    </el-form>
  </NCard>
</template> 
<script>
import { ref } from 'vue'

export default {
  setup() {
const formRemoteSearch = ref({
  content: {}
})
    return {
      formRemoteSearch
    }
  }
}  
</script>
```

:::

## Props

| Name                      | Description                                                  | Type       | Options | Default             |
| ------------------------- | ------------------------------------------------------------ | ---------- | ------- | ------------------- |
| v-model:form              | 设置需要绑定选中的数据源                                     | object     | -       | -                   |
| `binding-key`             | 选择数据源和下拉选项值绑定，key为下拉选项配置，value：`v-model:form`的key | object     | -       | -                   |
| `remote-search`           | 开启远程搜索                                                 | boolean    | -       | false               |
| `remote-search-field-key` | 远程搜索字段名称                                             | string     | -       | -                   |
| `display-key`             | 下拉选项需要显示的key                                        | `string[]` | -       | `['value', 'desc']` |
| `search-key`              | 可以搜索的字段                                               | `string[]` | -       | `['value', 'desc']` |
| limit                     | 搜索最大结果条数                                             | number     | -       | 50                  |
