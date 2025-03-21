import { defineStore } from "pinia"
type menuType = {
    active: string;
    list: RouteConfigsTable[]

}
export const useMenuStore = defineStore('menu', {
    state: (): menuType => ({
        active: '',
        list: []
    }),
    actions: {
        setActive(name: string) {
            this.active = name
        },
        setList(item: RouteConfigsTable) {
            const list = this.list
            list.push(item)
            this.list = list.sort((a, b) => {
                const rankA = a.meta && a.meta.rank !== undefined ? a.meta.rank : Infinity;
                const rankB = b.meta && b.meta.rank !== undefined ? b.meta.rank : Infinity;
                return rankA - rankB;
            });
        }
    }
})