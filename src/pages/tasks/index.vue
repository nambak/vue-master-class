<script setup lang="ts">
import type { TasksWithProjects } from '@/utils/supaQueries'
import {tasksWithProjectsQuery} from '@/utils/supaQueries'
import { columns } from '@/utils/tableColumns/tasksColumns'

usePageStore().pageData.title = 'My Tasks'

const tasks = ref<TasksWithProjects | null>(null)
const getTasks = async () => {
  const { data, error } = await tasksWithProjectsQuery

  if (error) {
    console.error(error)
  }

  tasks.value = data
}

await getTasks()
</script>

<template>
  <DataTable v-if="tasks" :data="tasks" :columns="columns" />
</template>
