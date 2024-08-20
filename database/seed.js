/* eslint-env node */

import {faker} from '@faker-js/faker'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.SERIVE_ROLE_KEY)

const seedProject = async () => {
    const name = faker.lorem.words(3)
    await supabase.from('projects').insert({
      name: name,
      slug: name.toLocaleLowerCase().replace(/ /g, '-'),
      status: faker.helpers.arrayElement(['in-progress', 'completed']),
      collaborators: faker.helpers.arrayElements([1, 2, 3])
    })
}

await seedProject()
