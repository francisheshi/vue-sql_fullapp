<template>
  <h1 class="title">{{ header }}</h1>
  <div class="card">
    <div class="header">
      <button v-if="isEdited" class="cancel-btn" @click="toggleEdit(false)">Cancel</button>
      <button v-else class="add-btn" @click="toggleEdit(true)">Add Item</button>
    </div>
    <form class="add-item-form" v-if="isEdited" @submit.prevent="saveItem">
      <input v-model.trim="newItem" type="text" placeholder="Add an item" />
      <label>
        <input type="checkbox" v-model="newItemHighPriority" />
        High Priority
      </label>
      <button :disabled="newItem.length < 5" class="save-btn">Save Item</button>
    </form>
    <ul>
      <li
        v-for="item in items"
        @click="togglePurchased(item.id)"
        :key="item.id"
        class="static-class"
        :class="{
          strikeout: item.purchased,
          priority: item.highPriority,
        }"
      >
        {{ item.label }}
      </li>
    </ul>
    <p v-if="!items.length">Nothing to see here</p>
  </div>
</template>

<script lang="ts">
export default {
  name: 'TodoList',
  data() {
    return {
      header: 'Todo List App',
      items: [
        {
          id: 1,
          label: '10 party hats',
          purchased: true,
          highPriority: false,
        },
        {
          id: 2,
          label: '2 board games',
          purchased: true,
          highPriority: false,
        },
        {
          id: 3,
          label: '20 cups',
          purchased: false,
          highPriority: true,
        },
      ] as Array<{ id: number; label: string; purchased: boolean; highPriority: boolean }>,
      isEdited: false,
      newItem: '',
      newItemHighPriority: false,
    }
  },
  methods: {
    saveItem() {
      if (!this.newItem.trim()) {
        alert('Item label cannot be empty.')
        return
      }
      this.items.push({
        id: this.items.length + 1,
        label: this.newItem,
        highPriority: this.newItemHighPriority,
        purchased: false, // Default to not purchased
      })

      this.resetNewItem()
    },

    /**
     * @param isEditing - Whether the edit mode is active.
     */
    toggleEdit(isEditing: boolean) {
      this.isEdited = isEditing
      this.resetNewItem()
    },

    /**
     * @param itemId - The ID of the item to toggle.
     */
    togglePurchased(itemId: number) {
      const item = this.items.find((i) => i.id === itemId)
      if (item) {
        item.purchased = !item.purchased
      }
    },

    resetNewItem() {
      this.newItem = ''
      this.newItemHighPriority = false
    },
  },
}
</script>

<style scoped>
.counter {
  font-size: 0.8rem;
  padding-left: 10px;
  padding-right: 10px;
}
.card {
  background: #fff;
  padding: 2rem;
  margin: 1rem;
  border-radius: 3px;
  box-shadow:
    0 4px 8px 0 rgba(0, 0, 0, 0.12),
    0 2px 4px 0 rgba(0, 0, 0, 0.08);
  width: 75%;
  max-width: 700px;
}
.header {
  color: #3d4852;
}
.add-btn {
  background-color: #3b82f6;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  margin-bottom: 1rem;
  transition: background-color 0.2s;
}
.add-btn[disabled]:hover {
  background-color: #2563eb;
}
.cancel-btn {
  background-color: #ca1616;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  margin-bottom: 1rem;
  transition: background-color 0.2s;
}
.cancel-btn[disabled]:hover {
  background-color: #ca1616;
}
.save-btn {
  background-color: #1ad458;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  margin-bottom: 1rem;
  transition: background-color 0.2s;
}
.save-btn[disabled]:hover {
  background-color: #1ad458;
}
#shopping-list > input,
#shopping-list > select {
  width: 100%;
  border-radius: 3px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid #f1f5f8;
  color: #606f7b;
  padding: 0.5rem 0.75rem;
  box-sizing: border-box;
  font-size: 1rem;
  letter-spacing: 0.5px;
  margin: 0.5rem 0;
}
.strikeout {
  text-decoration: line-through;
  color: #b8c2cc;
}
.strikeout:hover {
  color: #8795a1;
}
.priority {
  color: #de751f;
}
input[type='checkbox'] {
  display: inline !important;
  box-shadow: none;
  width: auto;
}
</style>
