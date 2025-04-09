 type Booleanish = boolean | 'true' | 'false'

export const dataAttr = (guard: boolean | undefined) => (guard ? '' : undefined) as Booleanish
export const ariaAttr = (guard: boolean | undefined) => (guard ? 'true' : undefined)
