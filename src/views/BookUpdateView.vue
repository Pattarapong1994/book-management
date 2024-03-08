<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'

import { useBookStore } from '../stores/book'

const route = useRoute()
const router = useRouter()
const bookStore = useBookStore()

const mode = ref('create')
const bookIndex = ref(-1) // ทำไมต้องใส่ -1 เพราะถ้าเวลาหา index แล้วไม่เจอส่วนมากโปรแกรมจะแทนให้เป็น -1  เลยใส่ให้เป็น -1 เพื่อป้องกันความสับสน

const bookData = reactive({
    name: '',
    author: ''
})

onMounted(() => {
    if (route.name === 'book-edit') {
        mode.value = 'update'
        bookIndex.value = parseInt(route.params.id)
        const currentBookStore = bookStore.books[bookIndex.value]
        bookData.name = currentBookStore.name
        bookData.author = currentBookStore.author
    }
})

const addBook = () => {
    if (mode.value === 'update') {
        bookStore.editBook(bookData, bookIndex.value)
    } else {
        bookStore.addBook(bookData)
    }
    router.push({
        name: 'book-list'
    })
}

const displayButton = computed(() => {
    if (mode.value === 'create') {
        return 'Add'
    } else {
        return 'Update'
    }
})

</script>

<template>
    BookUpdateView

    <div>
        <div>
            Book name: <input type="text" v-model="bookData.name">
        </div>
        <div>
            Anthor name: <input type="text" v-model="bookData.author">
        </div>
        <button @click="addBook()"> {{ displayButton }} Book</button>
        <RouterLink :to="{ name: 'book-list' }">
            Back to home
        </RouterLink>
    </div>
</template>