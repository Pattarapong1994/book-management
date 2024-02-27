import { createRouter, createWebHistory } from 'vue-router'
import BookListView from '../views/BookListView.vue'
import BookUpdateview from '../views/BookUpdateView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'book-list',
      component: BookListView
    },
    {
      path: '/book/create',
      name: 'book-create',
      component: BookUpdateview
    },
    {
      path: '/book/edit/:id',
      name: 'book-edit',
      component: BookUpdateview
    },
  ] 
})

export default router
