import { ref } from 'vue'

type SortableField = 'time' | 'brokerage' | 'action' | undefined
type SortOrder = 'asc' | 'desc' | undefined

interface UseTableSortOptions {
  onSortChange?: () => void
}

const sortableColumns: SortableField[] = ['time', 'brokerage', 'action']

export const useTableSort = (options: UseTableSortOptions = {}) => {
  const sortOrder = ref<SortOrder>(undefined)
  const sortField = ref<SortableField>(undefined)

  const isSortableColumn = (columnKey: string): boolean => {
    return sortableColumns.includes(columnKey as SortableField)
  }

  const handleSort = (field: SortableField) => {
    if (sortField.value !== field) {
      sortField.value = field
      sortOrder.value = 'desc'
    } else {
      if (sortOrder.value === undefined) {
        sortOrder.value = 'desc'
      } else if (sortOrder.value === 'desc') {
        sortOrder.value = 'asc'
      } else {
        sortOrder.value = undefined
        sortField.value = undefined
      }
    }

    if (options.onSortChange) options.onSortChange()
  }

  const handleColumnClick = (columnKey: string) => {
    if (isSortableColumn(columnKey)) {
      handleSort(columnKey as SortableField)
    }
  }

  const showDownArrow = (columnKey: string): boolean => {
    return sortField.value === columnKey && sortOrder.value === 'desc'
  }

  const showUpArrow = (columnKey: string): boolean => {
    return sortField.value === columnKey && sortOrder.value === 'asc'
  }

  const resetSort = () => {
    sortOrder.value = undefined
    sortField.value = undefined
  }

  const getSortParams = () => {
    if (sortOrder.value && sortField.value) {
      return {
        field: sortField.value,
        order: sortOrder.value,
      }
    }
    return undefined
  }

  return {
    sortOrder,
    sortField,

    isSortableColumn,
    handleSort,
    handleColumnClick,
    showDownArrow,
    showUpArrow,
    resetSort,
    getSortParams,
  }
}
