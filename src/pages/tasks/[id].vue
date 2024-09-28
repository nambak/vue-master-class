<script setup lang="ts">
import { type Task, taskQuery } from '@/utils/supaQueries'

const route = useRoute('/tasks/[id]')

const task = ref<Task | null>(null)

watch(
  () => task.value?.name,
  () => {
    usePageStore().pageData.title = `Task: ${task.value?.name || ''}`
  })

const getTask = async () => {
  const { data, error } = await taskQuery(route.params.id)

  if (error) console.error(error)

  task.value = data
}

await getTask()
</script>

<template>
  <Table v-if="task">
    <TableRow>
      <TableHead> Name </TableHead>
      <TableCell>{{ task.name }}</TableCell>
    </TableRow>
    <TableRow>
      <TableHead>Description</TableHead>
      <TableCell>
        {{ task.description }}
      </TableCell>
    </TableRow>
    <TableRow>
      <TableHead>Assignee</TableHead>
      <TableCell></TableCell>
    </TableRow>
    <TableRow>
      <TableHead>Project</TableHead>
      <TableCell>{{ task.projects?.name }}</TableCell>
    </TableRow>
    <TableRow>
      <TableHead>Status</TableHead>
      <TableCell>{{ task.status }}</TableCell>
    </TableRow>
    <TableRow>
      <TableHead>Collaborators</TableHead>
      <TableCell>
        <div class="flex">
          <Avatar
            class="-mr-4 border border-primary hover:scale-110 transition-transform"
            v-for="collab in task.collaborators"
            :key="collab"
          >
            <RouterLink class="w-full h-full flex items-center justify-center" to="">
              <AvatarImage src="" alt="" />
              <AvatarFallback></AvatarFallback>
            </RouterLink>
          </Avatar>
        </div>
      </TableCell>
    </TableRow>

  </Table>
</template>
