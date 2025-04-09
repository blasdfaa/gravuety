import { NAMESPACE } from '../constants'
import { withNaming } from './classname'

export const cn = withNaming({ e: '__', m: '_' })
export const block = withNaming({ n: NAMESPACE, e: '__', m: '_' })
