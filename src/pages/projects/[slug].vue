<script setup lang="ts">
import {projectQuery} from '@/utils/supaQueries'
import type {Project} from '@/utils/supaQueries'

const route = useRoute('/projects/[slug]')

const project = ref<Project | null>(null)

watch(
  () => project.value?.name,
  () => {
  usePageStore().pageData.title = `Project: ${project.value?.name || ''}`
})

const getProjects = async () => {
  const {data, error} = await projectQuery(route.params.slug)

  if (error) console.error(error)

  project.value = data
}

await getProjects()
</script>

<template>
  <Table v-if="project">
    <TableRow>
      <TableHead> Name </TableHead>
      <TableCell> {{ project.name }}</TableCell>
    </TableRow>
    <TableRow>
      <TableHead> Description </TableHead>
      <TableCell>
        {{ project.description }}
      </TableCell>
    </TableRow>
    <TableRow>
      <TableHead> Status</TableHead>
      <TableCell> {{ project.status }}</TableCell>
    </TableRow>
  </Table>
</template>

<style scoped>

</style>
