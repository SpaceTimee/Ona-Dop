<script setup lang="ts">
type AboutItem = {
  label: string
  value: string
  href?: string
  color?: string
  disabled?: boolean
}

const ABOUT_ITEMS: AboutItem[] = [
  {
    label: 'Developer',
    value: 'Space Time',
    href: 'https://www.spacetimee.xyz',
    color: 'red'
  },
  {
    label: 'Blog',
    value: 'blog.spacetimee.xyz',
    href: 'https://blog.spacetimee.xyz',
    color: 'red'
  },
  {
    label: 'Email',
    value: 'Zeus6_6@163.com',
    href: 'mailto:Zeus6_6@163.com',
    color: 'red'
  },
  {
    label: 'Docs',
    value: 'github.com/SpaceTimee/Ona-Dop/wiki',
    href: 'https://github.com/SpaceTimee/Ona-Dop/wiki',
    color: 'blue'
  },
  {
    label: 'Repo',
    value: 'github.com/SpaceTimee/Ona-Dop',
    href: 'https://github.com/SpaceTimee/Ona-Dop',
    color: 'blue'
  },
  {
    label: 'Privacy',
    value: 'ona-dop-docs.spacetimee.xyz/privacy',
    href: 'https://ona-dop-docs.spacetimee.xyz/privacy',
    color: 'green'
  },
  {
    label: 'Agreement',
    value: 'ona-dop-docs.spacetimee.xyz/agreement',
    href: 'https://ona-dop-docs.spacetimee.xyz/agreement',
    color: 'green'
  },
  {
    label: 'Version',
    value: '1.0.4',
    disabled: true
  }
]
</script>

<template>
  <v-card class="header-v-card text-h5">Ona Dop</v-card>
  <v-list class="text-body-2" lines="one" density="compact">
    <v-list-item
      v-for="item in ABOUT_ITEMS"
      :key="item.label"
      :value="item.label"
      :href="item.href"
      :color="item.color"
      :base-color="item.color"
      :disabled="item.disabled"
    >
      {{ item.label }}: {{ item.value }}
    </v-list-item>
  </v-list>
</template>

<style scoped lang="less">
.header-v-card {
  margin-bottom: 1rem;
  background-color: @primary-color;
  text-align: center;
  color: white;
}
</style>
