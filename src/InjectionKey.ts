import type { InjectionKey } from 'vue'
import type { Ref } from 'vue'
export const themeInjectionKeys = Symbol() as InjectionKey<Ref<string>>
export const selectInjectionKeys = Symbol() as InjectionKey<string[]>
