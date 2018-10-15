import { schema, normalize as normalizeIt } from 'normalizr'

const userSchema = new schema.Entity('users')

export function normalize(data, entitySchema, entityName) {
  const {
    entities: { [entityName]: byId },
    result: ids,
  } = normalizeIt(data, entitySchema)

  return { byId, ids }
}

export default {
  USER: userSchema,
  USER_ARRAY: new schema.Array(userSchema),
}
