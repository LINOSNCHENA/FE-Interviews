
// Utilities
// import { createPinia } from 'pinia';
// export default createPinia()


import { createPinia, Pinia } from 'pinia'

let piniaInstance: Pinia|null = null

const pinia = (): Pinia => {
    if (piniaInstance !== null) return piniaInstance

    piniaInstance = createPinia()

    return piniaInstance
}

export default pinia

// export default createPinia()